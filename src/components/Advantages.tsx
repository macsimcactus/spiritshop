"use client"
import { motion } from "framer-motion"
import { Zap, Shield, Clock, Trophy } from "lucide-react"

const advantages = [
  {
    icon: Zap,
    title: "Быстрая доставка",
    description: "Доставляем заказы в течение 15 минут после оплаты"
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "Только проверенные товары от надежных поставщиков"
  },
  {
    icon: Clock,
    title: "Работаем 24/7",
    description: "Принимаем заказы в любое время дня и ночи"
  },
  {
    icon: Trophy,
    title: "Лучшие цены",
    description: "Регулярные акции и специальные предложения"
  }
]

export default function Advantages() {
  return (
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-12 hero-gradient"
      >
        Наши преимущества
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {advantages.map((advantage, index) => (
          <motion.div
            key={advantage.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
              {<advantage.icon className="w-6 h-6 text-white" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
            <p className="text-zinc-400">{advantage.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 