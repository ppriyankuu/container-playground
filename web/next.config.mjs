/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imageio.forbes.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'imgs.search.brave.com',
                pathname: '/**',
            },
        ]
    }
};

export default nextConfig;
