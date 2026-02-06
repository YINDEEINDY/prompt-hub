"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Password ไม่ตรงกัน");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "เกิดข้อผิดพลาด");
      } else {
        router.push("/login?registered=1");
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
            สมัครสมาชิก
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            สร้างบัญชีเพื่อใช้งาน Prompt Hub
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[var(--text-primary)]">
              ชื่อที่แสดง
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="ชื่อของคุณ"
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-dark)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#6366f1] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[var(--text-primary)]">
              Username <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => updateField("username", e.target.value)}
              placeholder="อย่างน้อย 3 ตัวอักษร"
              required
              minLength={3}
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-dark)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#6366f1] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[var(--text-primary)]">
              Email <span className="text-xs text-[var(--text-muted)]">(ไม่บังคับ)</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="email@example.com"
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-dark)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#6366f1] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[var(--text-primary)]">
              Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="อย่างน้อย 6 ตัวอักษร"
              required
              minLength={6}
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-dark)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#6366f1] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[var(--text-primary)]">
              ยืนยัน Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              placeholder="กรอก password อีกครั้ง"
              required
              minLength={6}
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-dark)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#6366f1] focus:outline-none"
            />
          </div>

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
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-[var(--text-secondary)]">
            มีบัญชีแล้ว?{" "}
            <Link href="/login" className="text-[#6366f1] hover:underline">
              เข้าสู่ระบบ
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
