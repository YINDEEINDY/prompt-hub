import type { Metadata } from "next";
import { Noto_Sans_Thai, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: { default: "Prompt Engineering Hub", template: "%s | Prompt Engineering Hub" },
  description: "ศูนย์กลางความรู้ Prompt Engineering — รวม Framework, Technique, และเครื่องมือสร้าง Prompt ที่ดีที่สุด",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${notoSansThai.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} font-[family-name:var(--font-noto-sans-thai)] antialiased`}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <div className="bg-grid" />
            <Navbar />
            <main className="relative z-10 min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
