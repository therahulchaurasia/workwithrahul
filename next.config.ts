import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Dev-only: lets phones on the LAN load the JS bundles (hydration) when
  // hitting the dev server by IP. Ignored in production builds. The machine's
  // IP changes with the network, so past ones stay listed.
  allowedDevOrigins: ["192.168.100.116", "192.168.1.76"],
};

export default nextConfig;
