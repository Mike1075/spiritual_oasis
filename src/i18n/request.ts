import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headersList = await headers();

  // Try to get locale from cookie first
  let locale = cookieStore.get('locale')?.value as Locale;

  // If no cookie, try to detect from Accept-Language header
  if (!locale) {
    const acceptLanguage = headersList.get('accept-language') || '';
    if (acceptLanguage.includes('zh')) {
      locale = 'zh';
    } else {
      locale = 'en';
    }
  }

  // Validate locale
  if (!locales.includes(locale)) {
    locale = 'zh';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
