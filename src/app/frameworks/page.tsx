import type { Metadata } from "next";
import { frameworks } from "@/data/frameworks";
import { FrameworkCard } from "@/components/dashboard/framework-card";

export const metadata: Metadata = { title: "Frameworks ทั้งหมด" };

export default function FrameworksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-2 font-[family-name:var(--font-playfair-display)] text-3xl font-bold gradient-text">Prompt Frameworks ทั้งหมด</h1>
      <p className="mb-10 text-[var(--text-secondary)]">รวม {frameworks.length} frameworks จากงานวิจัยและบริษัท AI ชั้นนำ</p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {frameworks.map((f) => <FrameworkCard key={f.slug} framework={f} />)}
      </div>
    </div>
  );
}
