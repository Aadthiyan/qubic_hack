import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Nostromo Guardian - Risk Scoring for Qubic Launches',
    description: 'Dynamic risk assessment protocol for the Nostromo launchpad',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
