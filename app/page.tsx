"use client"

import Link from "next/link"
import { getCategories } from "@/src/utils/staticData"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import LoadingCategories from "@/src/components/LoadingCategories"
import { motion } from "framer-motion"
import type { CategoryData } from "@/src/utils/staticData"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const loadCategories = async () => {
      try {
        // Прокрутка к верху страницы при загрузке
        window.scrollTo(0, 0)

        // Загрузка категорий
        const data = await getCategories()
        if (mounted) {
          setCategories(data)
          setIsLoading(false)
        }
      } catch (err) {
        if (mounted) {
          console.error('Ошибка при загрузке категорий:', err)
          setError('Не удалось загрузить категории. Пожалуйста, попробуйте позже.')
          setIsLoading(false)
        }
      }
    }

    loadCategories()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="min-h-screen pt-28 pb-16">
      {/* Hero section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 hero-gradient"
          >
            Только лучший стафф с доставкой за 15 мин
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-zinc-300 font-medium mb-8 max-w-xl mx-auto"
          >
            Премиум-доставка ПАВ по Вьетнаму 24/7. Быстро, надёжно, с душой!
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto"
          ></motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 mb-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-2xl font-bold text-center mb-10 text-white"
        >
          Выберите категорию
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-500 col-span-full"
            >
              {error}
            </motion.div>
          ) : isLoading ? (
            <div className="col-span-full">
              <LoadingCategories />
            </div>
          ) : categories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-zinc-400 col-span-full"
            >
              Категории пока не добавлены
            </motion.div>
          ) : (
            categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Link href={`/category/${encodeURIComponent(category.id)}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)" }}
                    className="glass-card h-full p-6 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-xl"
                    >
                      <ArrowRight className="h-5 w-5 text-white" />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <footer className="container mx-auto px-4 mt-auto pt-12 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-6 border-t border-white/5">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-zinc-400 text-center md:text-left">
              Премиум-доставка ПАВ по Вьетнаму 24/7
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} Spirit Vietnam. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
