import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function getComplexityColor(complexity: string): string {
  const map: Record<string, string> = {
    low: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    "low-medium": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    "medium-high": "text-orange-400 bg-orange-400/10 border-orange-400/20",
    high: "text-red-400 bg-red-400/10 border-red-400/20",
    flexible: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  };
  return map[complexity] || "text-gray-400 bg-gray-400/10 border-gray-400/20";
}

export function getComplexityLabel(complexity: string): string {
  const map: Record<string, string> = {
    low: "ต่ำ", "low-medium": "ต่ำ-กลาง", medium: "กลาง",
    "medium-high": "กลาง-สูง", high: "สูง", flexible: "ปรับได้",
  };
  return map[complexity] || complexity;
}

export function getTierColor(tier: string): string {
  const map: Record<string, string> = {
    S: "bg-red-500 text-white", A: "bg-amber-500 text-black",
    B: "bg-emerald-500 text-black", C: "bg-cyan-500 text-black",
    D: "bg-gray-500 text-white",
  };
  return map[tier] || "bg-gray-500 text-white";
}
