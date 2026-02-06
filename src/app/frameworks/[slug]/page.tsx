import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Bookmark } from "lucide-react";
import { frameworks } from "@/data/frameworks";
import { CodeBlock } from "@/components/shared/code-block";
import { getComplexityColor, getComplexityLabel, getTierColor } from "@/lib/utils";

export async function generateStaticParams() {
  return frameworks.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const fw = frameworks.find((f) => f.slug === slug);
  if (!fw) return { title: "Not Found" };
  return { title: fw.name, description: fw.description };
}

export default async function FrameworkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fw = frameworks.find((f) => f.slug === slug);
  if (!fw) notFound();

  const related = frameworks.filter((f) => fw.relatedFrameworks.includes(f.slug));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--text-primary)]">หน้าหลัก</Link>
        <span>/</span>
        <Link href="/frameworks" className="hover:text-[var(--text-primary)]">Frameworks</Link>
        <span>/</span>
        <span className="text-[var(--text-primary)]">{fw.name}</span>
      </div>

      {/* Header */}
      <div className="mb-10 flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl" style={{ background: `${fw.accentColor}15`, color: fw.accentColor }}>
          {fw.icon}
        </div>
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h1 className="font-[family-name:var(--font-playfair-display)] text-3xl font-bold">{fw.name}</h1>
            <span className={`rounded-lg px-3 py-1 text-xs font-black ${getTierColor(fw.tier)}`}>Tier {fw.tier}</span>
            <span className={`rounded border px-2 py-0.5 text-xs font-semibold ${getComplexityColor(fw.complexity)}`}>{getComplexityLabel(fw.complexity)}</span>
          </div>
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[var(--text-muted)]">{fw.acronym}</p>
        </div>
      </div>

      {/* Description */}
      <p className="mb-10 text-lg leading-relaxed text-[var(--text-secondary)]">{fw.detailedDescription}</p>

      {/* Components */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold">Components</h2>
        <div className="grid gap-3">
          {fw.components.map((c) => (
            <div key={c.name} className="flex gap-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
              {c.letter && <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold" style={{ background: `${fw.accentColor}15`, color: fw.accentColor }}>{c.letter}</div>}
              <div>
                <h3 className="font-semibold" style={{ color: fw.accentColor }}>{c.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold">ตัวอย่าง Prompt</h2>
        <div className="space-y-4">
          {fw.examplePrompts.map((ex, i) => (
            <CodeBlock key={i} code={ex} label={`ตัวอย่างที่ ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* Pros & Cons */}
      <div className="mb-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h3 className="mb-3 font-bold text-emerald-400">✅ ข้อดี</h3>
          <ul className="space-y-2">{fw.pros.map((p) => <li key={p} className="text-sm text-[var(--text-secondary)]">• {p}</li>)}</ul>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="mb-3 font-bold text-red-400">❌ ข้อเสีย</h3>
          <ul className="space-y-2">{fw.cons.map((c) => <li key={c} className="text-sm text-[var(--text-secondary)]">• {c}</li>)}</ul>
        </div>
      </div>

      {/* Use Cases */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold">เหมาะกับงานประเภท</h2>
        <div className="flex flex-wrap gap-2">
          {fw.useCases.map((u) => (
            <span key={u} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2 text-sm text-[var(--text-secondary)]">{u}</span>
          ))}
        </div>
      </section>

      {/* References */}
      {fw.references.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">แหล่งอ้างอิง</h2>
          <div className="space-y-2">
            {fw.references.map((r) => (
              <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#6366f1] hover:underline">
                <ExternalLink size={14} /> {r.title}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">Frameworks ที่เกี่ยวข้อง</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/frameworks/${r.slug}`} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 transition-all hover:border-[#6366f1]/30">
                <div className="mb-1 text-2xl">{r.icon}</div>
                <h4 className="font-semibold text-[var(--text-primary)]">{r.name}</h4>
                <p className="text-xs text-[var(--text-muted)]">{r.bestFor.join(", ")}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="flex gap-3">
        <Link href="/frameworks" className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] px-5 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-card)]">
          <ArrowLeft size={16} /> กลับ Frameworks
        </Link>
        <button className="flex items-center gap-2 rounded-xl border border-[#6366f1]/30 bg-[#6366f1]/10 px-5 py-2.5 text-sm text-[#6366f1] hover:bg-[#6366f1]/20">
          <Bookmark size={16} /> บันทึก
        </button>
      </div>
    </div>
  );
}
