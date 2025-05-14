import type React from "react"
import "../src/index.css"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import Header from "@/src/components/Header"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spirit Vietnam",
  description: "Премиум-доставка ПАВ по Вьетнаму 24/7",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen flex flex-col">
            <div className="noise-overlay"></div>
            <div className="gradient-bg"></div>
            <Header />
            <main className="flex-grow">{children}</main>
            <footer className="container mx-auto px-4 py-6 mt-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-6">
                <p className="text-sm text-zinc-400">Премиум-доставка ПАВ по Вьетнаму 24/7</p>
                <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Spirit Vietnam</p>
              </div>
            </footer>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
