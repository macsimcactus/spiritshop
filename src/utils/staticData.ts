export interface CategoryData {
  id: string;
  name: string;
}

export interface WeightOption {
  weight: string;
  price: string;
}

export interface ProductData {
  id: string;
  name: string;
  description: string;
  photo?: string;
  category: string;
  categoryName: string;
  cities: string[];
  weightOptions: WeightOption[];
  telegramGroup?: string;
  telegramOperator?: string;
  telegramReserve?: string;
}

export interface ContactData {
  telegramOperator?: string;
  telegramGroup?: string;
  telegramReserve?: string;
}

// URL таблицы с данными
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSbWeuUYEUVGqgR0UwpH-XD4T7F9z5tBYwQwqRyvH9WNTIgp_ixwkH_YHxeWW9CJjPffOWcv43_Yt4/pub?output=csv";

// Функция для форматирования сообщения
export function formatTelegramMessage(product: string, weight: string, price: string): string {
  const cleanProduct = product.replace(/[^\w\s]/g, '');
  const cleanWeight = weight.replace(/[^\w\s]/g, '');
  const cleanPrice = price.replace(/[^\w\s]/g, '');
  return `Hello!/@${cleanProduct}@/Kolichestvo-${cleanWeight}/Stoimost-${cleanPrice}`;
}

// Функция для получения всех продуктов
export async function fetchProducts(): Promise<ProductData[]> {
  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных');
    }

    const text = await response.text();
    const rows = text.split('\n').slice(1); // Пропускаем заголовок

    const products = rows.map(row => {
      try {
        const [
          id, name, description, photo, category, categoryName,
          citiesStr, weightsStr, pricesStr,
          telegramGroup, telegramOperator, telegramReserve
        ] = row.split(',').map(field => field.trim());

        // Парсим веса и цены
        const weightOptions = weightsStr.split(';')
          .map((weight, index) => ({
            weight: weight.trim(),
            price: pricesStr.split(';')[index]?.trim() || ''
          }))
          .filter(option => option.weight && option.price);

        const product: ProductData = {
          id,
          name,
          description,
          photo: photo || undefined,
          category,
          categoryName,
          cities: citiesStr.split(';').map(city => city.trim()).filter(Boolean),
          weightOptions,
          telegramGroup: telegramGroup || undefined,
          telegramOperator: telegramOperator || undefined,
          telegramReserve: telegramReserve || undefined
        };

        return product;
      } catch (err) {
        console.error('Ошибка при парсинге строки:', row, err);
        return null;
      }
    });

    return products.filter((product): product is ProductData => product !== null);
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    return [];
  }
}

// Функция для получения категорий
export async function getCategories(): Promise<CategoryData[]> {
  try {
    const products = await fetchProducts();
    const categoriesMap = new Map<string, string>();
    
    products.forEach(product => {
      if (!categoriesMap.has(product.category)) {
        categoriesMap.set(product.category, product.categoryName);
      }
    });
    
    return Array.from(categoriesMap.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    return [];
  }
}

// Функция для получения продуктов по категории
export async function fetchProductsByCategory(categoryId: string): Promise<ProductData[]> {
  try {
    const products = await fetchProducts();
    return products.filter(product => 
      product.category.toLowerCase() === categoryId.toLowerCase()
    );
  } catch (error) {
    console.error('Ошибка при получении продуктов категории:', error);
    return [];
  }
}

// Функция для получения контактов
export async function getContacts(): Promise<ContactData> {
  try {
    const products = await fetchProducts();
    const firstProduct = products[0];
    
    return {
      telegramOperator: firstProduct?.telegramOperator,
      telegramGroup: firstProduct?.telegramGroup,
      telegramReserve: firstProduct?.telegramReserve
    };
  } catch (error) {
    console.error('Ошибка при получении контактов:', error);
    return {};
  }
} 