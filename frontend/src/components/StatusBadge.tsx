'use client';

import React, { useState } from 'react';
import { api } from '../utils/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const STATUS_OPTIONS = [
    { value: 'draft', label: 'Draft', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
    { value: 'submitted', label: 'Submitted', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { value: 'approved', label: 'Approved', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { value: 'launched', label: 'Launched', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { value: 'failed', label: 'Failed', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
];

export default function StatusBadge({ projectId, currentStatus }: { projectId: string; currentStatus: string }) {
    const [isChanging, setIsChanging] = useState(false);
    const router = useRouter();

    const handleStatusChange = async (newStatus: string) => {
        if (newStatus === currentStatus) return;

        setIsChanging(true);
        try {
            await api.patch(`/projects/${projectId}/status`, { status: newStatus });
            toast.success(`Status changed to ${newStatus}`);
            router.refresh();
        } catch (error: any) {
            console.error('Status change failed:', error);
            toast.error(error.response?.data?.error?.message || 'Failed to update status');
        } finally {
            setIsChanging(false);
        }
    };

    const currentOption = STATUS_OPTIONS.find(opt => opt.value === currentStatus) || STATUS_OPTIONS[0];

    return (
        <div className="relative group">
            <button
                disabled={isChanging}
                className={`px-3 py-1 rounded-full text-xs font-bold border ${currentOption.color} hover:opacity-80 transition disabled:opacity-50`}
            >
                {isChanging ? 'Updating...' : currentOption.label}
            </button>

            <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl z-50 min-w-[120px]">
                {STATUS_OPTIONS.map(option => (
                    <button
                        key={option.value}
                        onClick={() => handleStatusChange(option.value)}
                        disabled={isChanging || option.value === currentStatus}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-white/5 transition first:rounded-t-lg last:rounded-b-lg disabled:opacity-50 ${option.value === currentStatus ? 'bg-white/10' : ''
                            }`}
                    >
                        <span className={option.color.split(' ')[1]}>{option.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
