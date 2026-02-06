import type { ArxivPaper } from "@/types";
import { parseStringPromise } from "xml2js";

export async function fetchArxivPapers(): Promise<ArxivPaper[]> {
  try {
    const res = await fetch(
      "https://export.arxiv.org/api/query?search_query=all:prompt+engineering&sortBy=submittedDate&sortOrder=descending&max_results=10",
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    const xml = await res.text();
    const result = await parseStringPromise(xml);
    const entries = result?.feed?.entry || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return entries.map((entry: any) => ({
      id: String(entry.id?.[0] || ""),
      title: String(entry.title?.[0] || "").replace(/\n/g, " ").trim(),
      summary: String(entry.summary?.[0] || "").replace(/\n/g, " ").trim().slice(0, 300),
      authors: (entry.author || []).map((a: { name?: string[] }) => a.name?.[0] || ""),
      published: String(entry.published?.[0] || ""),
      link: String(entry.id?.[0] || ""),
    }));
  } catch {
    return [];
  }
}
