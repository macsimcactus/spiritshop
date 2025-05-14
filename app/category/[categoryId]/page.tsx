"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ProductData, fetchProductsByCategory } from "@/src/utils/staticData"
import ProductList from "@/src/components/ProductList"
import LoadingProducts from "@/src/components/LoadingProducts"

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.categoryId as string
  
  const [products, setProducts] = useState<ProductData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchProductsByCategory(categoryId)
        setProducts(data)
      } catch (err) {
        console.error('Ошибка при загрузке продуктов:', err)
        setError('Не удалось загрузить продукты. Пожалуйста, попробуйте позже.')
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [categoryId])

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
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
      </div>
    </main>
  )
}
