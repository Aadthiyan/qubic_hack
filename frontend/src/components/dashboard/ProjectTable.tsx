'use client';

import React from 'react';
import Link from 'next/link';
import { Project, Score } from '../../types';
import { ArrowUpRight, Calendar, Clock, MoreVertical, Shield } from 'lucide-react';

interface ProjectTableProps {
    projects: Project[];
    isLoading: boolean;
}

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        draft: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
        submitted: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        approved: 'bg-green-500/10 text-green-400 border-green-500/20',
        launched: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        failed: 'bg-red-500/10 text-red-400 border-red-500/20',
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles] || styles.draft}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default function ProjectTable({ projects, isLoading }: ProjectTableProps) {
    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading projects...</div>;
    }

    if (projects.length === 0) {
        return (
            <div className="p-12 text-center border border-white/5 rounded-xl bg-white/5 border-dashed">
                <Shield className="mx-auto text-gray-600 mb-3" size={32} />
                <h3 className="text-gray-300 font-medium">No projects found</h3>
                <p className="text-gray-500 text-sm mt-1">Start by creating a new audit.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="px-6 py-4 font-medium text-gray-400">Project Name</th>
                            <th className="px-6 py-4 font-medium text-gray-400">Status</th>
                            <th className="px-6 py-4 font-medium text-gray-400">Risk Score</th>
                            <th className="px-6 py-4 font-medium text-gray-400">Created</th>
                            <th className="px-6 py-4 font-medium text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-medium text-white">{project.name}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                            {project.description || 'No description provided'}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={project.status} />
                                </td>
                                <td className="px-6 py-4">
                                    {/* Placeholder for Score (needs backend update) */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500">-</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-xs">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/projects/${project.id}`}
                                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        View Details <ArrowUpRight size={14} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-white">{project.name}</h3>
                            <button className="text-gray-500 hover:text-white">
                                <MoreVertical size={16} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                            {project.description || 'No description'}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                            <StatusBadge status={project.status} />
                            <Link
                                href={`/projects/${project.id}`}
                                className="text-xs text-blue-400 flex items-center gap-1"
                            >
                                Details <ArrowUpRight size={14} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
