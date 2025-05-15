'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { ProductData, fetchProductsByCategory } from '@/src/utils/staticData';

export default function CategoryPage() {
  const params = useParams<{ categoryId: string }>();
  const categoryId = params.categoryId as string;
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsByCategory(categoryId);
        setProducts(data);
      } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryId]);

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
    );
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
            <h1 className="text-xl font-bold text-white">
              {products[0]?.categoryName || categoryId}
            </h1>
            <div className="w-20" />
          </div>
        </motion.div>

        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-zinc-400 py-12"
          >
            В этой категории пока нет товаров
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="product-card"
              >
                {product.photo && (
                  <div className="relative aspect-square">
                    <img
                      src={product.photo}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-zinc-400 mb-4">{product.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.cities.map((city) => (
                      <span key={city} className="city-badge">
                        {city}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold">
                      {product.weightOptions[0]?.price}
                    </div>
                    <button
                      onClick={() => {
                        if (!product.telegramOperator && !product.telegramGroup) return;
                        const contact = product.telegramOperator || product.telegramGroup;
                        const message = `Hello!/@${product.name}@/Kolichestvo-${product.weightOptions[0].weight}/Stoimost-${product.weightOptions[0].price}`;
                        const url = `https://t.me/${contact}?text=${encodeURIComponent(message)}`;
                        window.open(url, '_blank');
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary rounded-xl font-medium hover:bg-primary/90 transition-colors"
                      disabled={!product.telegramOperator && !product.telegramGroup}
                    >
                      <ShoppingCart size={16} />
                      <span>Заказать</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
