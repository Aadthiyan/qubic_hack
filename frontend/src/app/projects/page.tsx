'use client';

import { useProjects } from '../../hooks/useProjects';
import { useRouter } from 'next/navigation';
import { Skeleton } from '../../components/ui/Skeleton';
import { Shield, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

export default function ProjectsPage() {
    const router = useRouter();
    const { data, isLoading, error } = useProjects();

    if (isLoading) {
        return (
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-8">All Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-48" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">All Projects</h1>
                <div className="glass-panel p-6 text-center">
                    <p className="text-red-400">Failed to load projects. Please try again.</p>
                </div>
            </div>
        );
    }

    const projects = data?.data?.projects || [];

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">All Projects</h1>
                    <p className="text-gray-400 mt-2">Browse and assess risk across the Qubic ecosystem</p>
                </div>
                <button
                    onClick={() => router.push('/sandbox')}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition"
                >
                    + New Assessment
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="glass-panel p-12 text-center">
                    <Shield size={48} className="mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-bold text-white mb-2">No Projects Yet</h3>
                    <p className="text-gray-400 mb-6">Start by creating your first project assessment</p>
                    <button
                        onClick={() => router.push('/sandbox')}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition"
                    >
                        Create Assessment
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project: any) => {
                        // Handle both camelCase and snake_case properties
                        const grade = project.grade || project.risk_grade || 'Pending';
                        const score = project.score || project.risk_score || 0;
                        const dateStr = project.created_at || project.createdAt;

                        const gradeColor =
                            grade === 'Green'
                                ? 'text-green-400 border-green-500/30 bg-green-500/10'
                                : grade === 'Yellow'
                                    ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
                                    : grade === 'Red'
                                        ? 'text-red-400 border-red-500/30 bg-red-500/10'
                                        : 'text-gray-400 border-gray-500/30 bg-gray-500/10';

                        return (
                            <div
                                key={project.id}
                                onClick={() => router.push(`/projects/${project.id}`)}
                                className="glass-card p-6 cursor-pointer hover:scale-105 transition-transform"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-white">{project.name}</h3>
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${gradeColor}`}>
                                        {grade}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    {score >= 70 ? (
                                        <TrendingUp size={20} className="text-green-400" />
                                    ) : score >= 50 ? (
                                        <TrendingDown size={20} className="text-yellow-400" />
                                    ) : (
                                        <TrendingDown size={20} className="text-red-400" />
                                    )}
                                    <span className="text-3xl font-bold text-white">{score}</span>
                                    <span className="text-gray-400">/100</span>
                                </div>

                                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                    {project.description || 'No description available'}
                                </p>

                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Calendar size={14} />
                                    <span>{dateStr ? new Date(dateStr).toLocaleDateString() : 'Active'}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
