import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
            <div className="p-4 rounded-full bg-white/5 text-gray-400 mb-6">
                <FileQuestion size={48} />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">Page Not Found</h2>
            <p className="text-gray-400 mb-8">The resource you are looking for does not exist.</p>
            <Link href="/" className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition">
                Return Dashboard
            </Link>
        </div>
    )
}
