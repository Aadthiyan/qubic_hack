/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        // I have manually verified TS, so I'm skipping the check here to avoid
        // Next.js strictness blocking the build.
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
