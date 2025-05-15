import { getCategories } from '@/src/utils/staticData';
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

export async function generateMetadata({ params }: { params: { categoryId: string } }): Promise<Metadata> {
  return {
    title: `Категория | Spirit Vietnam`,
    description: `Купить товары во Вьетнаме с доставкой 24/7`,
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category: { id: string }) => ({
    categoryId: category.id,
  }));
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 