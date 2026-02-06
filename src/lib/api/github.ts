import type { GitHubRepo } from "@/types";

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/search/repositories?q=prompt+engineering&sort=stars&order=desc&per_page=10",
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.items || []).map((r: any) => ({
      id: r.id, name: r.name, full_name: r.full_name,
      description: r.description, html_url: r.html_url,
      stargazers_count: r.stargazers_count, forks_count: r.forks_count,
      updated_at: r.updated_at, language: r.language,
    }));
  } catch {
    return [];
  }
}
