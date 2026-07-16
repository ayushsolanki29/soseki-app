import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function serverFetch(endpoint, options = {}) {
  // In Next.js 15, cookies() is asynchronous
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  const headers = {
    'Content-Type': 'application/json',
    ...(allCookies ? { Cookie: allCookies } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store' // Prevents Next.js from permanently caching the response
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    const errorData = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorData}`);
  }

  return response.json();
}
