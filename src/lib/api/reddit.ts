import type { RedditPost } from "@/types";

export async function fetchRedditPosts(): Promise<RedditPost[]> {
  try {
    const res = await fetch(
      "https://www.reddit.com/r/PromptEngineering/hot.json?limit=10",
      {
        headers: { "User-Agent": "PromptEngineeringHub/1.0" },
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data?.data?.children || [])
      .filter((c: any) => !c.data.stickied)
      .map((c: any) => ({
        id: c.data.id, title: c.data.title,
        selftext: String(c.data.selftext || "").slice(0, 300),
        score: c.data.score, num_comments: c.data.num_comments,
        permalink: c.data.permalink, created_utc: c.data.created_utc,
        author: c.data.author,
      }));
  } catch {
    return [];
  }
}
