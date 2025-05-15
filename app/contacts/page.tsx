"use client"

import { MessageCircle, ArrowLeft, HeadphonesIcon, Clock, MapPin, ShieldCheck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getContacts, type ContactData } from "@/src/utils/staticData"
import Link from 'next/link'

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await getContacts()
        setContacts(data)
      } catch (error) {
        console.error('Ошибка при загрузке контактов:', error)
      } finally {
        setLoading(false)
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

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white"
            >
              Загрузка...
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="sticky top-20 z-10 py-4 bg-background/80 backdrop-blur-xl mb-8 rounded-2xl border border-white/5"
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
                <ArrowLeft size={16} />
                <span>Назад</span>
              </button>
            </Link>
            <h1 className="text-xl font-bold text-white">Контакты</h1>
            <div className="w-20" />
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-bold mb-4">Наши контакты</h2>
            <div className="space-y-4">
              <p className="text-zinc-300">
                Для связи с нами используйте следующие контакты:
              </p>
              <div className="flex flex-col gap-4">
                {contacts?.telegramOperator && (
                  <a
                    href={`https://t.me/${contacts.telegramOperator.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <MessageCircle size={16} />
                    <span>Оператор: {contacts.telegramOperator}</span>
                  </a>
                )}
                {contacts?.telegramGroup && (
                  <a
                    href={`https://t.me/${contacts.telegramGroup.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <MessageCircle size={16} />
                    <span>Группа: {contacts.telegramGroup}</span>
                  </a>
                )}
                {contacts?.telegramReserve && (
                  <a
                    href={`https://t.me/${contacts.telegramReserve.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <MessageCircle size={16} />
                    <span>Резервный контакт: {contacts.telegramReserve}</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
