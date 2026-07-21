/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // onnxruntime-node (pulled in by @xenova/transformers) ships prebuilt
  // native .node binaries for every OS/arch. Webpack tries to parse these
  // as JS during `next build` and fails. Keep them external so Node's own
  // require() loads them at runtime instead of webpack bundling them.
  experimental: {
    serverComponentsExternalPackages: ["onnxruntime-node", "@xenova/transformers"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("onnxruntime-node");
    }
    return config;
  },
};

export default nextConfig;