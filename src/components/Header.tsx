"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-white hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Открыть меню</span>
        </Button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-background/90 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <Link 
                href="/" 
                className="text-2xl font-medium text-white hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Каталог
              </Link>
              <Link 
                href="/contacts" 
                className="text-2xl font-medium text-white hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Контакты
              </Link>
              <Button
                variant="ghost"
                size="lg"
                className="mt-8 text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Закрыть
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
