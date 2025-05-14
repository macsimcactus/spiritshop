"use client"
import { motion } from "framer-motion"

export default function LoadingProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="product-card"
        >
          <div className="aspect-video w-full bg-white/5 relative overflow-hidden">
            <div className="shimmer-overlay"></div>
          </div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-white/5 rounded-md relative overflow-hidden w-3/4">
              <div className="shimmer-overlay"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-white/5 rounded-md relative overflow-hidden">
                <div className="shimmer-overlay"></div>
              </div>
              <div className="h-4 bg-white/5 rounded-md relative overflow-hidden w-2/3">
                <div className="shimmer-overlay"></div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2].map((j) => (
                <div
                  key={j}
                  className="h-6 w-20 bg-white/5 rounded-full relative overflow-hidden"
                >
                  <div className="shimmer-overlay"></div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[1, 2].map((j) => (
                <div
                  key={j}
                  className="h-10 bg-white/5 rounded-xl relative overflow-hidden"
                >
                  <div className="shimmer-overlay"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
