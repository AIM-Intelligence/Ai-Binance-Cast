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
};

export default nextConfig;
