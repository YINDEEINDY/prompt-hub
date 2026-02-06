"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Technique } from "@/types";

export function TechniqueCard({ technique }: { technique: Technique }) {
  return (
    <Link href={`/techniques/${technique.slug}`}>
      <motion.div whileHover={{ y: -4 }} className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-7 transition-all hover:shadow-lg hover:shadow-black/20">
        <div className="absolute left-0 right-0 top-0 h-[3px] opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `linear-gradient(90deg, ${technique.accentColor}, transparent)` }} />

        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl" style={{ background: `${technique.accentColor}15`, color: technique.accentColor }}>
            {technique.icon}
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{technique.name}</h3>
        </div>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">{technique.description}</p>

        <div className="rounded-lg border border-[var(--border-color)] bg-[#0d0d14] p-4">
          <pre className="line-clamp-3 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#c9d1d9]">{technique.exampleCode}</pre>
        </div>
      </motion.div>
    </Link>
  );
}
