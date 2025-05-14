interface RateLimitWindow {
  timestamp: number;
  count: number;
}

class RateLimiter {
  private windows: Map<string, RateLimitWindow>;
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 30) {
    this.windows = new Map();
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  check(key: string = 'global'): boolean {
    const now = Date.now();
    const window = this.windows.get(key);

    // Очистка старых окон
    if (window && now - window.timestamp > this.windowMs) {
      this.windows.delete(key);
    }

    // Если окна нет или оно устарело, создаем новое
    if (!this.windows.has(key)) {
      this.windows.set(key, {
        timestamp: now,
        count: 1
      });
      return true;
    }

    // Проверяем количество запросов
    const currentWindow = this.windows.get(key)!;
    if (currentWindow.count >= this.maxRequests) {
      return false;
    }

    // Увеличиваем счетчик
    currentWindow.count++;
    return true;
  }

  reset(key: string = 'global'): void {
    this.windows.delete(key);
  }
}

// Создаем глобальный экземпляр лимитера
export const rateLimiter = new RateLimiter(); 