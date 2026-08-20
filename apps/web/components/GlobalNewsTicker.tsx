'use client';

import { usePathname } from 'next/navigation';
import { HomeNewsTicker } from '@/components/HomeNewsTicker';
import type { NewsItem } from '@/lib/marketing-cms';

export function GlobalNewsTicker({ items }: { items: NewsItem[] }) {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return <HomeNewsTicker items={items} />;
}
