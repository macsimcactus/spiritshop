"use client"
import Link from "next/link"
import { MessageCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useEffect } from "react"
import { motion } from "framer-motion"

export default function ContactsPage() {
  useEffect(() => {
    // Прокрутка к верху страницы при загрузке
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft size={16} />
              <span>На главную</span>
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-10 text-center hero-gradient"
        >
          Контакты
        </motion.h1>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="mb-8 glass-card">
              <CardHeader>
                <h2 className="text-xl font-bold text-white">Свяжитесь с нами</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-zinc-300">
                  Мы всегда на связи и готовы ответить на ваши вопросы. Наши операторы работают 24/7, чтобы обеспечить
                  вам лучший сервис.
                </p>

                <Link
                  href="https://t.me/spiritvietnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all hover:shadow-md border border-white/5 hover:border-white/10"
                >
                  <div className="bg-primary p-3 rounded-full">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Telegram</h3>
                    <p className="text-zinc-300">@spiritvietnam</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <h2 className="text-xl font-bold text-white">Часто задаваемые вопросы</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <h3 className="font-bold text-white mb-2">Как быстро осуществляется доставка?</h3>
                  <p className="text-zinc-300">
                    Доставка осуществляется в течение 15-120 минут в зависимости от вашего местоположения.
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <h3 className="font-bold text-white mb-2">Какие способы оплаты вы принимаете?</h3>
                  <p className="text-zinc-300">Мы принимаем наличные и криптовалюту (Bitcoin, Ethereum, USDT).</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <h3 className="font-bold text-white mb-2">Есть ли минимальная сумма заказа?</h3>
                  <p className="text-zinc-300">Минимальная сумма заказа составляет 1,225,000₫.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <h3 className="font-bold text-white mb-2">Работаете ли вы ночью?</h3>
                  <p className="text-zinc-300">Да, мы работаем 24/7 без выходных.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <footer className="container mx-auto px-4 mt-16 pt-12 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-6 border-t border-white/5">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-zinc-400 text-center md:text-left">Премиум-доставка ПАВ по Вьетнаму 24/7</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Spirit Vietnam. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
