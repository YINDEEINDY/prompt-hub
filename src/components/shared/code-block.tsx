"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({ code, label, className }: { code: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("group relative rounded-xl border border-[var(--border-color)] bg-[#0d0d14]", className)}>
      {label && <div className="absolute right-3 top-2 text-[0.65rem] uppercase tracking-wider text-[var(--text-muted)]">{label}</div>}
      <button onClick={handleCopy} className="absolute right-3 top-8 rounded-md p-1.5 text-[var(--text-muted)] opacity-0 transition-all hover:bg-[var(--bg-card)] group-hover:opacity-100" aria-label="Copy">
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <pre className="overflow-x-auto p-6 font-[family-name:var(--font-jetbrains-mono)] text-[0.82rem] leading-relaxed text-[#c9d1d9]">{code}</pre>
    </div>
  );
}
