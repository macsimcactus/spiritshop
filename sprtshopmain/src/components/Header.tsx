"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/40 backdrop-blur-xl py-3 border-b border-white/5" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-white font-bold text-xl md:text-2xl tracking-tight group-hover:text-primary transition-colors duration-300"
          >
            SPIRIT
          </motion.span>
          <motion.span
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-yellow-400 text-2xl md:text-3xl"
          >
            🌕
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-white font-bold text-xl md:text-2xl tracking-tight group-hover:text-primary transition-colors duration-300"
          >
            VIETNAM
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="nav-link">
            Каталог
          </Link>
          <Link href="/contacts" className="nav-link">
            Контакты
          </Link>
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Открыть меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background/90 backdrop-blur-xl border-l border-white/10">
            <nav className="flex flex-col items-start py-6 gap-6">
              <Link href="/" className="text-lg font-medium text-white hover:text-primary transition-colors">
                Каталог
              </Link>
              <Link href="/contacts" className="text-lg font-medium text-white hover:text-primary transition-colors">
                Контакты
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
