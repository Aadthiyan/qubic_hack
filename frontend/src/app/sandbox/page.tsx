'use client';

import React, { useEffect, useState } from 'react';
import { useSimulate } from '../../hooks/useSimulate';
import { useDebounce } from '../../hooks/useDebounce';
import { SimulateRequest, SimulateResponse } from '../../types';
import { AlertCircle, CheckCircle, RefreshCcw, Save } from 'lucide-react';
import ScoreRadar from '../../components/detail/ScoreRadar';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { api } from '../../utils/api';
import toast from 'react-hot-toast';

const defaultForm: SimulateRequest = {
    name: 'My New Project',
    teamAllocationPercent: 15,
    teamVestingMonths: 12,
    hasFounderLocks: true,
    supplyDistributionFair: true,
    hasWhitepaper: true,
    hasRoadmap: true,
    documentationClarity: 8,
    priorProjects: 1,
    trackRecord: 'neutral',
    twitterFollowers: 1000,
    discordMembers: 500,
    githubActivity: 5,
    hasAudit: false,
    hasBugBounty: false,
    hasKYC: false,
};

export default function SandboxPage() {
    const [form, setForm] = useState<SimulateRequest>(defaultForm);
    const [result, setResult] = useState<SimulateResponse | null>(null);
    const debouncedForm = useDebounce(form, 500);

    const { mutate: simulate, isPending } = useSimulate();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Set mounted state
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Trigger simulation when debounced form changes
    useEffect(() => {
        if (!isMounted) return; // Don't run on first render

        setError(null);
        try {
            simulate(debouncedForm, {
                onSuccess: (data) => {
                    setResult(data);
                    setError(null);
                },
                onError: (err) => {
                    console.error('Simulation failed', err);
                    setError('Failed to calculate score. Please check your connection.');
                    // Set a default result to prevent crashes
                    setResult({
                        score: 0,
                        grade: 'Red' as any,
                        breakdown: {
                            tokenomics: 0,
                            vesting: 0,
                            documentation: 0,
                            teamHistory: 0,
                            community: 0,
                            audit: 0,
                            launchReadiness: 0,
                        },
                        flags: [],
                        recommendation: 'Unable to calculate score. Please try again.',
                    });
                },
            });
        } catch (err) {
            console.error('Simulation error:', err);
            setError('An unexpected error occurred.');
        }
    }, [debouncedForm, simulate, isMounted]);

    const safeBreakdown = React.useMemo(() => {
        return result?.breakdown || {
            tokenomics: 0,
            vesting: 0,
            documentation: 0,
            teamHistory: 0,
            community: 0,
            audit: 0,
            launchReadiness: 0,
        };
    }, [result]);

    const safeFlags = React.useMemo(() => result?.flags || [], [result]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        let checked = false;
        if (e.target instanceof HTMLInputElement && type === 'checkbox') {
            checked = e.target.checked;
        }

        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked :
                type === 'number' || type === 'range' ? Math.round(Number(value)) : value,
        }));
    };

    const handleSave = async () => {
        if (!result) return;
        setIsSaving(true);
        try {
            // Construct payload matching ProjectSubmissionData
            const payload = {
                name: form.name.trim(),
                description: `Risk assessment simulation for ${form.name}`,
                websiteUrl: 'https://example.com',
                teamAllocationPercent: Math.round(form.teamAllocationPercent),
                teamVestingMonths: Math.round(form.teamVestingMonths),
                hasFounderLocks: form.hasFounderLocks,
                supplyDistributionFair: form.supplyDistributionFair,

                // Extended metadata for scoring
                hasWhitepaper: form.hasWhitepaper,
                hasRoadmap: form.hasRoadmap,
                documentationClarity: form.documentationClarity,
                priorProjects: form.priorProjects,
                trackRecord: form.trackRecord,
                twitterFollowers: form.twitterFollowers,
                discordMembers: form.discordMembers,
                githubActivity: form.githubActivity,
                hasAudit: form.hasAudit,
                hasBugBounty: form.hasBugBounty,
                hasKYC: form.hasKYC,
            };

            const { data } = await api.post('/projects', payload);

            toast.success('Project saved successfully!');
            // Backend returns { data: { project: { id: ... } } }
            router.push(`/projects/${data.data.project.id}`);
        } catch (error: any) {
            console.error('Save failed:', error);
            const msg = error.response?.data?.error?.message || error.response?.data?.message || 'Failed to save project. Please try again.';
            toast.error(msg);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-100px)]">
            {/* Left: Configuration Form */}
            <div className="lg:col-span-5 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                <div>
                    <h2 className="text-2xl font-bold text-white">Builder Sandbox</h2>
                    <p className="text-gray-400 text-sm">Simulate your project score in real-time.</p>
                </div>

                <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-gray-400 text-sm">Project Name</span>
                            <input
                                type="text" name="name" value={form.name} onChange={handleChange}
                                className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500/50 outline-none"
                            />
                        </label>
                    </div>

                    {/* Tokenomics */}
                    <div className="glass-panel p-5 space-y-4">
                        <h3 className="font-semibold text-blue-300 border-b border-white/5 pb-2">Tokenomics</h3>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Team Allocation (%)</span>
                                <span className="text-white">{form.teamAllocationPercent}%</span>
                            </div>
                            <input
                                type="range" name="teamAllocationPercent" min="0" max="50" value={form.teamAllocationPercent} onChange={handleChange}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Vesting (Months)</span>
                                <span className="text-white">{form.teamVestingMonths}m</span>
                            </div>
                            <input
                                type="range" name="teamVestingMonths" min="0" max="48" value={form.teamVestingMonths} onChange={handleChange}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" name="hasFounderLocks" checked={form.hasFounderLocks} onChange={handleChange} className="w-4 h-4 rounded border-gray-600 bg-white/5 text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm text-gray-300">Founder Wallets Locked</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" name="supplyDistributionFair" checked={form.supplyDistributionFair} onChange={handleChange} className="w-4 h-4 rounded border-gray-600 bg-white/5 text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm text-gray-300">Fair Supply Distribution</span>
                        </div>
                    </div>

                    {/* Documentation & Team */}
                    <div className="glass-panel p-5 space-y-4">
                        <h3 className="font-semibold text-purple-300 border-b border-white/5 pb-2">Team & Docs</h3>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Documentation Quality</span>
                                <span className="text-white">{form.documentationClarity}/10</span>
                            </div>
                            <input
                                type="range" name="documentationClarity" min="0" max="10" value={form.documentationClarity} onChange={handleChange}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center gap-2 text-sm text-gray-300">
                                <input type="checkbox" name="hasWhitepaper" checked={form.hasWhitepaper} onChange={handleChange} />
                                Whitepaper
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-300">
                                <input type="checkbox" name="hasRoadmap" checked={form.hasRoadmap} onChange={handleChange} />
                                Roadmap
                            </label>
                        </div>
                    </div>

                    {/* Community & Security */}
                    <div className="glass-panel p-5 space-y-4">
                        <h3 className="font-semibold text-green-300 border-b border-white/5 pb-2">Traction & Safety</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <label>
                                <span className="text-gray-400 text-xs">Twitter Followers</span>
                                <input type="number" name="twitterFollowers" value={form.twitterFollowers} onChange={handleChange} className="w-full mt-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white" />
                            </label>
                            <label>
                                <span className="text-gray-400 text-xs">Discord Members</span>
                                <input type="number" name="discordMembers" value={form.discordMembers} onChange={handleChange} className="w-full mt-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white" />
                            </label>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">GitHub Activity (0-10)</span>
                                <span className="text-white">{form.githubActivity}</span>
                            </div>
                            <input
                                type="range" name="githubActivity" min="0" max="10" value={form.githubActivity} onChange={handleChange}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="flex flex-col gap-2 mt-2">
                            <label className="flex items-center gap-2 text-sm text-gray-300">
                                <input type="checkbox" name="hasAudit" checked={form.hasAudit} onChange={handleChange} />
                                Smart Contract Audit (Exists)
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-300">
                                <input type="checkbox" name="hasBugBounty" checked={form.hasBugBounty} onChange={handleChange} />
                                Active Bug Bounty
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-300">
                                <input type="checkbox" name="hasKYC" checked={form.hasKYC} onChange={handleChange} />
                                Team KYC Verified
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Real-time Analysis */}
            <div className="lg:col-span-7 flex flex-col h-full bg-[#0a0a0a]/50 border-l border-white/5 pl-8 py-2">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        {isPending && <RefreshCcw size={18} className="animate-spin text-blue-400" />}
                        Live Assessment
                    </h2>
                    <button
                        onClick={handleSave}
                        disabled={!result || isSaving}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={16} /> {isSaving ? 'Saving...' : 'Save Draft'}
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {result ? (
                    <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar pb-10">
                        {/* Score Card */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <motion.div
                                className="glass-panel p-6 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-blue-900/20 to-transparent"
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Project Score</div>
                                <div className="text-6xl font-bold text-white mb-2">{result.score}</div>
                                <div className={`px-4 py-1 rounded-full text-sm font-bold border 
                                    ${result.grade === 'Green' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                        result.grade === 'Yellow' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                            'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                                    Grade: {result.grade}
                                </div>
                            </motion.div>

                            <div className="h-[250px]">
                                {/* Using a dummy score object for the radar chart based on simulation result */}
                                {result ? (
                                    <ScoreRadar score={{
                                        tokenomics: safeBreakdown.tokenomics || 0,
                                        vesting: safeBreakdown.vesting || 0,
                                        documentation: safeBreakdown.documentation || 0,
                                        teamHistory: safeBreakdown.teamHistory || 0,
                                        community: safeBreakdown.community || 0,
                                        audit: safeBreakdown.audit || 0,
                                        launchReadiness: safeBreakdown.launchReadiness || 0,
                                        score: result.score || 0,
                                        grade: result.grade || 'Red',
                                        tokenomicsScore: safeBreakdown.tokenomics || 0,
                                        vestingScore: safeBreakdown.vesting || 0,
                                        documentationScore: safeBreakdown.documentation || 0,
                                        teamHistoryScore: safeBreakdown.teamHistory || 0,
                                        communityScore: safeBreakdown.community || 0,
                                        auditScore: safeBreakdown.audit || 0,
                                        launchReadinessScore: safeBreakdown.launchReadiness || 0,
                                    } as any} />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                        No breakdown data available
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Breakdown Bars */}
                        <div className="glass-panel p-6">
                            <h3 className="font-bold text-white mb-4">Dimension Breakdown</h3>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                <DimensionBar label="Tokenomics" value={safeBreakdown.tokenomics || 0} max={20} />
                                <DimensionBar label="Vesting" value={safeBreakdown.vesting || 0} max={20} />
                                <DimensionBar label="Documentation" value={safeBreakdown.documentation || 0} max={15} />
                                <DimensionBar label="Team History" value={safeBreakdown.teamHistory || 0} max={15} />
                                <DimensionBar label="Community" value={safeBreakdown.community || 0} max={15} />
                                <DimensionBar label="Audit" value={safeBreakdown.audit || 0} max={10} />
                            </div>
                        </div>

                        {/* Improvement Checklist */}
                        <div className="glass-panel p-6 border-l-4 border-l-blue-500">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <CheckCircle size={18} className="text-blue-400" />
                                Optimization Checklist
                            </h3>
                            <div className="space-y-3">
                                {result.score < 100 && (
                                    <>
                                        {/* Dynamic Suggestions Logic (Mocked slightly for UI but logic is sound) */}
                                        {form.teamAllocationPercent > 10 && (
                                            <SuggestionItem text={`Reduce team allocation to < 10% (Current: ${form.teamAllocationPercent}%)`} impact="+5 pts" />
                                        )}
                                        {form.teamVestingMonths < 24 && (
                                            <SuggestionItem text={`Extend vesting to 24+ months (Current: ${form.teamVestingMonths}m)`} impact="+8 pts" />
                                        )}
                                        {!form.hasAudit && (
                                            <SuggestionItem text="Conduct a Smart Contract Audit" impact="+10 pts" />
                                        )}
                                        {form.documentationClarity < 7 && (
                                            <SuggestionItem text="Improve documentation clarity and detail" impact="+4 pts" />
                                        )}
                                        {!form.hasFounderLocks && (
                                            <SuggestionItem text="Lock founder wallet liquidity" impact="+5 pts" />
                                        )}
                                        {result.score > 90 ? <div className="text-green-400">Great job! Your project is well optimized.</div> : null}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Risk Flags */}
                        {safeFlags.length > 0 && (
                            <div className="glass-panel p-6 border-l-4 border-l-red-500">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <AlertCircle size={18} className="text-red-400" />
                                    Risk Flags Detected
                                </h3>
                                <div className="space-y-2">
                                    {safeFlags.map((flag: any, i: number) => (
                                        <div key={i} className="text-sm text-red-200 bg-red-500/10 px-3 py-2 rounded">
                                            • {typeof flag === 'string' ? flag : flag.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Adjust parameters to generate a score.
                    </div>
                )}
            </div>
        </div>
    );
}

function DimensionBar({ label, value, max }: { label: string, value: number, max: number }) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-1 text-gray-400">
                <span>{label}</span>
                <span>{value}/{max}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div style={{ width: `${(value / max) * 100}%` }} className="h-full bg-blue-500" />
            </div>
        </div>
    );
}

function SuggestionItem({ text, impact }: { text: string, impact: string }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 -mx-2 rounded transition">
            <span className="text-sm text-gray-300">{text}</span>
            <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">{impact}</span>
        </div>
    );
}
