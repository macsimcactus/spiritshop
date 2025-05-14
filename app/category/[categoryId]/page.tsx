"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import ProductList from "@/src/components/ProductList"
import { useEffect, useState } from "react"
import { fetchProductsByCategory, type ProductData } from "@/src/utils/staticData"
import LoadingProducts from "@/src/components/LoadingProducts"

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.categoryId as string
  const [products, setProducts] = useState<ProductData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        // Прокрутка к верху страницы при загрузке
        window.scrollTo(0, 0)

        // Загрузка продуктов категории
        const data = await fetchProductsByCategory(categoryId)
        if (mounted) {
          setProducts(data)
          setIsLoading(false)
        }
      } catch (err) {
        if (mounted) {
          console.error('Ошибка при загрузке продуктов категории:', err)
          setError('Не удалось загрузить товары. Пожалуйста, попробуйте позже.')
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      mounted = false
      setProducts([])
    }
  }, [categoryId])

  const categoryName = products[0]?.categoryName || 
    decodeURIComponent(categoryId).charAt(0).toUpperCase() + 
    decodeURIComponent(categoryId).slice(1)

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="mb-8">
        <Link 
          href="/"
          className="inline-flex items-center text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к каталогу
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-8">
          {categoryName}
        </h1>

        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-500"
          >
            {error}
          </motion.div>
        ) : isLoading ? (
          <LoadingProducts />
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-zinc-400"
          >
            В этой категории пока нет товаров
          </motion.div>
        ) : (
          <ProductList products={products} />
        )}
      </motion.div>
    </div>
  )
}
