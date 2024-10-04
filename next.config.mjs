/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/_not-found",
        destination: "/404",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
