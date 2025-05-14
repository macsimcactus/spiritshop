"use client"

import { MessageCircle, ArrowLeft, HeadphonesIcon, Clock, MapPin, ShieldCheck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getContacts, type ContactData } from "@/src/utils/staticData"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await getContacts()
        setContacts(data)
      } catch (err) {
        console.error('Error loading contacts:', err)
        setError('Не удалось загрузить контакты')
      } finally {
        setIsLoading(false)
      }
    }

    loadContacts()
  }, [])

  const openTelegram = (username: string | undefined) => {
    if (!username) return;
    
    // Убираем @ из начала имени пользователя, если есть
    const cleanUsername = username.startsWith("@") ? username.substring(1) : username;
    
    // Проверяем, является ли это полным URL или именем пользователя
    const finalUrl = cleanUsername.startsWith("https://") || cleanUsername.startsWith("t.me/") 
      ? cleanUsername 
      : `https://t.me/${cleanUsername}`;

    window.open(finalUrl, "_blank");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center text-white">Загрузка...</div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (error || !contacts) {
    return (
      <main className="min-h-screen">
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center text-red-500">{error || 'Ошибка загрузки контактов'}</div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Основной оператор */}
              {contacts.telegramOperator && contacts.telegramOperator.trim() !== '' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    <HeadphonesIcon size={24} className="text-primary mr-3" />
                    <h2 className="text-xl font-semibold text-white">Основной оператор</h2>
                  </div>
                  <p className="text-zinc-400 mb-6 flex-grow">
                    Для заказов и консультаций обращайтесь к нашему основному оператору
                  </p>
                  <Button 
                    onClick={() => openTelegram(contacts.telegramOperator)}
                    className="w-full"
                    size="lg"
                  >
                    <HeadphonesIcon size={16} className="mr-2" />
                    {contacts.telegramOperator}
                  </Button>
                </motion.div>
              )}

              {/* Группа */}
              {contacts.telegramGroup && contacts.telegramGroup.trim() !== '' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    <Users size={24} className="text-primary mr-3" />
                    <h2 className="text-xl font-semibold text-white">Наша группа</h2>
                  </div>
                  <p className="text-zinc-400 mb-6 flex-grow">
                    Присоединяйтесь к нашей группе для получения новостей и акций
                  </p>
                  <Button 
                    onClick={() => openTelegram(contacts.telegramGroup!)}
                    variant="secondary"
                    className="w-full"
                    size="lg"
                  >
                    <Users size={16} className="mr-2" />
                    {contacts.telegramGroup}
                  </Button>
                </motion.div>
              )}

              {/* Резервный контакт */}
              {contacts.telegramReserve && contacts.telegramReserve.trim() !== '' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    <ShieldCheck size={24} className="text-primary mr-3" />
                    <h2 className="text-xl font-semibold text-white">Резервный контакт</h2>
                  </div>
                  <p className="text-zinc-400 mb-6 flex-grow">
                    Если основной оператор не отвечает, обратитесь к резервному контакту
                  </p>
                  <Button 
                    onClick={() => openTelegram(contacts.telegramReserve!)}
                    variant="secondary"
                    className="w-full"
                    size="lg"
                  >
                    <ShieldCheck size={16} className="mr-2" />
                    {contacts.telegramReserve}
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Дополнительная информация */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="flex items-center mb-3">
                  <Clock size={20} className="text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-white">Время работы</h3>
                </div>
                <p className="text-zinc-400">Работаем круглосуточно, 24/7</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="flex items-center mb-3">
                  <MapPin size={20} className="text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-white">Регионы доставки</h3>
                </div>
                <p className="text-zinc-400">Доставка по всем регионам</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-sm text-zinc-400 text-center md:text-left">Премиум-доставка ПАВ по Вьетнаму 24/7</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Spirit Vietnam. Все права защищены.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
