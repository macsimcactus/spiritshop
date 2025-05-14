import type React from "react"
import "../src/index.css"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import Header from "@/src/components/Header"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Spirit Vietnam",
  description: "Премиум-доставка ПАВ по Вьетнаму 24/7",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="noise-overlay"></div>
          <div className="gradient-bg"></div>
          <Header />
          <main className="flex-grow">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
