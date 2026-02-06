import type { ComparisonRow } from "@/types";

export const comparisonData: ComparisonRow[] = [
  { framework: "XML Tags", slug: "xml-tags", components: 6, claude: 3, chatgpt: 2, flexibility: "สูงมาก", bestFor: "ทุกงาน", highlight: "Native กับ Claude, ปรับ tag ได้อิสระ" },
  { framework: "COSTAR", slug: "costar", components: 6, claude: 2, chatgpt: 3, flexibility: "กลาง", bestFor: "Content", highlight: "ชนะ competition, ครอบคลุมด้าน communication" },
  { framework: "RISEN", slug: "risen", components: 5, claude: 2, chatgpt: 3, flexibility: "กลาง", bestFor: "Complex tasks", highlight: "มี Steps + Narrowing ที่ไม่เหมือนใคร" },
  { framework: "CRISPE", slug: "crispe", components: 6, claude: 2, chatgpt: 2, flexibility: "กลาง", bestFor: "Strategy", highlight: "มี Experiment component สำหรับ iterate" },
  { framework: "Contract", slug: "contract-pattern", components: 5, claude: 3, chatgpt: 1, flexibility: "กลาง", bestFor: "API/System", highlight: "Anthropic แนะนำ, กระชับ, ตรวจสอบได้" },
  { framework: "RTF", slug: "rtf", components: 3, claude: 2, chatgpt: 2, flexibility: "ต่ำ", bestFor: "Quick tasks", highlight: "เร็ว เรียบง่าย ได้ผลทันที" },
  { framework: "GOLET", slug: "golet", components: 5, claude: 2, chatgpt: 2, flexibility: "สูง", bestFor: "Production", highlight: "มี Evaluation criteria ในตัว" },
  { framework: "4-Block", slug: "four-block", components: 4, claude: 2, chatgpt: 2, flexibility: "กลาง", bestFor: "Universal", highlight: "สมดุลระหว่างความง่ายกับความครบ" },
];
