"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { frameworks } from "@/data/frameworks";
import { techniques } from "@/data/techniques";
import { proTips } from "@/data/pro-tips";
import { ultimatePromptTemplate } from "@/data/ultimate-prompt";
import { FrameworkCard } from "@/components/dashboard/framework-card";
import { TechniqueCard } from "@/components/dashboard/technique-card";
import { TierList } from "@/components/dashboard/tier-list";
import { ComparisonTable } from "@/components/dashboard/comparison-table";
import { CodeBlock } from "@/components/shared/code-block";
import { MotionStagger, MotionItem, MotionWrapper } from "@/components/shared/motion-wrapper";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "frameworks", label: "🏗️ Frameworks ทั้งหมด" },
  { id: "techniques", label: "⚡ Techniques ขั้นสูง" },
  { id: "compare", label: "📊 เปรียบเทียบ" },
  { id: "tierlist", label: "🏆 Tier List" },
  { id: "ultimate", label: "💎 Ultimate Prompt" },
  { id: "tips", label: "💡 Pro Tips" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("frameworks");
  const [search, setSearch] = useState("");
  const [complexityFilter, setComplexityFilter] = useState("");

  const filteredFrameworks = useMemo(() => {
    return frameworks.filter((f) => {
      const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.description.includes(search);
      const matchComplexity = !complexityFilter || f.complexity.includes(complexityFilter);
      return matchSearch && matchComplexity;
    });
  }, [search, complexityFilter]);

  const filteredTechniques = useMemo(() => {
    return techniques.filter((t) => !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.includes(search));
  }, [search]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20">
      {/* Hero */}
      <MotionWrapper className="py-16 text-center">
        <div className="mb-6 inline-block rounded-full border border-[#8b5cf6] px-5 py-1.5 text-xs uppercase tracking-widest text-[#8b5cf6]">
          📊 Deep Analysis — 2026
        </div>
        <h1 className="mb-4 font-[family-name:var(--font-playfair-display)] text-4xl font-black gradient-text md:text-5xl">
          Prompt Engineering Patterns
        </h1>
        <p className="mx-auto max-w-2xl text-[var(--text-secondary)]">
          วิเคราะห์เชิงลึก Framework และ Pattern ทั้งหมดที่ดีที่สุดในโลก พร้อมคำแนะนำว่าควรใช้แบบไหน เมื่อไหร่ และทำไม
        </p>
        <div className="mt-6 flex justify-center gap-8 text-sm text-[var(--text-muted)]">
          <span><strong className="text-[var(--text-primary)]">{frameworks.length}</strong> Frameworks</span>
          <span><strong className="text-[var(--text-primary)]">{techniques.length}</strong> Techniques</span>
          <span>อัปเดต: <strong className="text-[var(--text-primary)]">ก.พ. 2026</strong></span>
        </div>
      </MotionWrapper>

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn(
            "rounded-xl border px-5 py-2.5 text-sm transition-all",
            activeTab === tab.id
              ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]"
              : "border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[#6366f1]/50 hover:text-[var(--text-primary)]"
          )}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search (for frameworks/techniques tabs) */}
      {(activeTab === "frameworks" || activeTab === "techniques") && (
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input type="text" placeholder="ค้นหา framework หรือ technique..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#6366f1]" />
          </div>
          {activeTab === "frameworks" && (
            <select onChange={(e) => setComplexityFilter(e.target.value)} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-3 text-sm text-[var(--text-secondary)] outline-none">
              <option value="">ทุกระดับ</option>
              <option value="low">ต่ำ</option>
              <option value="medium">กลาง</option>
              <option value="high">สูง</option>
              <option value="flexible">ปรับได้</option>
            </select>
          )}
        </div>
      )}

      {/* Content Sections */}
      {activeTab === "frameworks" && (
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-playfair-display)] text-2xl font-bold">Prompt Frameworks ที่ดีที่สุดในโลก</h2>
          <p className="mb-8 text-sm text-[var(--text-secondary)]">รวม {frameworks.length} frameworks จากงานวิจัยและบริษัท AI ชั้นนำ</p>
          <MotionStagger className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredFrameworks.map((f) => (
              <MotionItem key={f.slug}><FrameworkCard framework={f} /></MotionItem>
            ))}
          </MotionStagger>
          {filteredFrameworks.length === 0 && <p className="py-12 text-center text-[var(--text-muted)]">ไม่พบ framework ที่ตรงกับการค้นหา</p>}
        </div>
      )}

      {activeTab === "techniques" && (
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-playfair-display)] text-2xl font-bold">Advanced Prompting Techniques</h2>
          <p className="mb-8 text-sm text-[var(--text-secondary)]">เทคนิคขั้นสูงที่สามารถผสมร่วมกับ Framework ใดก็ได้</p>
          <MotionStagger className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredTechniques.map((t) => (
              <MotionItem key={t.slug}><TechniqueCard technique={t} /></MotionItem>
            ))}
          </MotionStagger>
        </div>
      )}

      {activeTab === "compare" && (
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-playfair-display)] text-2xl font-bold">เปรียบเทียบ Framework</h2>
          <p className="mb-8 text-sm text-[var(--text-secondary)]">ตารางเปรียบเทียบทุกมิติเพื่อเลือก framework ที่เหมาะสมที่สุด</p>
          <ComparisonTable />
          <div className="mt-6 rounded-2xl border border-[#6366f1]/20 bg-gradient-to-r from-[#6366f1]/5 to-[#ec4899]/5 p-6">
            <h3 className="mb-2 text-sm font-bold text-[#6366f1]">💡 Key Insight</h3>
            <p className="text-sm text-[var(--text-secondary)]">ไม่มี framework ใดที่ดีที่สุดสำหรับทุกงาน แต่สำหรับ Claude โดยเฉพาะ XML Tags pattern ให้ผลดีที่สุดเพราะ Claude ถูก train มากับ XML tags โดยตรง</p>
          </div>
        </div>
      )}

      {activeTab === "tierlist" && (
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-playfair-display)] text-2xl font-bold">🏆 Tier List — สำหรับ Claude</h2>
          <p className="mb-8 text-sm text-[var(--text-secondary)]">จัดอันดับ patterns/frameworks ตามประสิทธิภาพกับ Claude โดยเฉพาะ</p>
          <TierList />
        </div>
      )}

      {activeTab === "ultimate" && (
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-playfair-display)] text-2xl font-bold">💎 Ultimate Prompt Pattern</h2>
          <p className="mb-8 text-sm text-[var(--text-secondary)]">ผสมจุดเด่นของทุก framework เข้าด้วยกัน — ดีที่สุดเท่าที่จะเป็นไปได้</p>
          <CodeBlock code={ultimatePromptTemplate} label="THE ULTIMATE PROMPT PATTERN" />
        </div>
      )}

      {activeTab === "tips" && (
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-playfair-display)] text-2xl font-bold">💡 Pro Tips จาก Anthropic & Experts</h2>
          <p className="mb-8 text-sm text-[var(--text-secondary)]">เคล็ดลับจาก Anthropic&apos;s Prompt Doctor และงานวิจัยล่าสุด</p>
          <MotionStagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {proTips.map((tip) => (
              <MotionItem key={tip.number}>
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 transition-all hover:border-[#8b5cf6]/30">
                  <div className="mb-2 font-[family-name:var(--font-playfair-display)] text-3xl font-black text-[#8b5cf6]/40">{tip.number}</div>
                  <h4 className="mb-2 font-bold text-[var(--text-primary)]">{tip.title}</h4>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{tip.description}</p>
                </div>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      )}
    </div>
  );
}
