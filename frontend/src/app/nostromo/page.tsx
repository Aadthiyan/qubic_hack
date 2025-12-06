'use client';

import React from 'react';
import Link from 'next/link';
import { useProjects, useProject } from '../../hooks/useProjects';
import { AlertTriangle, ArrowRight, Shield, TrendingUp, Wallet } from 'lucide-react';

// Wrapper to fetch score for a single project card
const LaunchpadCard = ({ id }: { id: string }) => {
    const { data, isLoading } = useProject(id);

    if (isLoading || !data) return <div className="h-64 bg-white/5 animate-pulse rounded-xl" />;

    const { project, score, config } = data;
    const progress = Math.floor(Math.random() * 60) + 20; // Mock progress

    return (
        <div className="bg-[#1a1b2e] border border-white/5 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all group relative">
            {/* Guardian Score Badge - THE INTEGRATION */}
            <div className="absolute top-4 right-4 z-10">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md font-bold text-xs shadow-lg ${score?.grade === 'Green' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        score?.grade === 'Yellow' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                            'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}>
                    <Shield size={12} className="fill-current" />
                    <span>Guardian Score: {score?.score || 'N/A'}</span>
                </div>
            </div>

            <div className="h-32 bg-gradient-to-br from-blue-900 to-indigo-900 relative">
                <div className="absolute -bottom-6 left-6 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-xl font-bold border-4 border-[#1a1b2e]">
                    {project.name.charAt(0)}
                </div>
            </div>

            <div className="pt-8 px-6 pb-6">
                <h3 className="font-bold text-lg text-white mb-1">{project.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">{project.description}</p>

                <div className="flex gap-2 mb-4">
                    {config ? (
                        <span className="text-xs bg-blue-500/10 text-blue-300 px-2 py-1 rounded border border-blue-500/20">
                            cap: ${(config.capMax / 1000)}k
                        </span>
                    ) : null}
                    <span className="text-xs bg-purple-500/10 text-purple-300 px-2 py-1 rounded border border-purple-500/20">
                        IDO Q1 2025
                    </span>
                </div>

                {/* Integration Details: Risk Flags */}
                {score?.flags && score.flags.length > 0 && (
                    <div className="mb-4 p-2 bg-red-500/5 rounded border border-red-500/10">
                        <div className="flex items-start gap-2">
                            <AlertTriangle size={12} className="text-red-400 mt-0.5" />
                            <p className="text-xs text-red-300 line-clamp-1">{score.flags[0].text}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div style={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>0 USDT</span>
                        <span>100k USDT</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition text-sm">
                        Participate
                    </button>
                    <Link href={`/projects/${project.id}`}>
                        <button className="p-2 border border-white/10 hover:bg-white/5 rounded-lg text-gray-400 transition" title="View Risk Report">
                            <Shield size={20} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default function NostromoPage() {
    const { data: projectsData, isLoading } = useProjects(1, 'draft'); // Fetch drafts as mock upcoming IDOs

    return (
        <div className="min-h-screen bg-[#0f111a] text-white">
            {/* Mock Nostromo Header */}
            <div className="border-b border-white/5 bg-[#1a1b2e]/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">NOSTROMO</span>
                        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
                            <a href="#" className="text-white">Launchpad</a>
                            <a href="#" className="hover:text-white transition">Staking</a>
                            <a href="#" className="hover:text-white transition">Governance</a>
                            <Link href="/" className="hover:text-white transition flex items-center gap-1">
                                <Shield size={14} className="text-green-400" /> Guardian
                            </Link>
                        </nav>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition">
                        <Wallet size={16} /> Connect Wallet
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Upcoming Launches</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Participate in top-tier projects launching on Qubic. All projects are audited and scored by Nostromo Guardian protocol.
                    </p>
                </div>

                {isLoading ? (
                    <div className="text-center py-12 text-gray-500">Loading pools...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projectsData?.projects?.map((project) => (
                            <LaunchpadCard key={project.id} id={project.id} />
                        ))}
                        {/* Fallback if no projects */}
                        {!projectsData?.projects?.length && (
                            <div className="col-span-3 text-center py-12 border border-dashed border-white/10 rounded-xl">
                                <p className="text-gray-500">No active pools found.</p>
                                <Link href="/sandbox" className="text-blue-400 text-sm mt-2 inline-block hover:underline">
                                    Simulate a project launch
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
