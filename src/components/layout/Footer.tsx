"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const siteMatrix = [
  { href: "/academy", zh: "心灵大学", en: "Academy" },
  { href: "/mas-life", zh: "MAS-Life OS", en: "MAS-Life OS" },
  { href: "https://onepad.spiritual-oasis.net", zh: "爱宝 OnePad", en: "OnePad", external: true },
  { href: "https://www.futuremind2075.com", zh: "未来教育学院", en: "Future Mind", external: true },
  { href: "https://mind.spiritual-oasis.net", zh: "心境", en: "Mind", external: true },
  { href: "https://seth.org.cn", zh: "赛斯对话", en: "Seth Dialogue", external: true },
  { href: "/about", zh: "关于我们", en: "About" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const pathname = usePathname();

  // 高考留资落地页保持纯净，不显示页脚
  if (pathname?.startsWith("/gaokao")) {
    return null;
  }

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-emerald-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">SO</span>
              </div>
              <span className="text-white font-medium text-xl">
                心灵家园 Spiritual Oasis
              </span>
            </div>
            <p className="text-gray-400 max-w-md">{t("slogan")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {nav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/academy"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {nav("academy")}
                </Link>
              </li>
              <li>
                <a
                  href="https://mind.spiritual-oasis.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {nav("mindos")}
                </a>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {nav("community")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {nav("about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4">{t("contact")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>contact@spiritualoasis.com</li>
              <li>{t("followUs")}</li>
              <li className="flex space-x-4 pt-2">
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors"
                >
                  WeChat
                </a>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Site Matrix */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h4 className="text-white font-medium mb-4">全部入口</h4>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {siteMatrix.map((item) => (
              <li key={item.href}>
                {"external" in item && item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {item.zh}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {item.zh}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
