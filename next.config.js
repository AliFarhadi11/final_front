/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // reactStrictMode: true,

  compiler: {
    styledComponents: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains:
    [
      "*","fbref.com",'playerscubestore.storage.iran.liara.space',
      // "localhost:8000",
      "d2p3bygnnzw9w3.cloudfront.net",
      "https://playerscubestore.storage.iran.liara.space"
    ],
    // remotePatterns: [
    //   {
    //     protocol: '**',
    //     hostname: '**',
    //     port: '',
    //     pathname: '**',
    //   },
    // ],
  },

}

module.exports = nextConfig
