export interface CategoryData {
  id: string
  name: string
}

export interface WeightOption {
  weight: string
  price: string
}

export interface ProductData {
  id: string
  name: string
  weightOptions: WeightOption[]
  description: string
  category: string
  categoryName: string
  photo?: string
  telegramMainAdmin: string
  cities: string[]
}

// Статические категории
export const categories: CategoryData[] = [
  { id: "stimulators", name: "Стимуляторы" },
  { id: "psychedelics", name: "Психоделики" },
  { id: "dissociatives", name: "Диссоциативы" },
]

// Статические города
export const cities = ["Нячанг", "Хошимин", "Ханой", "Дананг", "Фукуок", "Муйне"]

// Статические товары
export const products: ProductData[] = [
  {
    id: "product-1",
    name: "Кокаин",
    weightOptions: [
      { weight: "1 гр", price: "2,450,000₫" },
      { weight: "2 гр", price: "4,655,000₫" },
      { weight: "5 гр", price: "11,025,000₫" },
    ],
    description:
      "Высококачественный кокаин из Колумбии. Чистота 90%+. Идеально подходит для вечеринок и особых случаев. Доставка в течение 15 минут после подтверждения заказа. Гарантия качества.",
    category: "stimulators",
    categoryName: "Стимуляторы",
    photo: "/placeholder.png?height=300&width=300",
    telegramMainAdmin: "spiritvietnam",
    cities: ["Нячанг", "Хошимин", "Ханой"],
  },
  {
    id: "product-2",
    name: "Амфетамин",
    weightOptions: [
      { weight: "1 гр", price: "1,225,000₫" },
      { weight: "3 гр", price: "3,430,000₫" },
      { weight: "5 гр", price: "5,390,000₫" },
    ],
    description:
      "Чистый амфетамин. Идеально подходит для вечеринок и активного отдыха. Произведено в лабораторных условиях с соблюдением всех стандартов качества. Эффект длится 4-6 часов.",
    category: "stimulators",
    categoryName: "Стимуляторы",
    photo: "/placeholder.png?height=300&width=300",
    telegramMainAdmin: "spiritvietnam",
    cities: ["Нячанг", "Хошимин", "Дананг"],
  },
  {
    id: "product-3",
    name: "ЛСД",
    weightOptions: [
      { weight: "1 марка", price: "735,000₫" },
      { weight: "5 марок", price: "3,430,000₫" },
      { weight: "10 марок", price: "6,370,000₫" },
    ],
    description:
      "Качественные марки ЛСД. 250 мкг на марку. Произведено в Швейцарии. Чистый трип без побочных эффектов. Идеально подходит для духовных практик и расширения сознания. Эффект длится 8-12 часов.",
    category: "psychedelics",
    categoryName: "Психоделики",
    photo: "/placeholder.png?height=300&width=300",
    telegramMainAdmin: "spiritvietnam",
    cities: ["Нячанг", "Хошимин", "Фукуок"],
  },
  {
    id: "product-4",
    name: "Грибы",
    weightOptions: [
      { weight: "5 гр", price: "1,470,000₫" },
      { weight: "10 гр", price: "2,695,000₫" },
      { weight: "20 гр", price: "4,900,000₫" },
    ],
    description:
      "Свежие псилоцибиновые грибы. Выращены с любовью. Собраны на пике созревания для максимального содержания псилоцибина. Идеально подходят для медитативных практик и духовного роста. Эффект длится 4-6 часов.",
    category: "psychedelics",
    categoryName: "Психоделики",
    photo: "/placeholder.png?height=300&width=300",
    telegramMainAdmin: "spiritvietnam",
    cities: ["Нячанг", "Дананг", "Муйне"],
  },
  {
    id: "product-5",
    name: "Кетамин",
    weightOptions: [
      { weight: "1 гр", price: "1,960,000₫" },
      { weight: "2 гр", price: "3,675,000₫" },
      { weight: "5 гр", price: "8,575,000₫" },
    ],
    description:
      "Фармацевтический кетамин. Идеально подходит для медитативных практик. Произведено в лабораторных условиях с соблюдением всех стандартов качества. Эффект длится 1-2 часа. Погрузитесь в глубины своего сознания с этим мощным диссоциативом.",
    category: "dissociatives",
    categoryName: "Диссоциативы",
    photo: "/placeholder.png?height=300&width=300",
    telegramMainAdmin: "spiritvietnam",
    cities: ["Хошимин", "Ханой", "Фукуок"],
  },
]

// Функции для получения данных
export function getCategories(): CategoryData[] {
  return categories
}

export function getCities(): string[] {
  return cities
}

export function getProductsByCategory(categoryId: string): ProductData[] {
  return products.filter((p) => p.category.toLowerCase() === categoryId.toLowerCase())
}
