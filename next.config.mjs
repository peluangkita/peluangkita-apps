/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
      ],
    },
    // webpack: (config) => {
    //   config.externals = [...config.externals, 'bcrypt'];
    //   return config;
    // },
  };
  
  export default nextConfig;
  