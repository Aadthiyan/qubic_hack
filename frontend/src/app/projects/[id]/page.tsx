'use client';

import React from 'react';
import Link from 'next/link';
import { useProject } from '../../../hooks/useProjects';
import { ArrowLeft, ExternalLink, Shield, AlertTriangle, CheckCircle, Github, Globe, FileText, Twitter, Lock } from 'lucide-react';
import ScoreRadar from '../../../components/detail/ScoreRadar';
import { motion } from 'framer-motion';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const { data: projectData, isLoading, isError } = useProject(params.id);

    if (isLoading) return <div className="p-12 text-center text-gray-500">Loading project details...</div>;
    if (isError || !projectData) return <div className="p-12 text-center text-red-400">Error loading project.</div>;

    const { project, metadata, score, config } = projectData;

    // Helper for grade colors
    const getGradeColor = (grade: string) => {
        switch (grade) {
            case 'Green': return 'text-green-400 border-green-500/50 bg-green-500/10';
            case 'Yellow': return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10';
            case 'Red': return 'text-red-400 border-red-500/50 bg-red-500/10';
            default: return 'text-gray-400 border-gray-500/50';
        }
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Header */}
            <div>
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-4 transition">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>

                <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-4xl font-bold text-white">{project.name}</h1>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getGradeColor(score?.grade || 'Gray')}`}>
                                {score?.grade || 'Pending'}
                            </span>
                        </div>
                        <p className="text-gray-400 max-w-2xl text-lg">{project.description}</p>
                    </div>

                    <div className="flex gap-3">
                        {project.websiteUrl && (
                            <a href={project.websiteUrl} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white">
                                <Globe size={20} />
                            </a>
                        )}
                        {project.twitterHandle && (
                            <a href={`https://twitter.com/${project.twitterHandle.replace('@', '')}`} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white">
                                <Twitter size={20} />
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white">
                                <Github size={20} />
                            </a>
                        )}
                        {project.whitepaperUrl && (
                            <a href={project.whitepaperUrl} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white">
                                <FileText size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Score & Radar Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 glass-panel p-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Shield className="text-blue-400" /> Security Score Breakdown
                        </h3>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-white">{score?.score || 0}<span className="text-gray-500 text-lg">/100</span></div>
                            <div className="text-sm text-gray-400">Total Score</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="h-[300px] flex items-center justify-center">
                            {score ? <ScoreRadar score={score} /> : <div className="text-gray-500">No score data</div>}
                        </div>
                        <div className="space-y-4">
                            <ScoreRow label="Tokenomics" score={score?.tokenomicsScore} max={20} />
                            <ScoreRow label="Vesting Schedule" score={score?.vestingScore} max={20} />
                            <ScoreRow label="Documentation" score={score?.documentationScore} max={15} />
                            <ScoreRow label="Team History" score={score?.teamHistoryScore} max={15} />
                            <ScoreRow label="Community" score={score?.communityScore} max={15} />
                            <ScoreRow label="Audit Status" score={score?.auditScore} max={10} />
                            <ScoreRow label="Launch Readiness" score={score?.launchReadinessScore} max={5} />
                        </div>
                    </div>
                </motion.div>

                {/* Launch Config Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel p-6 bg-gradient-to-b from-blue-900/20 to-transparent border-blue-500/20"
                >
                    <h3 className="text-lg font-bold mb-4 text-blue-200">Recommended Launch Config</h3>
                    {config ? (
                        <div className="space-y-6">
                            <div>
                                <div className="text-sm text-blue-300/60 mb-1">Recommended Cap</div>
                                <div className="text-2xl font-mono text-white">
                                    {(config.capMin / 1000)}k - {(config.capMax / 1000)}k <span className="text-sm text-blue-400">USDT</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm text-blue-300/60 mb-1">Platform Fee</div>
                                    <div className="text-xl font-bold text-white max-w-full truncate">{config.feeTierPercent}%</div>
                                </div>
                                <div>
                                    <div className="text-sm text-blue-300/60 mb-1">Access Tier</div>
                                    <div className="text-xl font-bold text-white capitalize max-w-full truncate">{config.accessTier}</div>
                                </div>
                            </div>

                            <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-500/20 text-sm text-blue-200/80 italic">
                                "{config.recommendation}"
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-sm">Config not generated yet.</div>
                    )}
                </motion.div>
            </div>

            {/* Risk Flags & Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Risk Flags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-6"
                >
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <AlertTriangle className="text-yellow-400" /> Risk Analysis
                    </h3>

                    <div className="space-y-3">
                        {score?.flags && score.flags.length > 0 ? (
                            score.flags.map((flag: any, i: number) => (
                                <div key={i} className={`p-3 rounded-lg border flex gap-3 ${flag.severity === 'high' ? 'bg-red-500/10 border-red-500/20 text-red-200' :
                                        flag.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-200' :
                                            'bg-blue-500/10 border-blue-500/20 text-blue-200'
                                    }`}>
                                    <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${flag.severity === 'high' ? 'bg-red-500' :
                                            flag.severity === 'medium' ? 'bg-yellow-500' :
                                                'bg-blue-500'
                                        }`} />
                                    <div className="text-sm">{flag.text || flag.flag_text}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 text-sm italic">No significant risks detected.</div>
                        )}
                    </div>
                </motion.div>

                {/* Project Metadata */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel p-6"
                >
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <CheckCircle className="text-green-400" /> Token Parameters
                    </h3>

                    {metadata ? (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-gray-400">Team Allocation</span>
                                <span className={metadata.teamAllocationPercent > 20 ? 'text-yellow-400' : 'text-white'}>
                                    {metadata.teamAllocationPercent}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-gray-400">Vesting Period</span>
                                <span className="text-white">{metadata.teamVestingMonths} Months</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-gray-400">Founder Lock</span>
                                <span className="text-white flex items-center gap-2">
                                    {metadata.hasFounderLocks ? (
                                        <><Lock size={14} className="text-green-400" /> Locked</>
                                    ) : (
                                        <><AlertTriangle size={14} className="text-red-400" /> Unlocked</>
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-gray-400">Total Supply</span>
                                <span className="text-white font-mono">{parseInt(metadata.totalSupply || '0').toLocaleString()}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-sm">No metadata available.</div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

function ScoreRow({ label, score = 0, max }: { label: string, score?: number, max: number }) {
    const percentage = (score / max) * 100;
    const color = percentage > 80 ? 'bg-green-500' : percentage > 50 ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{label}</span>
                <span className="text-white font-mono">{score}/{max}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} transition-all duration-1000`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
