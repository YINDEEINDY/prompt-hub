export const ultimatePromptTemplate = `<role>
คุณคือ [บทบาท] ที่มีความเชี่ยวชาญใน [สาขา]
ระดับ: [junior/senior/expert]
</role>

<context>
<!-- Background ทั้งหมดที่ AI ต้องรู้ -->
สถานการณ์: [อธิบาย background]
กลุ่มเป้าหมาย: [ใครจะใช้ output นี้]
ข้อมูลเพิ่มเติม: [ข้อจำกัด, งบประมาณ, timeline]
</context>

<objective>
<!-- เป้าหมายหลัก 1 อย่างที่ชัดเจน -->
[สิ่งที่ต้องทำ + ทำไม + สำเร็จแล้วจะเป็นอย่างไร]
</objective>

<task>
<!-- แบ่งเป็นขั้นตอนถ้าซับซ้อน -->
1. [ขั้นตอนที่ 1]
2. [ขั้นตอนที่ 2]
3. [ขั้นตอนที่ 3]
</task>

<examples>
<!-- 2-3 ตัวอย่างของ input → output ที่ต้องการ -->
<example>
  Input: [ตัวอย่าง input]
  Output: [ตัวอย่าง output ที่ต้องการ]
</example>
</examples>

<input>
[ข้อมูลจริงที่ให้ทำงาน]
</input>

<output_format>
รูปแบบ: [JSON/Markdown/Table/Prose/Code]
ความยาว: [กี่คำ/กี่บรรทัด/กี่หน้า]
ภาษา: [ไทย/อังกฤษ/ทั้งสอง]
โทน: [formal/casual/technical]
</output_format>

<guidelines>
DO:
- [สิ่งที่ต้องทำ]
- [สิ่งที่ต้องทำ]

DON'T:
- [สิ่งที่ห้ามทำ]
- [สิ่งที่ห้ามทำ]
</guidelines>

<thinking>
คิดทีละขั้นตอนก่อนตอบ แสดงกระบวนการคิดอย่างชัดเจน
</thinking>

<evaluation>
ตรวจสอบ output ของคุณว่า:
- [ ] ตรงตาม objective หรือไม่?
- [ ] ครบตาม task ทุกข้อหรือไม่?
- [ ] อยู่ในรูปแบบที่กำหนดหรือไม่?
ถ้าไม่ผ่านข้อใด ให้แก้ไขก่อนส่ง
</evaluation>`;
