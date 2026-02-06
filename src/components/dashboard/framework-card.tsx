"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getComplexityColor, getComplexityLabel } from "@/lib/utils";
import type { Framework } from "@/types";

export function FrameworkCard({ framework }: { framework: Framework }) {
  return (
    <Link href={`/frameworks/${framework.slug}`}>
      <motion.div whileHover={{ y: -4 }} className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-7 transition-all hover:shadow-lg hover:shadow-black/20">
        <div className="absolute left-0 right-0 top-0 h-[3px] opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `linear-gradient(90deg, ${framework.accentColor}, transparent)` }} />

        <div className="mb-4 flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl" style={{ background: `${framework.accentColor}15`, color: framework.accentColor }}>
            {framework.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{framework.name}</h3>
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[var(--text-muted)]">{framework.acronym}</p>
          </div>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">{framework.description}</p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {framework.components.map((c) => (
            <span key={c.name} className="rounded-md border px-2.5 py-1 text-xs font-semibold" style={{ background: `${framework.accentColor}10`, color: framework.accentColor, borderColor: `${framework.accentColor}20` }}>
              {c.name}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 border-t border-[var(--border-color)] pt-4">
          <span className="text-xs text-[var(--text-muted)]">เหมาะกับ: <strong className="text-[var(--text-secondary)]">{framework.bestFor.join(", ")}</strong></span>
          <span className={`rounded border px-2 py-0.5 text-[0.7rem] font-semibold ${getComplexityColor(framework.complexity)}`}>{getComplexityLabel(framework.complexity)}</span>
        </div>
      </motion.div>
    </Link>
  );
}
