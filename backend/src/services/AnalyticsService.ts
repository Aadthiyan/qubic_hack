/**
 * Analytics Service
 * Provides ecosystem statistics and insights
 */

import { query } from '../db/connection';
import { logger } from '../utils/logger';
import { AnalyticsResponse } from '../types';

export class AnalyticsService {
    /**
     * Get ecosystem analytics
     */
    async getAnalytics(): Promise<AnalyticsResponse> {
        try {
            // Get score distribution
            const distributionResult = await query(`
        SELECT 
          grade,
          COUNT(*) as count,
          ROUND(AVG(score), 2) as avg_score,
          MIN(score) as min_score,
          MAX(score) as max_score
        FROM scores s
        INNER JOIN (
          SELECT project_id, MAX(calculated_at) as max_date
          FROM scores
          GROUP BY project_id
        ) latest ON s.project_id = latest.project_id AND s.calculated_at = latest.max_date
        GROUP BY grade
        ORDER BY 
          CASE grade
            WHEN 'Green' THEN 1
            WHEN 'Yellow' THEN 2
            WHEN 'Red' THEN 3
          END
      `);

            // Get total projects
            const totalResult = await query('SELECT COUNT(*) as count FROM projects');
            const totalProjects = parseInt(totalResult.rows[0].count);

            // Get projects by status
            const statusResult = await query(`
        SELECT status, COUNT(*) as count
        FROM projects
        GROUP BY status
      `);

            // Get overall average score
            const avgResult = await query(`
        SELECT ROUND(AVG(score), 2) as avg_score
        FROM scores s
        INNER JOIN (
          SELECT project_id, MAX(calculated_at) as max_date
          FROM scores
          GROUP BY project_id
        ) latest ON s.project_id = latest.project_id AND s.calculated_at = latest.max_date
      `);

            const avgScore = parseFloat(avgResult.rows[0]?.avg_score || '0');

            // Format distribution
            const distribution = {
                green: 0,
                yellow: 0,
                red: 0,
            };

            distributionResult.rows.forEach((row) => {
                const grade = row.grade.toLowerCase();
                distribution[grade as keyof typeof distribution] = parseInt(row.count);
            });

            // Format status counts
            const statusCounts: Record<string, number> = {};
            statusResult.rows.forEach((row) => {
                statusCounts[row.status] = parseInt(row.count);
            });

            logger.info('Analytics retrieved', { totalProjects, avgScore });

            return {
                totalProjects,
                avgScore,
                distribution,
                statusCounts,
                detailedDistribution: distributionResult.rows.map((row) => ({
                    grade: row.grade,
                    count: parseInt(row.count),
                    avgScore: parseFloat(row.avg_score),
                    minScore: parseInt(row.min_score),
                    maxScore: parseInt(row.max_score),
                })),
            };
        } catch (error) {
            logger.error('Error getting analytics', error as Error);
            throw error;
        }
    }

    /**
     * Get risk flag statistics
     */
    async getRiskFlagStats(): Promise<{
        totalFlags: number;
        bySeverity: Record<string, number>;
        mostCommon: Array<{ text: string; count: number }>;
    }> {
        try {
            // Get total flags
            const totalResult = await query('SELECT COUNT(*) as count FROM risk_flags');
            const totalFlags = parseInt(totalResult.rows[0].count);

            // Get flags by severity
            const severityResult = await query(`
        SELECT severity, COUNT(*) as count
        FROM risk_flags
        GROUP BY severity
      `);

            const bySeverity: Record<string, number> = {};
            severityResult.rows.forEach((row) => {
                bySeverity[row.severity] = parseInt(row.count);
            });

            // Get most common flags
            const commonResult = await query(`
        SELECT flag_text, COUNT(*) as count
        FROM risk_flags
        GROUP BY flag_text
        ORDER BY count DESC
        LIMIT 10
      `);

            const mostCommon = commonResult.rows.map((row) => ({
                text: row.flag_text,
                count: parseInt(row.count),
            }));

            return { totalFlags, bySeverity, mostCommon };
        } catch (error) {
            logger.error('Error getting risk flag stats', error as Error);
            throw error;
        }
    }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();
