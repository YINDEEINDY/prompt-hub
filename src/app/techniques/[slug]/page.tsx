import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { techniques } from "@/data/techniques";
import { frameworks } from "@/data/frameworks";
import { CodeBlock } from "@/components/shared/code-block";

export async function generateStaticParams() {
  return techniques.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tech = techniques.find((t) => t.slug === slug);
  if (!tech) return { title: "Not Found" };
  return { title: tech.name, description: tech.description };
}

export default async function TechniqueDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tech = techniques.find((t) => t.slug === slug);
  if (!tech) notFound();

  const compatible = frameworks.filter((f) => tech.compatibleFrameworks.includes(f.slug));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--text-primary)]">หน้าหลัก</Link>
        <span>/</span>
        <Link href="/techniques" className="hover:text-[var(--text-primary)]">Techniques</Link>
        <span>/</span>
        <span className="text-[var(--text-primary)]">{tech.name}</span>
      </div>

      <div className="mb-10 flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl" style={{ background: `${tech.accentColor}15`, color: tech.accentColor }}>
          {tech.icon}
        </div>
        <div>
          <h1 className="font-[family-name:var(--font-playfair-display)] text-3xl font-bold">{tech.name}</h1>
        </div>
      </div>

      <p className="mb-10 text-lg leading-relaxed text-[var(--text-secondary)]">{tech.detailedDescription}</p>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold">ตัวอย่าง</h2>
        <CodeBlock code={tech.exampleCode} />
      </section>

      {tech.beforeExample && tech.afterExample && (
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">Before / After</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-red-400">❌ Before (ไม่ใช้เทคนิค)</h3>
              <CodeBlock code={tech.beforeExample} />
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-emerald-400">✅ After (ใช้เทคนิค)</h3>
              <CodeBlock code={tech.afterExample} />
            </div>
          </div>
        </section>
      )}

      <div className="mb-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h3 className="mb-3 font-bold text-emerald-400">✅ เมื่อไหร่ควรใช้</h3>
          <ul className="space-y-2">{tech.whenToUse.map((w) => <li key={w} className="text-sm text-[var(--text-secondary)]">• {w}</li>)}</ul>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="mb-3 font-bold text-red-400">❌ เมื่อไหร่ไม่ควรใช้</h3>
          <ul className="space-y-2">{tech.whenNotToUse.map((w) => <li key={w} className="text-sm text-[var(--text-secondary)]">• {w}</li>)}</ul>
        </div>
      </div>

      {compatible.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">ใช้ร่วมกับ Frameworks เหล่านี้ได้ดี</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {compatible.map((f) => (
              <Link key={f.slug} href={`/frameworks/${f.slug}`} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 transition-all hover:border-[#6366f1]/30">
                <div className="mb-1 text-2xl">{f.icon}</div>
                <h4 className="font-semibold text-[var(--text-primary)]">{f.name}</h4>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Link href="/techniques" className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] px-5 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-card)]">
        <ArrowLeft size={16} /> กลับ Techniques
      </Link>
    </div>
  );
}
