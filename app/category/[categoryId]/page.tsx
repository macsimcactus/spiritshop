import { motion } from "framer-motion"
import { ProductData, fetchProductsByCategory, getCategories } from "@/src/utils/staticData"
import ProductList from "@/src/components/ProductList"
import LoadingProducts from "@/src/components/LoadingProducts"
import type { Metadata, Viewport } from "next"

// Устанавливаем время для revalidate
export const revalidate = 3600 // каждый час

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
}

export async function generateMetadata({ params }: { params: { categoryId: string } }): Promise<Metadata> {
  const products = await getProductsForCategory(params.categoryId)
  const categoryName = products[0]?.categoryName || "Категория"
  
  return {
    title: `${categoryName} | Spirit Vietnam`,
    description: `Купить ${categoryName.toLowerCase()} во Вьетнаме с доставкой 24/7`,
  }
}

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
          <div className="text-center text-zinc-400">
            В этой категории пока нет товаров
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </main>
  )
}
