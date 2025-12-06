'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex h-[80vh] w-full flex-col items-center justify-center text-white">
            <div className="p-4 rounded-full bg-red-500/10 text-red-500 mb-6">
                <AlertTriangle size={48} />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Application Error</h2>
            <p className="mb-6 text-gray-400 max-w-md text-center">
                We encountered an unexpected issue properly rendering this page.
            </p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
            >
                Try again
            </button>
        </div>
    )
}
