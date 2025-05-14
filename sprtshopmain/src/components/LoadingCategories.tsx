"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingCategories() {
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
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card h-full p-6 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="h-8 w-40 bg-white/5 rounded-lg relative overflow-hidden">
                <div className="shimmer-overlay"></div>
              </div>
              <div className="h-12 w-12 bg-white/5 rounded-full relative overflow-hidden">
                <div className="shimmer-overlay"></div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
