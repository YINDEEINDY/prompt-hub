"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, User, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/frameworks", label: "Frameworks" },
  { href: "/techniques", label: "Techniques" },
  { href: "/trending", label: "Trending" },
  { href: "/builder", label: "Builder" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLoggedIn = status === "authenticated" && session?.user;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-dark)]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span>🧠</span>
          <span className="gradient-text font-[family-name:var(--font-playfair-display)]">Prompt Hub</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={cn(
              "rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === l.href ? "bg-[#6366f1]/10 text-[#6366f1]" : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
            )}>{l.label}</Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-card)]" aria-label="Toggle theme">
            {mounted ? (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />) : <Sun size={18} />}
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-lg border border-[#6366f1]/30 bg-[#6366f1]/10 px-3 py-2 text-sm text-[#6366f1] hover:bg-[#6366f1]/20"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6366f1] text-xs font-bold text-white">
                  {session?.user?.name?.charAt(0).toUpperCase() || <User size={14} />}
                </div>
                <span className="hidden md:inline">{session?.user?.name}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-2 shadow-xl">
                  <div className="mb-2 border-b border-[var(--border-color)] px-3 pb-2">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{session?.user?.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{session?.user?.email || "ไม่มีอีเมล"}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-dark)]"
                  >
                    <User size={16} /> Prompt ที่บันทึก
                  </Link>
                  <button
                    onClick={() => { setProfileOpen(false); signOut(); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut size={16} /> ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hidden rounded-lg border border-[#6366f1]/30 bg-[#6366f1]/10 px-4 py-2 text-sm text-[#6366f1] hover:bg-[#6366f1]/20 md:block">
              เข้าสู่ระบบ
            </Link>
          )}

          <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-[var(--text-secondary)] md:hidden" aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--border-color)] bg-[var(--bg-dark)] px-4 py-4 md:hidden">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={cn(
              "block rounded-lg px-3 py-2 text-sm",
              pathname === l.href ? "bg-[#6366f1]/10 text-[#6366f1]" : "text-[var(--text-secondary)]"
            )}>{l.label}</Link>
          ))}
          {isLoggedIn ? (
            <>
              <div className="my-2 border-t border-[var(--border-color)] pt-2">
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6366f1] text-sm font-bold text-white">
                    {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{session?.user?.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{session?.user?.email || ""}</p>
                  </div>
                </div>
              </div>
              <Link href="/profile" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)]">
                Prompt ที่บันทึก
              </Link>
              <button
                onClick={() => { setOpen(false); signOut(); }}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-400"
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="mt-2 block rounded-lg border border-[#6366f1]/30 bg-[#6366f1]/10 px-4 py-2 text-center text-sm text-[#6366f1]">
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
