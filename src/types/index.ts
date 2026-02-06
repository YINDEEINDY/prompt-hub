export interface Framework {
  slug: string;
  name: string;
  acronym: string;
  icon: string;
  accentColor: string;
  description: string;
  components: FrameworkComponent[];
  bestFor: string[];
  complexity: string;
  tier: "S" | "A" | "B" | "C" | "D";
  claudeRating: 1 | 2 | 3;
  chatgptRating: 1 | 2 | 3;
  flexibility: string;
  highlight: string;
  detailedDescription: string;
  examplePrompts: string[];
  pros: string[];
  cons: string[];
  useCases: string[];
  references: { title: string; url: string }[];
  relatedFrameworks: string[];
}

export interface FrameworkComponent {
  letter: string;
  name: string;
  description: string;
}

export interface Technique {
  slug: string;
  name: string;
  icon: string;
  accentColor: string;
  description: string;
  exampleCode: string;
  detailedDescription: string;
  whenToUse: string[];
  whenNotToUse: string[];
  compatibleFrameworks: string[];
  beforeExample?: string;
  afterExample?: string;
}

export interface TierItem {
  tier: "S" | "A" | "B" | "C" | "D";
  items: { name: string; icon: string; slug?: string }[];
}

export interface ComparisonRow {
  framework: string;
  slug: string;
  components: number;
  claude: 1 | 2 | 3;
  chatgpt: 1 | 2 | 3;
  flexibility: string;
  bestFor: string;
  highlight: string;
}

export interface ProTip {
  number: string;
  title: string;
  description: string;
}

export interface DevToArticle {
  id: number;
  title: string;
  url: string;
  description: string;
  cover_image: string | null;
  published_at: string;
  user: { name: string; profile_image: string };
  tag_list: string[];
  positive_reactions_count: number;
}

export interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  published: string;
  link: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string | null;
}

export interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  score: number;
  num_comments: number;
  permalink: string;
  created_utc: number;
  author: string;
}

export interface SavedPrompt {
  id: string;
  title: string;
  frameworkSlug: string;
  content: string;
  components: Record<string, string>;
  createdAt: string;
}
