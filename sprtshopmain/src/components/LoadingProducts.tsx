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
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="product-card">
              <div className="h-64 w-full rounded-t-2xl bg-white/5 overflow-hidden relative">
                <div className="shimmer-overlay"></div>
              </div>
              <div className="p-4 space-y-4">
                <div className="h-6 w-3/4 bg-white/5 rounded-lg relative overflow-hidden">
                  <div className="shimmer-overlay"></div>
                </div>
                <div className="h-20 w-full bg-white/5 rounded-lg relative overflow-hidden">
                  <div className="shimmer-overlay"></div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-6 w-16 bg-white/5 rounded-full relative overflow-hidden">
                      <div className="shimmer-overlay"></div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-8 w-16 bg-white/5 rounded-xl relative overflow-hidden">
                      <div className="shimmer-overlay"></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-16 bg-white/5 rounded-lg relative overflow-hidden">
                    <div className="shimmer-overlay"></div>
                  </div>
                  <div className="h-10 w-28 bg-white/5 rounded-xl relative overflow-hidden">
                    <div className="shimmer-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
