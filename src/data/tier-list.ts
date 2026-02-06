import type { TierItem } from "@/types";

export const tierList: TierItem[] = [
  { tier: "S", items: [
    { name: "XML Tags (ของคุณ)", icon: "🏷️", slug: "xml-tags" },
    { name: "Contract Pattern", icon: "📜", slug: "contract-pattern" },
    { name: "CoT + XML", icon: "🧠", slug: "chain-of-thought" },
  ]},
  { tier: "A", items: [
    { name: "COSTAR", icon: "🌟", slug: "costar" },
    { name: "RISEN", icon: "🚀", slug: "risen" },
    { name: "GOLET", icon: "📐", slug: "golet" },
    { name: "Few-Shot + XML", icon: "🔄" },
  ]},
  { tier: "B", items: [
    { name: "CRISPE", icon: "🔬", slug: "crispe" },
    { name: "PECRA", icon: "📋", slug: "pecra" },
    { name: "4-Block", icon: "🧱", slug: "four-block" },
    { name: "OSCAR", icon: "🎬", slug: "oscar" },
  ]},
  { tier: "C", items: [
    { name: "RTF", icon: "⚡", slug: "rtf" },
    { name: "TAG", icon: "🏷️", slug: "tag" },
    { name: "APE", icon: "🎯", slug: "ape" },
    { name: "Markdown", icon: "📝" },
  ]},
  { tier: "D", items: [
    { name: "Zero-Shot (ถามตรงๆ)", icon: "💬" },
    { name: "Plain Text ยาวๆ", icon: "📄" },
  ]},
];
