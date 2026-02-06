"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Copy, Check, Save, ArrowLeft } from "lucide-react";
import { frameworks } from "@/data/frameworks";
import type { Framework } from "@/types";

export default function BuilderPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [title, setTitle] = useState("");

  const selected: Framework | undefined = useMemo(
    () => frameworks.find((f) => f.slug === selectedSlug),
    [selectedSlug]
  );

  function handleFrameworkChange(slug: string) {
    setSelectedSlug(slug);
    setValues({});
    setCopied(false);
    setSaveMsg("");
  }

  function handleValueChange(componentName: string, value: string) {
    setValues((prev) => ({ ...prev, [componentName]: value }));
  }

  const generatedPrompt = useMemo(() => {
    if (!selected) return "";
    return selected.components
      .map((c) => {
        const val = values[c.name]?.trim();
        return val ? `${c.name}: ${val}` : null;
      })
      .filter(Boolean)
      .join("\n");
  }, [selected, values]);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function savePrompt() {
    if (!title.trim() || !generatedPrompt.trim()) return;
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          frameworkSlug: selectedSlug,
          content: generatedPrompt,
          components: values,
        }),
      });
      if (res.status === 401) {
        setSaveMsg("กรุณาเข้าสู่ระบบก่อนบันทึก");
      } else if (res.ok) {
        setSaveMsg("บันทึกสำเร็จ!");
      } else {
        setSaveMsg("เกิดข้อผิดพลาด");
      }
    } catch {
      setSaveMsg("ไม่สามารถเชื่อมต่อได้");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-2 font-[family-name:var(--font-playfair-display)] text-3xl font-bold gradient-text">
        Prompt Builder
      </h1>
      <p className="mb-8 text-[var(--text-secondary)]">
        เลือก Framework แล้วกรอกข้อมูลตาม component — สร้าง prompt คุณภาพสูงได้ทันที
      </p>

      {/* Framework Selector */}
      <div className="mb-8">
        <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">เลือก Framework</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {frameworks.map((f) => (
            <button
              key={f.slug}
              onClick={() => handleFrameworkChange(f.slug)}
              className={`rounded-xl border p-3 text-left text-sm transition-all ${
                selectedSlug === f.slug
                  ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]"
                  : "border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[#6366f1]/30"
              }`}
            >
              <span className="mr-2">{f.icon}</span>
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Form */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold">{selected.icon} {selected.name} Components</h2>
            <p className="text-sm text-[var(--text-muted)]">{selected.acronym}</p>
            {selected.components.map((c) => (
              <div key={c.name}>
                <label className="mb-1 block text-sm font-semibold" style={{ color: selected.accentColor }}>
                  {c.letter} — {c.name}
                </label>
                <p className="mb-1.5 text-xs text-[var(--text-muted)]">{c.description}</p>
                <textarea
                  rows={2}
                  value={values[c.name] || ""}
                  onChange={(e) => handleValueChange(c.name, e.target.value)}
                  placeholder={`กรอก ${c.name}...`}
                  className="w-full resize-none rounded-lg border border-[var(--border-color)] bg-[var(--bg-dark)] p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#6366f1] focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Preview + Actions */}
          <div>
            <h2 className="mb-4 text-lg font-bold">Live Preview</h2>
            <div className="rounded-xl border border-[var(--border-color)] bg-[#0d0d14] p-5">
              {generatedPrompt ? (
                <pre className="whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#c9d1d9]">
                  {generatedPrompt}
                </pre>
              ) : (
                <p className="text-sm text-[var(--text-muted)]">กรอก component ด้านซ้ายเพื่อดู preview...</p>
              )}
            </div>

            <div className="mt-4 space-y-3">
              <button
                onClick={copyToClipboard}
                disabled={!generatedPrompt}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6366f1] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5558e6] disabled:opacity-40"
              >
                {copied ? <><Check size={16} /> คัดลอกแล้ว!</> : <><Copy size={16} /> คัดลอก Prompt</>}
              </button>

              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
                <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">บันทึก Prompt</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ตั้งชื่อ prompt..."
                  className="mb-3 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-dark)] p-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#6366f1] focus:outline-none"
                />
                <button
                  onClick={savePrompt}
                  disabled={saving || !title.trim() || !generatedPrompt}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--border-color)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-card-hover)] disabled:opacity-40"
                >
                  <Save size={16} /> {saving ? "กำลังบันทึก..." : "บันทึก"}
                </button>
                {saveMsg && <p className="mt-2 text-center text-sm text-[var(--text-muted)]">{saveMsg}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10">
        <Link href="/" className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={16} /> กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
