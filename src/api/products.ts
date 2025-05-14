export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryName: string;
  photo?: string;
  telegramMainAdmin: string;
  weightOptions: Array<{
    weight: string;
    price: string;
  }>;
  cities: string[];
}

// URL вашей опубликованной Google Таблицы в формате CSV
const SHEET_URL = 'YOUR_GOOGLE_SHEET_URL';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    
    // Пропускаем заголовок и разбираем CSV
    const rows = text.split('\n').slice(1);
    return rows.map(row => {
      const [id, name, description, category, categoryName, photo, telegramMainAdmin, citiesStr, weightOptionsStr] = row.split(',');
      
      return {
        id,
        name,
        description,
        category,
        categoryName,
        photo: photo || undefined,
        telegramMainAdmin,
        cities: citiesStr.split(';').map(city => city.trim()),
        weightOptions: JSON.parse(weightOptionsStr)
      };
    });
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    return [];
  }
}

export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
  const products = await fetchProducts();
  return products.filter(product => 
    product.category.toLowerCase() === categoryId.toLowerCase()
  );
}

export async function fetchCategories(): Promise<Array<{id: string; name: string}>> {
  const products = await fetchProducts();
  const categories = new Map();
  
  products.forEach(product => {
    if (!categories.has(product.category)) {
      categories.set(product.category, product.categoryName);
    }
  });
  
  return Array.from(categories.entries()).map(([id, name]) => ({ id, name }));
} 