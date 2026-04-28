<h1 align="center">Prompt Hub</h1>

<p align="center">
  A deep dive into prompt engineering patterns — frameworks, techniques, comparisons, and an Ultimate Prompt builder.<br/>
  Bilingual Thai/English. Editorial typography. Dark-first.
</p>

<p align="center">
  <a href="https://prompt-hub-weld-tau.vercel.app"><b>Live demo →</b></a>
</p>

<p align="center">
  <img src="https://api.microlink.io/?url=https://prompt-hub-weld-tau.vercel.app&screenshot=true&embed=screenshot.url&meta=false&viewport.width=1280&viewport.height=720" alt="Prompt Hub homepage" width="100%" />
</p>

---

## What it is

A single page where someone learning prompt engineering can stop bouncing between blog posts and start comparing techniques side-by-side.

12 frameworks (CRISPE, RTF, Chain-of-Thought, ReAct, …), 6 advanced techniques (few-shot, role prompting, self-consistency, …), tier list, a comparison view, and a builder that walks you through composing your own.

## Why I built it

Most prompt-engineering content online is one technique per article, in English. I wanted a comparison surface — see all of them in one place, in Thai, with examples that aren't 2024-stale.

## Features

- **12 Frameworks** — each with definition, when-to-use, anti-pattern, and a working example
- **6 Advanced Techniques** — chain-of-thought, ReAct, self-consistency, tree-of-thought, etc.
- **Side-by-side comparison** — pick any 2-4 patterns, see them solve the same task
- **Tier list** — opinionated ranking with rationale
- **Ultimate Prompt builder** — guided composition of structured prompts
- **Bilingual** — Thai-first, English fallback
- **Dark-first design** — editorial typography, gradient accents

## Stack

Next.js · TypeScript · Tailwind CSS · framer-motion · MDX (content) · Vercel

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

---

Built by **Yindee Sajarern** ([@YINDEEINDY](https://github.com/YINDEEINDY)).
