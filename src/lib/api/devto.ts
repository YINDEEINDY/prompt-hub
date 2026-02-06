import type { DevToArticle } from "@/types";

export async function fetchDevToArticles(): Promise<DevToArticle[]> {
  try {
    const res = await fetch(
      "https://dev.to/api/articles?tag=promptengineering&per_page=12&top=7",
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
