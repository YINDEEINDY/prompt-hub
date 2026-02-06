import type { Metadata } from "next";
import { techniques } from "@/data/techniques";
import { TechniqueCard } from "@/components/dashboard/technique-card";

export const metadata: Metadata = { title: "Techniques ทั้งหมด" };

export default function TechniquesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-2 font-[family-name:var(--font-playfair-display)] text-3xl font-bold gradient-text">Advanced Prompting Techniques</h1>
      <p className="mb-10 text-[var(--text-secondary)]">เทคนิคขั้นสูงที่สามารถผสมร่วมกับ Framework ใดก็ได้</p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {techniques.map((t) => <TechniqueCard key={t.slug} technique={t} />)}
      </div>
    </div>
  );
}
