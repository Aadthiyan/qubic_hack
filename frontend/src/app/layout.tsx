import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import QueryProvider from '../providers/QueryProvider';
import Layout from '../components/layout/Layout';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
    title: 'Nostromo Guardian | Risk Scoring Protocol',
    description: 'AI-driven risk assessment and scoring engine for Qubic ecosystem launches.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <body className={inter.className}>
                <QueryProvider>
                    <Layout>{children}</Layout>
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            style: {
                                background: '#0a0a0a',
                                color: '#fff',
                                border: '1px solid rgba(255,255,255,0.1)'
                            },
                        }}
                    />
                </QueryProvider>
            </body>
        </html>
    );
}
