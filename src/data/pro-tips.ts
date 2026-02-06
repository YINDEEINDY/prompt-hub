import type { ProTip } from "@/types";

export const proTips: ProTip[] = [
  { number: "01", title: "Prompt สั้น ≠ Prompt แย่", description: "Anthropic บอกชัดเจนว่า \"Longer prompts are not the goal\" — prompt ที่ดีคือ prompt ที่ชัดเจน ไม่ใช่ prompt ที่ยาว" },
  { number: "02", title: "Claude จับ Tone จาก Prompt", description: "Claude จะจับสไตล์การเขียนจาก prompt ของคุณ ถ้าอยากได้ output ที่ formal ให้เขียน prompt แบบ formal ด้วย" },
  { number: "03", title: "บอกเหตุผล \"ทำไม\" เสมอ", description: "Claude 4.x ตอบสนองดีมากกับ motivation — อธิบายว่าทำไมถึงต้องทำแบบนี้ จะได้ output ที่ aligned กับเป้าหมาย" },
  { number: "04", title: "เฉพาะเจาะจงมากที่สุด", description: "Anthropic's Prompt Doctor: \"คิดว่ากำลังคุยกับ intern วันแรก\" — ยิ่งเฉพาะเจาะจง ยิ่งลดโอกาสที่ AI จะตีความผิด" },
  { number: "05", title: "ใช้ Examples เสมอ", description: "Few-shot examples เป็นเทคนิคที่ powerful ที่สุด ตัวอย่าง 2-3 อันดีกว่าคำอธิบายยาว 10 บรรทัด" },
  { number: "06", title: "Version ทุก Prompt", description: "บริษัท AI ที่ทำรายได้ $50M+ ทุกบริษัท version control prompt ของตัวเอง เก็บ log ว่า prompt ไหน work ไม่ work" },
  { number: "07", title: "หลีกเลี่ยงคำว่า \"think\" กับ Opus", description: "Claude Opus sensitive กับคำว่า \"think\" — ใช้ \"consider\", \"evaluate\", \"analyze\" แทน จะได้ผลดีกว่า" },
  { number: "08", title: "1 Prompt = 1 Task", description: "Prompt ที่ทำหลายอย่างพร้อมกันมักให้ผลแย่กว่า แบ่งเป็น prompt เล็กๆ หลายอัน test แยกกัน แล้วรวมทีหลัง" },
  { number: "09", title: "อย่า code ใน prompt ถ้าไม่จำเป็น", description: "งาน formatting, validation ที่ทำใน code ได้ อย่าโยนให้ LLM ทำ — ประหยัด token และ reliable กว่า" },
  { number: "10", title: "Iterate เหมือนนักวิทยาศาสตร์", description: "Anthropic เอง: \"Prompt engineering is a science\" — เปลี่ยนทีละอย่าง, test, เปรียบเทียบ, ทำซ้ำ ไม่มีทางลัด" },
];
