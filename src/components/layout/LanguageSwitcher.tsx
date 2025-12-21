"use client";

import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (locale: string) => {
    document.cookie = `locale=${locale};path=/;max-age=31536000`;
    startTransition(() => {
      router.refresh();
    });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
        disabled={isPending}
      >
        <Globe size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-black/95 backdrop-blur-lg rounded-lg shadow-xl border border-gray-800 overflow-hidden">
          <button
            onClick={() => switchLocale("zh")}
            className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-purple-500/20 transition-colors"
          >
            中文
          </button>
          <button
            onClick={() => switchLocale("en")}
            className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-purple-500/20 transition-colors"
          >
            English
          </button>
        </div>
      )}
    </div>
  );
}
