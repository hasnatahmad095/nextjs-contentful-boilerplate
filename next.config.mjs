const { NEXT_PUBLIC_API_BASE_URL } = process.env;


/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {

    ignoreDuringBuilds: true,
  },
  images: {

    domains: ['']
  },
};

export default nextConfig;



