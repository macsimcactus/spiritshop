import { rateLimiter } from './rateLimit';

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
  telegramOperator?: string
  telegramGroup?: string
  telegramReserve?: string
  cities: string[]
}

export interface ContactData {
  telegramGroup?: string;
  telegramOperator?: string;
  telegramReserve?: string;
}

export interface OrderMessageParams {
  productName: string;
  weight: string;
  price: string;
}

// Ссылка на опубликованную Google таблицу в формате CSV
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSI1I7WFA5_GLHcy3XNJbDfOP8Hs6bKUcQzF7Mzlq0G9wlYRzvCXR_NKAGm9sUDdptlifke7jjhGEgu/pub?gid=1936746483&single=true&output=csv';

// Кэш для данных
let productsCache: ProductData[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 30000; // 30 секунд
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 секунда

// Функция задержки
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Функция для безопасного fetch с повторными попытками
async function safeFetch(url: string, retries = MAX_RETRIES): Promise<Response> {
  try {
    // Проверяем лимит запросов
    if (!rateLimiter.check()) {
      throw new Error('Too many requests');
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      await delay(RETRY_DELAY);
      return safeFetch(url, retries - 1);
    }
    throw error;
  }
}

export async function fetchProducts(): Promise<ProductData[]> {
  try {
    const now = Date.now();
    
    // Если есть актуальный кэш, возвращаем его
    if (productsCache && (now - lastFetchTime) < CACHE_TTL) {
      return productsCache;
    }

    const response = await safeFetch(SHEET_URL);
    const csvText = await response.text();
    
    // Отладочный вывод сырых данных
    console.log('Raw CSV:', csvText);
    
    // Проверка на валидность CSV
    if (!csvText || !csvText.includes(',')) {
      throw new Error('Invalid CSV data');
    }

    const rows = csvText.split('\n').slice(1).filter(row => row.trim()); // Пропускаем заголовок и пустые строки
    
    // Отладочный вывод первой строки
    console.log('First row:', rows[0]);
    
    // Проверка на максимальное количество строк
    if (rows.length > 1000) {
      throw new Error('Too many rows in CSV');
    }

    const products = rows.map(row => {
      try {
        // Используем регулярное выражение для правильного разделения CSV
        const matches = row.match(/(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^,]*))/g);
        if (!matches) return null;
        
        const values = matches.map(m => 
          m.startsWith(',') ? m.slice(1) : m
        ).map(m => 
          m.startsWith('"') && m.endsWith('"') ? m.slice(1, -1) : m
        ).map(m => 
          m.replace(/""/g, '"').trim()
        );

        // Отладочный вывод значений
        console.log('Parsed values:', values);

        // Проверка на количество полей
        if (values.length < 12) {
          console.warn('Недостаточно полей в строке:', row);
          return null;
        }

        const [
          id, name, description, photo, 
          category, categoryName, citiesStr, 
          weightsStr, pricesStr, telegramGroup,
          telegramOperator, telegramReserve
        ] = values;

        // Отладочный вывод контактных данных
        console.log('Contact fields:', {
          group: telegramGroup,
          operator: telegramOperator,
          reserve: telegramReserve
        });

        // Проверяем обязательные поля
        if (!id || !name || !category || !categoryName || !weightsStr || !pricesStr) {
          console.warn('Пропущена строка из-за отсутствия обязательных полей:', row);
          return null;
        }

        // Нормализация названий городов
        const normalizeCity = (city: string): string => {
          const cityMap: { [key: string]: string } = {
            'нц': 'Нячанг',
            'нячанг': 'Нячанг',
            'хошимин': 'Хошимин',
            'дананг': 'Дананг',
            'фукуок': 'Фукуок',
            'муйне': 'Муйне'
          };
          const normalizedCity = city.toLowerCase().trim();
          return cityMap[normalizedCity] || city.trim();
        };

        // Обработка Telegram контактов
        const processedTelegramGroup = telegramGroup?.trim() || undefined;
        const processedTelegramOperator = telegramOperator?.trim() || undefined;
        const processedTelegramReserve = telegramReserve?.trim() || undefined;

        const product: ProductData = {
          id,
          name,
          description: description || '',
          photo: photo || undefined,
          category,
          categoryName,
          cities: (citiesStr || '').split(';')
            .map(city => normalizeCity(city))
            .filter(Boolean)
            .slice(0, 50),
          weightOptions: parseWeightOptions(weightsStr, pricesStr),
          telegramGroup: processedTelegramGroup,
          telegramOperator: processedTelegramOperator,
          telegramReserve: processedTelegramReserve
        };

        return product;
      } catch (err) {
        console.error('Ошибка при парсинге строки:', row, err);
        return null;
      }
    }).filter((product): product is ProductData => product !== null);

    // Отладочный вывод первого продукта
    if (products.length > 0) {
      console.log('First product contacts:', {
        operator: products[0].telegramOperator,
        group: products[0].telegramGroup,
        reserve: products[0].telegramReserve
      });
    }

    // Проверяем, что получили хотя бы один продукт
    if (products.length === 0) {
      throw new Error('No valid products found');
    }

    // Обновляем кэш
    productsCache = products;
    lastFetchTime = now;
    
    return products;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    // В случае ошибки возвращаем кэш, если он есть
    if (productsCache) {
      return productsCache;
    }
    // Если кэша нет, возвращаем пустой массив
    return [];
  }
}

