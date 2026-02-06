import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Star, GitFork, MessageCircle, ArrowUp, BookOpen } from "lucide-react";
import { fetchDevToArticles } from "@/lib/api/devto";
import { fetchArxivPapers } from "@/lib/api/arxiv";
import { fetchGitHubRepos } from "@/lib/api/github";
import { fetchRedditPosts } from "@/lib/api/reddit";

export const metadata: Metadata = {
  title: "Trending - Prompt Engineering",
  description: "บทความ, งานวิจัย, repos และ community posts เกี่ยวกับ Prompt Engineering",
};

export const revalidate = 86400;

export default async function TrendingPage() {
  const [articles, papers, repos, posts] = await Promise.all([
    fetchDevToArticles(),
    fetchArxivPapers(),
    fetchGitHubRepos(),
    fetchRedditPosts(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-2 font-[family-name:var(--font-playfair-display)] text-3xl font-bold gradient-text">
        Trending in Prompt Engineering
      </h1>
      <p className="mb-10 text-[var(--text-secondary)]">
        อัปเดตทุก 24 ชม. จาก DEV.to, arXiv, GitHub และ Reddit
      </p>

      {/* DEV.to Articles */}
      <section className="mb-12">
        <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
          <BookOpen size={20} className="text-[#6366f1]" /> บทความจาก DEV.to
        </h2>
        {articles.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">ไม่สามารถโหลดบทความได้ในขณะนี้</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((a) => (
              <a
                key={a.id}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 transition-all hover:border-[#6366f1]/30 hover:shadow-lg"
              >
                <h3 className="mb-2 line-clamp-2 font-semibold text-[var(--text-primary)] group-hover:text-[#6366f1]">
                  {a.title}
                </h3>
                <p className="mb-3 line-clamp-2 text-sm text-[var(--text-secondary)]">{a.description}</p>
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>{a.user.name}</span>
                  <span className="flex items-center gap-1">
                    <ArrowUp size={12} /> {a.positive_reactions_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* arXiv Papers */}
      <section className="mb-12">
        <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
          <BookOpen size={20} className="text-[#ec4899]" /> งานวิจัยจาก arXiv
        </h2>
        {papers.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">ไม่สามารถโหลดงานวิจัยได้ในขณะนี้</p>
        ) : (
          <div className="space-y-4">
            {papers.slice(0, 5).map((p) => (
              <a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 transition-all hover:border-[#ec4899]/30"
              >
                <h3 className="mb-2 font-semibold text-[var(--text-primary)] group-hover:text-[#ec4899]">
                  {p.title} <ExternalLink size={14} className="inline" />
                </h3>
                <p className="mb-2 line-clamp-3 text-sm text-[var(--text-secondary)]">{p.summary}</p>
                <div className="text-xs text-[var(--text-muted)]">
                  {p.authors.slice(0, 3).join(", ")}
                  {p.authors.length > 3 && ` +${p.authors.length - 3} more`}
                  <span className="ml-3">{new Date(p.published).toLocaleDateString("th-TH")}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* GitHub Repos */}
      <section className="mb-12">
        <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
          <Star size={20} className="text-[#f59e0b]" /> GitHub Repositories
        </h2>
        {repos.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">ไม่สามารถโหลด repositories ได้ในขณะนี้</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {repos.slice(0, 6).map((r) => (
              <a
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 transition-all hover:border-[#f59e0b]/30"
              >
                <h3 className="mb-1 font-semibold text-[var(--text-primary)] group-hover:text-[#f59e0b]">
                  {r.full_name}
                </h3>
                <p className="mb-3 line-clamp-2 text-sm text-[var(--text-secondary)]">{r.description}</p>
                <div className="flex gap-4 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1"><Star size={12} /> {r.stargazers_count.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><GitFork size={12} /> {r.forks_count.toLocaleString()}</span>
                  {r.language && <span className="rounded bg-[var(--bg-dark)] px-2 py-0.5">{r.language}</span>}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Reddit Posts */}
      <section className="mb-12">
        <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
          <MessageCircle size={20} className="text-[#f97316]" /> Reddit r/PromptEngineering
        </h2>
        {posts.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">ไม่สามารถโหลดโพสต์ได้ในขณะนี้</p>
        ) : (
          <div className="space-y-3">
            {posts.slice(0, 8).map((p) => (
              <a
                key={p.id}
                href={`https://reddit.com${p.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 transition-all hover:border-[#f97316]/30"
              >
                <div className="flex shrink-0 flex-col items-center text-xs text-[var(--text-muted)]">
                  <ArrowUp size={14} />
                  <span>{p.score}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="line-clamp-1 font-semibold text-[var(--text-primary)] group-hover:text-[#f97316]">{p.title}</h3>
                  {p.selftext && <p className="mt-1 line-clamp-2 text-sm text-[var(--text-secondary)]">{p.selftext}</p>}
                  <div className="mt-2 flex gap-3 text-xs text-[var(--text-muted)]">
                    <span>u/{p.author}</span>
                    <span>{p.num_comments} comments</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">← กลับหน้าหลัก</Link>
    </div>
  );
}
