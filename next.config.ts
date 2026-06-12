import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // /hd 反代 human-design 项目(vercel.app 国内打不开,借官网域名出口);
  // 对端 app 需配 basePath: '/hd',其资产/页面全部落在 /hd 下,一条规则全覆盖
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/hd/:path*",
          destination: "https://human-design-al.vercel.app/hd/:path*",
        },
        {
          source: "/hd",
          destination: "https://human-design-al.vercel.app/hd",
        },
      ],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-810d6e0711de44d396071ecfc5ae9c2a.r2.dev',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