function parseWeightOptions(weights: string, prices: string): WeightOption[] {
  try {
    const weightArray = weights.split(';').map(w => w.trim()).filter(Boolean);
    const priceArray = prices.split(';').map(p => p.trim()).filter(Boolean);
    
    return weightArray.map((weight, index) => ({
      weight,
      price: priceArray[index] || ''
    }));
  } catch (err) {
    console.error('Ошибка при парсинге опций веса/цены:', err);
    return [];
  }
}

export async function fetchProductsByCategory(category: string): Promise<ProductData[]> {
  const allProducts = await fetchProducts();
  return allProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getCategories(): Promise<Array<{id: string, name: string}>> {
  const products = await fetchProducts();
  const categories = new Map<string, string>();
  
  products.forEach(product => {
    if (!categories.has(product.category)) {
      categories.set(product.category, product.categoryName);
    }
  });
  
  return Array.from(categories.entries()).map(([id, name]) => ({ id, name }));
}

export async function getCities(): Promise<string[]> {
  const products = await fetchProducts();
  const cities = new Set<string>();
  
  products.forEach(product => {
    product.cities.forEach(city => cities.add(city));
  });
  
  return Array.from(cities);
}

export async function getContacts(): Promise<ContactData> {
  try {
    // Получаем все продукты
    const products = await fetchProducts();
    
    if (!products || products.length === 0) {
      throw new Error('No products data available');
    }

    // Берем данные из первой строки таблицы
    const firstProduct = products[0];
    
    // Собираем все доступные контакты
    const contacts: ContactData = {
      telegramGroup: firstProduct.telegramGroup,
      telegramOperator: firstProduct.telegramOperator,
      telegramReserve: firstProduct.telegramReserve
    };

    // Если какие-то контакты отсутствуют в первой строке, ищем в других
    if (!contacts.telegramGroup || !contacts.telegramOperator || !contacts.telegramReserve) {
      console.warn('Some contacts missing in first row, searching in other rows...');
      
      for (const product of products) {
        if (!contacts.telegramGroup && product.telegramGroup) {
          contacts.telegramGroup = product.telegramGroup;
        }
        if (!contacts.telegramOperator && product.telegramOperator) {
          contacts.telegramOperator = product.telegramOperator;
        }
        if (!contacts.telegramReserve && product.telegramReserve) {
          contacts.telegramReserve = product.telegramReserve;
        }

        // Если все контакты найдены, прерываем поиск
        if (contacts.telegramGroup && contacts.telegramOperator && contacts.telegramReserve) {
          break;
        }
      }
    }

    // Проверяем наличие хотя бы одного контакта
    if (!contacts.telegramGroup && !contacts.telegramOperator && !contacts.telegramReserve) {
      throw new Error('No contact information available in any row');
    }

    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

function cleanText(text: string): string {
  // Транслитерация и очистка текста
  const cyrillicMap: { [key: string]: string } = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
    'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
    'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
    'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts',
    'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
    'Я': 'Ya'
  };

  return text
    .split('')
    .map(char => cyrillicMap[char] || char)  // транслитерация
    .join('')
    .replace(/\s+/g, '_')  // замена пробелов на подчеркивания
    .replace(/[^a-zA-Z0-9_]/g, '');  // удаление всех других специальных символов
}

export function formatOrderMessage({ productName, weight, price }: OrderMessageParams): string {
  // Очищаем и форматируем все значения
  const cleanProduct = cleanText(productName);
  const cleanWeight = cleanText(weight);
  const cleanPrice = cleanText(price);
  
  // Формируем текст в новом формате
  return `Hello!/@${cleanProduct}@/Kolichestvo-${cleanWeight}/Stoimost-${cleanPrice}`;
}
