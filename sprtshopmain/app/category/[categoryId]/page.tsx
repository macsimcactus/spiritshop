"use client"
import Link from "next/link"
import { getProductsByCategory } from "@/src/utils/staticData"
import ProductList from "@/src/components/ProductList"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import LoadingProducts from "@/src/components/LoadingProducts"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function CategoryPage({ params }: { params: { categoryId: string } }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Прокрутка к верху страницы при загрузке
    window.scrollTo(0, 0)

    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const decodedCategoryId = decodeURIComponent(params.categoryId)
  const products = getProductsByCategory(decodedCategoryId)

  // Получаем название категории из первого продукта или используем ID категории
  const categoryName =
    products.length > 0
      ? products[0].categoryName
      : decodedCategoryId.charAt(0).toUpperCase() + decodedCategoryId.slice(1)

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="sticky top-20 z-10 py-4 bg-background/80 backdrop-blur-xl mb-8 rounded-2xl border border-white/5"
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                <span>Назад</span>
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-white">{categoryName}</h1>
            <div className="w-20"></div> {/* Пустой блок для выравнивания */}
          </div>
        </motion.div>

        {isLoading ? (
          <LoadingProducts />
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex justify-center items-center py-20"
          >
            <div className="text-xl text-center">
              <p className="mb-4 text-white">В этой категории пока нет товаров</p>
              <Link href="/">
                <Button variant="link">Вернуться в каталог</Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <ProductList products={products} />
        )}
      </div>

      <footer className="container mx-auto px-4 mt-auto pt-12 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-6 border-t border-white/5">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-zinc-400 text-center md:text-left">Премиум-доставка ПАВ по Вьетнаму 24/7</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Spirit Vietnam. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
