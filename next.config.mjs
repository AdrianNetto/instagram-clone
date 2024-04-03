/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  images: {
    domains: ["www.jennexplores.com", "upload.wikimedia.org"],
  },
};

export default nextConfig;
