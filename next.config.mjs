/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ecommerce.routemisr.com",
                pathname: "/**",
            },
        ],
    },
    async headers() {
        if (process.env.NODE_ENV !== "production") return [];

        return [
            {
                source: "/:path*",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
                    { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
                ],
            },
        ];
    },
};

export default nextConfig;
