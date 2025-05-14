import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Проверяем, что URL начинается с /category/
  if (request.nextUrl.pathname.startsWith('/category/')) {
    // Получаем categoryId из URL
    const categoryId = request.nextUrl.pathname.split('/')[2];
    
    // Если categoryId отсутствует, перенаправляем на главную
    if (!categoryId) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/category/:path*',
}; 