'use client';

import React from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { Activity, Shield, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
    const { data: analytics, isLoading, isError } = useAnalytics();

    if (isLoading) return <div className="p-12 text-center text-gray-500">Loading ecosystem analytics...</div>;
    if (isError || !analytics) return <div className="p-12 text-center text-red-400">Error loading data.</div>;

    // Prepare Pie Chart Data (Grade Distribution)
    const pieData = [
        { name: 'Green (Safe)', value: analytics.distribution.green, color: '#4ade80' },
        { name: 'Yellow (Caution)', value: analytics.distribution.yellow, color: '#facc15' },
        { name: 'Red (High Risk)', value: analytics.distribution.red, color: '#f87171' },
    ].filter(d => d.value > 0);

    // Prepare Bar Chart Data (Status Counts)
    const barData = Object.entries(analytics.statusCounts).map(([status, count]) => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        count,
    }));

    // Stats for cards
    const stats = [
        { title: 'Total Projects', value: analytics.totalProjects, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { title: 'Average Score', value: analytics.avgScore, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
        { title: 'Safe Projects', value: analytics.distribution.green, icon: Shield, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Ecosystem Analytics</h2>
                <p className="text-gray-400">Deep dive into the health of the Qubic ecosystem.</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                        <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Grade Distribution Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-6 h-[400px] flex flex-col"
                >
                    <h3 className="text-lg font-bold text-white mb-6">Risk Grade Distribution</h3>
                    <div className="flex-1 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#0f0f0f', borderColor: '#333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                        {pieData.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                No data available
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Status Distribution Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel p-6 h-[400px] flex flex-col"
                >
                    <h3 className="text-lg font-bold text-white mb-6">Project Status</h3>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                <RechartsTooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#0f0f0f', borderColor: '#333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Detailed Grade Breakdown Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-6"
            >
                <h3 className="text-lg font-bold text-white mb-6">Score Performance by Grade</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10 text-gray-400">
                                <th className="pb-3 pl-2">Grade</th>
                                <th className="pb-3 text-right">Projects</th>
                                <th className="pb-3 text-right">Avg Score</th>
                                <th className="pb-3 text-right">Min Score</th>
                                <th className="pb-3 text-right pr-2">Max Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {analytics.detailedDistribution.map((row) => (
                                <tr key={row.grade} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-3 pl-2 font-medium">
                                        <span className={`px-2 py-0.5 rounded text-xs ${row.grade === 'Green' ? 'bg-green-500/10 text-green-400' :
                                                row.grade === 'Yellow' ? 'bg-yellow-500/10 text-yellow-400' :
                                                    'bg-red-500/10 text-red-400'
                                            }`}>
                                            {row.grade}
                                        </span>
                                    </td>
                                    <td className="py-3 text-right text-white">{row.count}</td>
                                    <td className="py-3 text-right text-gray-300">{row.avgScore}</td>
                                    <td className="py-3 text-right text-gray-400">{row.minScore}</td>
                                    <td className="py-3 text-right text-gray-400 pr-2">{row.maxScore}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
