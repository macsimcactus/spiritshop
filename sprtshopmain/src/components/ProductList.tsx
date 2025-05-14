"use client"
import type { ProductData } from "../utils/staticData"
import { ShoppingCart, ChevronDown, ChevronUp, MapPin } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductList({ products }: { products: ProductData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  )
}

function ProductCard({ product }: { product: ProductData }) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { toast } = useToast()

  const openTelegram = (url: string) => {
    if (!url) return

    setIsLoading(true)

    try {
      // Проверяем, есть ли @ в начале и удаляем его
      const cleanUrl = url.startsWith("@") ? url.substring(1) : url

      // Проверяем, есть ли https:// или t.me в начале
      if (cleanUrl.startsWith("https://") || cleanUrl.startsWith("t.me/")) {
        window.open(cleanUrl, "_blank")
      } else {
        window.open(`https://t.me/${cleanUrl}`, "_blank")
      }

      toast({
        title: "Заказ оформлен",
        description: "Переходим в Telegram для завершения заказа",
      })
    } catch (error) {
      console.error("Ошибка при открытии Telegram:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось открыть Telegram",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }

  // Текущий выбранный вариант веса/цены
  const selectedOption = product.weightOptions[selectedWeightIndex]

  // Сокращенное описание (для предварительного просмотра)
  const shortDescription =
    product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description

  return (
    <div className="product-card h-full flex flex-col">
      {/* Изображение товара */}
      {product.photo && (
        <div className="aspect-square overflow-hidden rounded-t-2xl relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-white/5">
              <div className="shimmer-overlay"></div>
            </div>
          )}
          <motion.img
            src={product.photo}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png?height=300&width=300"
              setImageLoaded(true)
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      {/* Контент карточки */}
      <div className="p-5 space-y-4 flex-grow flex flex-col">
        <h2 className="text-xl font-bold text-white">{product.name}</h2>

        {/* Описание товара */}
        <div className="text-sm text-zinc-300 flex-grow">
          <AnimatePresence mode="wait">
            <motion.p
              key={showFullDescription ? "full" : "short"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="whitespace-pre-line"
            >
              {showFullDescription ? product.description : shortDescription}
            </motion.p>
          </AnimatePresence>
          {product.description.length > 100 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-primary hover:text-primary/80 text-sm mt-1 flex items-center transition-colors"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? (
                <span className="flex items-center">
                  Скрыть <ChevronUp size={16} className="ml-1" />
                </span>
              ) : (
                <span className="flex items-center">
                  Подробнее <ChevronDown size={16} className="ml-1" />
                </span>
              )}
            </motion.button>
          )}
        </div>

        {/* Города */}
        <div className="flex flex-wrap gap-1">
          {product.cities.map((city) => (
            <motion.span
              key={city}
              className="city-badge"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MapPin size={10} />
              {city}
            </motion.span>
          ))}
        </div>

        {/* Выбор веса */}
        <div className="flex flex-wrap gap-2">
          {product.weightOptions.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedWeightIndex(index)}
              className={`weight-button ${selectedWeightIndex === index ? "active" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {option.weight}
            </motion.button>
          ))}
        </div>

        {/* Цена и кнопка заказа */}
        <div className="flex justify-between items-center pt-2">
          <motion.span
            className="text-xl font-bold text-white"
            key={selectedOption.price}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {selectedOption.price}
          </motion.span>

          <Button
            onClick={() => openTelegram(product.telegramMainAdmin)}
            disabled={isLoading}
            className="flex items-center gap-2 relative overflow-hidden"
            variant="default"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Загрузка...
              </span>
            ) : (
              <>
                <ShoppingCart size={16} />
                <span>Заказать</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
