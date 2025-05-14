export interface Product {
  id: string;
  name: string;
  description: string;
  photo?: string;
  category: string;
  categoryName: string;
  cities: string[];
  weightOptions: Array<{
    weight: string;
    price: string;
  }>;
  telegramGroup?: string;
  telegramOperator?: string;
  telegramReserve?: string;
}

// URL вашей опубликованной Google Таблицы в формате CSV
const SHEET_URL = 'YOUR_GOOGLE_SHEET_URL';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    console.log('Raw CSV:', text);
    
    // Пропускаем заголовок и разбираем CSV
    const rows = text.split('\n').slice(1);
    return rows.map(row => {
      console.log('First row:', row);
      const values = row.split(',');
      console.log('Parsed values:', values);
      
      const [
        id, name, description, photo, category, categoryName, 
        citiesStr, weightsStr, pricesStr, 
        telegramGroup, telegramOperator, telegramReserve
      ] = values;

      // Парсим веса и цены
      const weights = weightsStr.split(';').map(w => w.trim()).filter(Boolean);
      const prices = pricesStr.replace(/["\[\]]/g, '').split(';').map(p => p.trim()).filter(Boolean);
      
      const weightOptions = weights.map((weight, index) => ({
        weight,
        price: prices[index] || ''
      }));

      const product = {
        id,
        name,
        description,
        photo: photo || undefined,
        category,
        categoryName,
        cities: citiesStr.split(';').map(city => city.trim()),
        weightOptions,
        telegramGroup: telegramGroup || undefined,
        telegramOperator: telegramOperator || undefined,
        telegramReserve: telegramReserve || undefined
      };

      console.log('Contact fields:', { 
        group: product.telegramGroup, 
        operator: product.telegramOperator, 
        reserve: product.telegramReserve 
      });

      return product;
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