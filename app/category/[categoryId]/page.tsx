import { ProductData, fetchProductsByCategory, getCategories } from '@/src/utils/staticData';
import type { Metadata } from 'next';

export const dynamic = 'error';
export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return categories.map((category) => ({
      categoryId: category.id,
    }));
  } catch (error) {
    console.error('Ошибка при генерации статических параметров:', error);
    return [{ categoryId: 'default' }];
  }
}

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

export default async function CategoryPage({
  params
}: {
  params: { categoryId: string }
}) {
  let products: ProductData[] = [];
  
  try {
    products = await fetchProductsByCategory(params.categoryId);
  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error);
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="sticky top-20 z-10 py-4 bg-background/80 backdrop-blur-xl mb-8 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
              <span className="inline-block transform rotate-180">→</span>
              <span>Назад</span>
            </a>
            <h1 className="text-xl font-bold text-white">
              {products[0]?.categoryName || params.categoryId}
            </h1>
            <div className="w-20" />
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-zinc-400 py-12">
            В этой категории пока нет товаров
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="product-card">
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
                    <a
                      href={`https://t.me/${(product.telegramOperator || product.telegramGroup)?.replace('@', '')}?text=${encodeURIComponent(
                        `Hello!/@${product.name}@/Kolichestvo-${product.weightOptions[0].weight}/Stoimost-${product.weightOptions[0].price}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                      onClick={(e) => {
                        if (!product.telegramOperator && !product.telegramGroup) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <span className="inline-block w-4 h-4">🛒</span>
                      <span>Заказать</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
