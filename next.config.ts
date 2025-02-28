import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
  remotePatterns: [
   {
    protocol: "https", // The protocol (https, http, etc.)
    hostname: "placehold.co", // The domain name
    port: "", // Port is optional and can be left empty if not required
   },
   {
    protocol: "https", // The protocol (https, http, etc.)
    hostname: "cdn.sanity.io", // The domain name
    port: "", // Port is optional and can be left empty if not required
   },
  ],
 },
};

export default nextConfig;
