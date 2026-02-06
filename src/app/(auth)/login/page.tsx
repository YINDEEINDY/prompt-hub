"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Username หรือ Password ไม่ถูกต้อง");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("ไม่สามารถเชื่อมต่อได้");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8">
        <div className="mb-6 text-center">
          <div className="mb-3 text-4xl">🧠</div>
          <h1 className="font-[family-name:var(--font-playfair-display)] text-2xl font-bold gradient-text">
            Prompt Hub
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            เข้าสู่ระบบเพื่อบันทึก prompt ที่ชอบ
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[var(--text-primary)]">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="กรอก username"
              required
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-dark)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#6366f1] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[var(--text-primary)]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรอก password"
              required
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-dark)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#6366f1] focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-[var(--border-color)] accent-[#6366f1]"
            />
            <span className="text-sm text-[var(--text-secondary)]">จดจำฉันไว้</span>
          </label>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#6366f1] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5558e6] disabled:opacity-50"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-[var(--text-secondary)]">
            ยังไม่มีบัญชี?{" "}
            <Link href="/register" className="text-[#6366f1] hover:underline">
              สมัครสมาชิก
            </Link>
          </p>
          <Link
            href="/"
            className="block text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            ← กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
