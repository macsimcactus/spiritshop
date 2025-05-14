"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingProducts() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="product-card h-full flex flex-col animate-pulse">
          <div className="aspect-square bg-white/5 rounded-t-2xl">
            <div className="shimmer-overlay"></div>
          </div>
          <div className="p-5 space-y-4">
            <div className="h-6 bg-white/5 rounded-lg w-3/4">
              <div className="shimmer-overlay"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-white/5 rounded w-full">
                <div className="shimmer-overlay"></div>
              </div>
              <div className="h-4 bg-white/5 rounded w-5/6">
                <div className="shimmer-overlay"></div>
              </div>
              <div className="h-4 bg-white/5 rounded w-4/6">
                <div className="shimmer-overlay"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-white/5 rounded w-20">
                <div className="shimmer-overlay"></div>
              </div>
              <div className="h-6 bg-white/5 rounded w-20">
                <div className="shimmer-overlay"></div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-8 bg-white/5 rounded w-24">
                <div className="shimmer-overlay"></div>
              </div>
              <div className="h-10 bg-white/5 rounded w-32">
                <div className="shimmer-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
