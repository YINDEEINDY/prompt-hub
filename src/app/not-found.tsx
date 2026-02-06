import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-6xl">🔍</div>
      <h1 className="mb-2 font-[family-name:var(--font-playfair-display)] text-4xl font-bold">404</h1>
      <p className="mb-6 text-[var(--text-secondary)]">ไม่พบหน้าที่คุณต้องการ</p>
      <Link
        href="/"
        className="rounded-xl bg-[#6366f1] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5558e6]"
      >
        กลับหน้าหลัก
      </Link>
    </div>
  );
}
