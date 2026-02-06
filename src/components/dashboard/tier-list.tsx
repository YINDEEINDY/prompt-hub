import Link from "next/link";
import { tierList } from "@/data/tier-list";
import { getTierColor } from "@/lib/utils";

export function TierList() {
  return (
    <div className="flex flex-col gap-3">
      {tierList.map((row) => (
        <div key={row.tier} className="flex gap-3 max-sm:flex-col">
          <div className={`flex w-12 min-w-12 items-center justify-center rounded-xl text-xl font-black max-sm:w-full max-sm:py-2 ${getTierColor(row.tier)}`}>
            {row.tier}
          </div>
          <div className="flex flex-1 flex-wrap gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3">
            {row.items.map((item) => {
              const content = (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-[var(--text-primary)]">
                  {item.icon} {item.name}
                </span>
              );
              return item.slug ? (
                <Link key={item.name} href={item.slug.startsWith("chain") || item.slug.startsWith("self") || item.slug.startsWith("react") || item.slug.startsWith("iter") || item.slug.startsWith("meta") || item.slug.startsWith("tree") ? `/techniques/${item.slug}` : `/frameworks/${item.slug}`} className="transition-transform hover:scale-105">
                  {content}
                </Link>
              ) : <span key={item.name}>{content}</span>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
