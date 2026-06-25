"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function AccountMenu() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createBrowserSupabase();

    // Initial fetch
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    const supabase = createBrowserSupabase();
    await supabase.auth.signOut();
    setOpen(false);
    router.refresh();
  }

  // Not logged in
  if (!user) {
    return (
      <Link
        href="/login"
        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
      >
        登录
      </Link>
    );
  }

  // Avatar letter: email first char, or phone first digit
  const avatarLetter = (user.email ?? user.phone ?? "U")[0].toUpperCase();

  return (
    <div ref={menuRef} className="relative">
      {/* Avatar button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-emerald-900/30 hover:from-emerald-400 hover:to-teal-400 transition-all"
        aria-label="账号菜单"
        aria-expanded={open}
      >
        {avatarLetter}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-black/90 backdrop-blur-lg shadow-xl shadow-black/50 overflow-hidden z-50">
          {/* Email hint */}
          <div className="px-4 py-2.5 text-xs text-white/40 border-b border-white/10 truncate">
            {user.email ?? user.phone}
          </div>

          <Link
            href="/account/orders"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            我的订单
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors border-t border-white/10"
          >
            退出
          </button>
        </div>
      )}
    </div>
  );
}
