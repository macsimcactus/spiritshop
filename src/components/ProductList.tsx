"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, ChevronDown, ChevronUp, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { ProductData } from "@/src/utils/staticData"
import { getContacts, formatOrderMessage } from "@/src/utils/staticData"

interface ProductListProps {
  products: ProductData[]
}

export default function ProductList({ products }: ProductListProps) {
  const [operator, setOperator] = useState<string>("")

  useEffect(() => {
    const loadOperator = async () => {
      try {
        const contacts = await getContacts()
        if (contacts.telegramOperator) {
          setOperator(contacts.telegramOperator)
        }
      } catch (error) {
        console.error('Error loading operator contact:', error)
      }
    }

    loadOperator()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ProductCard product={product} operator={operator} />
        </motion.div>
      ))}
    </div>
  )
}

interface ProductCardProps {
  product: ProductData
  operator: string
}

function ProductCard({ product, operator }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { toast } = useToast()

  const openTelegram = () => {
    if (!operator) {
      toast({
        title: "Ошибка",
        description: "Контакт оператора недоступен",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const username = operator.startsWith("@") ? operator.substring(1) : operator
      const message = formatOrderMessage({
        productName: product.name,
        weight: product.weightOptions[selectedWeightIndex].weight,
        price: product.weightOptions[selectedWeightIndex].price
      });
      const finalUrl = `https://t.me/${username}?text=${message}`

      window.open(finalUrl, "_blank")

      toast({
        title: "Переход в Telegram",
        description: "Открываем чат с оператором",
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

  const selectedOption = product.weightOptions[selectedWeightIndex]

  const shortDescription = product.description.length > 100 
    ? `${product.description.substring(0, 100)}...` 
    : product.description

  const renderDescription = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i} className="block">
        {line || <br />}
      </span>
    ))
  }

  return (
    <div className="product-card h-full flex flex-col">
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
            className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png"
              setImageLoaded(true)
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <div className="p-5 space-y-4 flex-grow flex flex-col">
        <h2 className="text-xl font-bold text-white">{product.name}</h2>

        <div className="text-sm text-zinc-300 flex-grow">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="whitespace-pre-line"
          >
            {renderDescription(showFullDescription ? product.description : shortDescription)}
          </motion.div>
          {product.description.length > 100 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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

        <div className="flex flex-wrap gap-1">
          {product.cities.map((city) => (
            <motion.span
              key={city}
              className="city-badge"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <MapPin size={10} />
              {city}
            </motion.span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {product.weightOptions.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedWeightIndex(index)}
              className={`weight-button ${selectedWeightIndex === index ? "active" : ""}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              {option.weight}
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          <motion.span
            className="text-xl font-bold text-white block"
            key={selectedOption.price}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedOption.price}
          </motion.span>

          <div className="flex flex-col gap-2">
            <Button
              onClick={openTelegram}
              disabled={isLoading || !operator}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
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
                  <ShoppingCart size={16} className="mr-2" />
                  <span>Заказать</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
