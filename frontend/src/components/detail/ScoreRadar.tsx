'use client';

import React from 'react';
import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { Score } from '../../types';

interface ScoreRadarProps {
    score: Score;
}

export default function ScoreRadar({ score }: ScoreRadarProps) {
    const data = [
        { subject: 'Tokenomics', A: score.tokenomicsScore, fullMark: 20 },
        { subject: 'Vesting', A: score.vestingScore, fullMark: 20 },
        { subject: 'Docs', A: score.documentationScore, fullMark: 15 },
        { subject: 'Team', A: score.teamHistoryScore, fullMark: 15 },
        { subject: 'Community', A: score.communityScore, fullMark: 15 },
        { subject: 'Audit', A: score.auditScore, fullMark: 10 },
        { subject: 'Readiness', A: score.launchReadinessScore, fullMark: 5 },
    ];

    // Normalize to 100 for better chart visual, or keep raw?
    // Let's normalize to % of fullMark for the chart shape to be fair
    const normalizedData = data.map((d) => ({
        ...d,
        A: (d.A / d.fullMark) * 100, // Percentage
        raw: d.A,
        max: d.fullMark
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const dataPoint = normalizedData.find(d => d.subject === label);
            return (
                <div className="bg-black/90 border border-white/10 p-2 rounded text-xs">
                    <p className="text-white font-bold">{label}</p>
                    <p className="text-blue-400">Score: {dataPoint?.raw} / {dataPoint?.max}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={normalizedData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Score"
                        dataKey="A"
                        stroke="#60a5fa"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                    />
                    <Tooltip content={<CustomTooltip />} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
