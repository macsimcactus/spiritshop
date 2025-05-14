"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ProductData, fetchProductsByCategory, getCategories } from "@/src/utils/staticData"
import ProductList from "@/src/components/ProductList"
import LoadingProducts from "@/src/components/LoadingProducts"

// Генерируем статические пути для всех категорий
export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    categoryId: category.id,
  }))
}

// Получаем данные для конкретной категории
async function getProductsForCategory(categoryId: string) {
  try {
    return await fetchProductsByCategory(categoryId)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  const products = await getProductsForCategory(params.categoryId)
  
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {products.length === 0 ? (
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
