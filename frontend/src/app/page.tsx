'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Filter, Plus, Search, Shield, TrendingUp, Users } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import ProjectTable from '../components/dashboard/ProjectTable';
import Link from 'next/link';

// Quick Stats Component
const StatsCards = ({ total = 0 }) => {
    const stats = [
        { title: 'Total Projects', value: total, change: 'Active', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { title: 'Average Score', value: '76', change: 'Stable', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
        { title: 'Safe Launches', value: '8', change: '100% Success', icon: Shield, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <span className="text-xs font-semibold text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                            {stat.change}
                        </span>
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </motion.div>
            ))}
        </div>
    );
};

export default function Dashboard() {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState<string>('');

    const { data, isLoading } = useProjects(page, status || undefined);

    const projects = data?.projects || [];
    const pagination = data?.pagination;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Project Dashboard</h2>
                    <p className="text-gray-400">Monitor and assess risk across the Qubic ecosystem.</p>
                </div>
                <Link href="/sandbox">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition shadow-lg shadow-blue-600/20">
                        <Plus size={16} />
                        New Assessment
                    </button>
                </Link>
            </div>

            <StatsCards total={pagination?.total} />

            {/* Filters & Actions */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-400 focus:outline-none focus:border-blue-500/50"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="draft">Draft</option>
                        <option value="submitted">Submitted</option>
                        <option value="approved">Approved</option>
                        <option value="launched">Launched</option>
                    </select>

                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:bg-white/10 transition">
                        <Filter size={16} />
                        More Filters
                    </button>
                </div>
            </div>

            {/* Project List */}
            <ProjectTable projects={projects} isLoading={isLoading} />

            {/* Pagination Controls */}
            {pagination && (
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <span className="text-sm text-gray-500">
                        Showing {((page - 1) * 10) + 1}-{Math.min(page * 10, pagination.total)} of {pagination.total}
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="px-3 py-1 text-sm bg-white/5 rounded border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            disabled={page >= pagination.totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="px-3 py-1 text-sm bg-white/5 rounded border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
