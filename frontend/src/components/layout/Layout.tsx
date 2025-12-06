'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Rocket, ShieldCheck, BarChart3, Settings } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: Rocket },
    { name: 'Sandbox', href: '/sandbox', icon: ShieldCheck },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-[#0f0f0f]/50 backdrop-blur-xl flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Nostromo
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">Guardian of the Qubic Galaxy</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link key={item.href} href={item.href}>
                                <div
                                    className={clsx(
                                        'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
                                        isActive
                                            ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    )}
                                >
                                    <Icon size={20} className={isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-white'} />
                                    <span className="font-medium">{item.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_currentColor]"
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                        <Settings size={20} />
                        <span className="font-medium">Settings</span>
                    </button>
                    <div className="mt-4 px-4 py-2 bg-blue-900/10 rounded-lg border border-blue-500/10">
                        <p className="text-xs text-blue-300 font-mono">Network: Qubic Testnet</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative">
                {/* Background ambient glow */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                    <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px]" />
                    <div className="absolute bottom-[-20%] right-[20%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[128px]" />
                </div>

                <div className="relative z-10 p-8 w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
