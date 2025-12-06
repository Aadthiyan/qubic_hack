/**
 * Project Service
 * Handles all project-related database operations
 */

import { query, getClient } from '../db/connection';
import { Project, ProjectMetadata, Score, LaunchConfig } from '../types';
import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';
import { HTTP_STATUS, ERROR_CODES } from '../utils/constants';

export class ProjectService {
    /**
     * Get all projects with pagination
     */
    async getAllProjects(
        page: number = 1,
        limit: number = 10,
        status?: string
    ): Promise<{ projects: Project[]; total: number }> {
        try {
            const offset = (page - 1) * limit;

            // Build query
            let queryText = 'SELECT * FROM projects';
            const params: any[] = [];

            if (status) {
                queryText += ' WHERE status = $1';
                params.push(status);
            }

            queryText += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
            params.push(limit, offset);

            // Get projects
            const result = await query(queryText, params);

            // Get total count
            let countQuery = 'SELECT COUNT(*) FROM projects';
            const countParams: any[] = [];
            if (status) {
                countQuery += ' WHERE status = $1';
                countParams.push(status);
            }
            const countResult = await query(countQuery, countParams);
            const total = parseInt(countResult.rows[0].count);

            logger.info('Projects retrieved', { count: result.rows.length, total, page, limit });

            return {
                projects: result.rows,
                total,
            };
        } catch (error) {
            logger.error('Error getting projects', error as Error);
            throw error;
        }
    }

    /**
     * Get project by ID with metadata, latest score, and config
     */
    async getProjectById(id: string): Promise<{
        project: Project;
        metadata: ProjectMetadata | null;
        score: Score | null;
        config: LaunchConfig | null;
    }> {
        try {
            // Get project
            const projectResult = await query('SELECT * FROM projects WHERE id = $1', [id]);

            if (projectResult.rows.length === 0) {
                throw new AppError(
                    HTTP_STATUS.NOT_FOUND,
                    `Project with ID ${id} not found`,
                    ERROR_CODES.NOT_FOUND
                );
            }

            const project = projectResult.rows[0];

            // Get metadata
            const metadataResult = await query(
                'SELECT * FROM project_metadata WHERE project_id = $1',
                [id]
            );
            const metadata = metadataResult.rows[0] || null;

            // Get latest score
            const scoreResult = await query(
                'SELECT * FROM scores WHERE project_id = $1 ORDER BY calculated_at DESC LIMIT 1',
                [id]
            );
            const score = scoreResult.rows[0] || null;

            // Get config
            const configResult = await query(
                'SELECT * FROM launch_configs WHERE project_id = $1',
                [id]
            );
            const config = configResult.rows[0] || null;

            logger.info('Project retrieved', { projectId: id });

            return { project, metadata, score, config };
        } catch (error) {
            logger.error('Error getting project by ID', error as Error, { projectId: id });
            throw error;
        }
    }

    /**
     * Create new project with metadata
     */
    async createProject(data: {
        name: string;
        description?: string;
        websiteUrl?: string;
        whitepaperUrl?: string;
        githubUrl?: string;
        twitterHandle?: string;
        discordInvite?: string;
        teamAllocationPercent: number;
        teamVestingMonths: number;
        hasFounderLocks: boolean;
        supplyDistributionFair: boolean;
        totalSupply?: bigint;
        initialCirculatingSupply?: bigint;
    }): Promise<{ project: Project; metadata: ProjectMetadata }> {
        const client = await getClient();

        try {
            await client.query('BEGIN');

            // Insert project
            const projectResult = await client.query(
                `INSERT INTO projects (name, description, website_url, whitepaper_url, github_url, twitter_handle, discord_invite, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'draft')
         RETURNING *`,
                [
                    data.name,
                    data.description || null,
                    data.websiteUrl || null,
                    data.whitepaperUrl || null,
                    data.githubUrl || null,
                    data.twitterHandle || null,
                    data.discordInvite || null,
                ]
            );

            const project = projectResult.rows[0];

            // Insert metadata
            const metadataResult = await client.query(
                `INSERT INTO project_metadata (
          project_id, team_allocation_percent, team_vesting_months, 
          has_founder_locks, supply_distribution_fair, total_supply, initial_circulating_supply
        )
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
                [
                    project.id,
                    data.teamAllocationPercent,
                    data.teamVestingMonths,
                    data.hasFounderLocks,
                    data.supplyDistributionFair,
                    data.totalSupply?.toString() || null,
                    data.initialCirculatingSupply?.toString() || null,
                ]
            );

            const metadata = metadataResult.rows[0];

            await client.query('COMMIT');

            logger.info('Project created', { projectId: project.id, name: project.name });

            return { project, metadata };
        } catch (error) {
            await client.query('ROLLBACK');
            logger.error('Error creating project', error as Error);
            throw error;
        } finally {
            client.release();
        }
    }

    /**
     * Update project status
     */
    async updateProjectStatus(id: string, status: string): Promise<Project> {
        try {
            const result = await query(
                'UPDATE projects SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
                [status, id]
            );

            if (result.rows.length === 0) {
                throw new AppError(
                    HTTP_STATUS.NOT_FOUND,
                    `Project with ID ${id} not found`,
                    ERROR_CODES.NOT_FOUND
                );
            }

            logger.info('Project status updated', { projectId: id, status });

            return result.rows[0];
        } catch (error) {
            logger.error('Error updating project status', error as Error, { projectId: id });
            throw error;
        }
    }

    /**
     * Delete project (cascade deletes metadata, scores, etc.)
     */
    async deleteProject(id: string): Promise<void> {
        try {
            const result = await query('DELETE FROM projects WHERE id = $1', [id]);

            if (result.rowCount === 0) {
                throw new AppError(
                    HTTP_STATUS.NOT_FOUND,
                    `Project with ID ${id} not found`,
                    ERROR_CODES.NOT_FOUND
                );
            }

            logger.info('Project deleted', { projectId: id });
        } catch (error) {
            logger.error('Error deleting project', error as Error, { projectId: id });
            throw error;
        }
    }
}

// Export singleton instance
export const projectService = new ProjectService();
