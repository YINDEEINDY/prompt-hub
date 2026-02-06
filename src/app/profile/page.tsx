"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Copy, Check, ArrowLeft } from "lucide-react";
import type { SavedPrompt } from "@/types";

export default function ProfilePage() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchPrompts();
  }, []);

  async function fetchPrompts() {
    try {
      const res = await fetch("/api/prompts");
      if (res.status === 401) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }
      if (!res.ok) {
        setError("ไม่สามารถโหลดข้อมูลได้");
        return;
      }
      const data = await res.json();
      setPrompts(data);
    } catch {
      setError("ไม่สามารถเชื่อมต่อได้");
    } finally {
      setLoading(false);
    }
  }

  async function deletePrompt(id: string) {
    try {
      const res = await fetch(`/api/prompts?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setPrompts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      // silently fail
    }
  }

  async function copyContent(id: string, content: string) {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <p className="mb-4 text-[var(--text-secondary)]">{error}</p>
        <Link href="/login" className="rounded-xl bg-[#6366f1] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5558e6]">
          เข้าสู่ระบบ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 font-[family-name:var(--font-playfair-display)] text-3xl font-bold gradient-text">
        Prompt ที่บันทึกไว้
      </h1>
      <p className="mb-8 text-[var(--text-secondary)]">
        จัดการ prompt ที่คุณสร้างจาก Builder
      </p>

      {prompts.length === 0 ? (
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-10 text-center">
          <div className="mb-3 text-4xl">📝</div>
          <p className="mb-4 text-[var(--text-secondary)]">ยังไม่มี prompt ที่บันทึกไว้</p>
          <Link href="/builder" className="rounded-xl bg-[#6366f1] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5558e6]">
            สร้าง Prompt ใหม่
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {prompts.map((p) => (
            <div key={p.id} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{p.title}</h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {p.frameworkSlug && <span className="mr-2 rounded bg-[#6366f1]/10 px-2 py-0.5 text-[#6366f1]">{p.frameworkSlug.toUpperCase()}</span>}
                    {new Date(p.createdAt).toLocaleDateString("th-TH")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyContent(p.id, p.content)}
                    className="rounded-lg border border-[var(--border-color)] p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    {copiedId === p.id ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <button
                    onClick={() => deletePrompt(p.id)}
                    className="rounded-lg border border-red-500/20 p-2 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <pre className="whitespace-pre-wrap rounded-lg bg-[#0d0d14] p-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#c9d1d9]">
                {p.content}
              </pre>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link href="/" className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={16} /> กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
