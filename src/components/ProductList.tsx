"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProductData } from "@/src/utils/staticData"
import { MapPin } from "lucide-react"

interface ProductListProps {
  products: ProductData[]
}

export default function ProductList({ products }: ProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="product-card"
        >
          {product.photo && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={product.photo}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-zinc-400 text-sm mb-4">{product.description}</p>
            
            {/* Города */}
            {product.cities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.cities.map(city => (
                  <span key={city} className="city-badge">
                    <MapPin className="w-3 h-3" />
                    {city}
                  </span>
                ))}
              </div>
            )}
            
            {/* Опции веса и цены */}
            <div className="space-y-2">
              {product.weightOptions.map((option) => (
                <button
                  key={option.weight}
                  onClick={() => setSelectedProduct(product.id)}
                  className={`weight-button w-full ${
                    selectedProduct === product.id ? "active" : ""
                  }`}
                >
                  {option.weight} - {option.price}₽
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
