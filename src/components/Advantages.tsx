import { motion } from "framer-motion"
import { Truck, Shield, Clock, Award, ThumbsUp, HeadphonesIcon } from "lucide-react"

const advantages = [
  {
    icon: <Truck size={24} />,
    title: "Быстрая доставка",
    description: "Оперативная доставка во все регионы"
  },
  {
    icon: <Shield size={24} />,
    title: "Гарантия качества",
    description: "Только проверенные товары"
  },
  {
    icon: <Clock size={24} />,
    title: "Круглосуточно",
    description: "Работаем 24/7 без выходных"
  },
  {
    icon: <Award size={24} />,
    title: "Лучшие цены",
    description: "Конкурентные цены на рынке"
  },
  {
    icon: <ThumbsUp size={24} />,
    title: "Большой выбор",
    description: "Широкий ассортимент товаров"
  },
  {
    icon: <HeadphonesIcon size={24} />,
    title: "Поддержка",
    description: "Оперативные ответы на вопросы"
  }
]

export default function Advantages() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              className="flex items-start p-8 bg-white/5 rounded-xl backdrop-blur-sm h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 mr-6 text-primary">
                {advantage.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">{advantage.title}</h3>
                <p className="text-zinc-400">{advantage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 