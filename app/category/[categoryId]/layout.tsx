import { getCategories, fetchProductsByCategory } from '@/src/utils/staticData';
import type { Metadata, Viewport } from "next";

export const revalidate = 3600; // каждый час

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
};

export const metadata: Metadata = {
  title: "Категория | Spirit Vietnam",
  description: "Купить товары во Вьетнаме с доставкой 24/7",
};

export async function generateMetadata({ params }: { params: { categoryId: string } }): Promise<Metadata> {
  try {
    const products = await fetchProductsByCategory(params.categoryId);
    const categoryName = products[0]?.categoryName || "Категория";
    
    return {
      title: `${categoryName} | Spirit Vietnam`,
      description: `Купить ${categoryName.toLowerCase()} во Вьетнаме с доставкой 24/7`,
    };
  } catch (error) {
    return {
      title: "Категория | Spirit Vietnam",
      description: "Купить товары во Вьетнаме с доставкой 24/7",
    };
  }
}

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return categories.map((category) => ({
      categoryId: category.id,
    }));
  } catch (error) {
    console.error('Ошибка при генерации статических параметров:', error);
    return [];
  }
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 