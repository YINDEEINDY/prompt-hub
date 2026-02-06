import Link from "next/link";
import { comparisonData } from "@/data/comparison";

function Badge({ rating }: { rating: 1 | 2 | 3 }) {
  const styles = {
    3: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    2: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    1: "bg-gray-500/15 text-gray-400 border-gray-500/30",
  };
  return <span className={`inline-block rounded border px-2 py-0.5 text-[0.7rem] font-bold ${styles[rating]}`}>{"★".repeat(rating)}{"☆".repeat(3 - rating)}</span>;
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[var(--bg-card)]">
            <th className="border-b-2 border-[var(--border-color)] px-4 py-3 text-left font-bold text-[#6366f1]">Framework</th>
            <th className="border-b-2 border-[var(--border-color)] px-4 py-3 text-left font-bold text-[#6366f1]">Components</th>
            <th className="border-b-2 border-[var(--border-color)] px-4 py-3 text-left font-bold text-[#6366f1]">Claude</th>
            <th className="border-b-2 border-[var(--border-color)] px-4 py-3 text-left font-bold text-[#6366f1]">ChatGPT</th>
            <th className="border-b-2 border-[var(--border-color)] px-4 py-3 text-left font-bold text-[#6366f1]">เหมาะกับ</th>
            <th className="border-b-2 border-[var(--border-color)] px-4 py-3 text-left font-bold text-[#6366f1]">จุดเด่น</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((row) => (
            <tr key={row.slug} className="transition-colors hover:bg-[var(--bg-card-hover)]">
              <td className="border-b border-[var(--border-color)] px-4 py-3"><Link href={`/frameworks/${row.slug}`} className="font-bold text-[var(--text-primary)] hover:text-[#6366f1]">{row.framework}</Link></td>
              <td className="border-b border-[var(--border-color)] px-4 py-3 text-[var(--text-secondary)]">{row.components}</td>
              <td className="border-b border-[var(--border-color)] px-4 py-3"><Badge rating={row.claude} /></td>
              <td className="border-b border-[var(--border-color)] px-4 py-3"><Badge rating={row.chatgpt} /></td>
              <td className="border-b border-[var(--border-color)] px-4 py-3 text-[var(--text-secondary)]">{row.bestFor}</td>
              <td className="border-b border-[var(--border-color)] px-4 py-3 text-[var(--text-secondary)]">{row.highlight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
