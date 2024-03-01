/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'k.kakaocdn.net',
        protocol: 'http',
      },
      {
        hostname: 'fhifmdvolxqfufqlrprk.supabase.co',
        protocol: 'https',
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty");
    return config;
  },
};

export default nextConfig;
