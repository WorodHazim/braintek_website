const CMS_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.CMS_INTERNAL_URL ||
  'http://localhost:1337';

const TOKEN = process.env.STRAPI_API_TOKEN;

const headers = TOKEN
  ? { Authorization: `Bearer ${TOKEN}` }
  : undefined;

function mediaUrl(value: unknown) {
  const url = typeof value === 'string' ? value : '';
  if (!url) return undefined;
  if (/^https?:\/\//.test(url)) return url;
  return `${CMS_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

export type NewsItem = {
  documentId: string;
  label?: string;
  headline: string;
  link_url?: string;
};

export type CaseStudy = {
  documentId: string;
  slug: string;
  title: string;
  client_type?: string;
  client_name?: string;
  project_summary?: string;
  challenge?: string;
  solution?: string;
  outcome_summary?: string;
  client_review?: string;
  client_review_name?: string;
  project_date?: string;
  featured?: boolean;
  coverUrl?: string;
  galleryUrls?: string[];
  meta_title?: string;
  meta_description?: string;
};

async function getJson(path: string) {
  const response = await fetch(`${CMS_URL}${path}`, {
    headers,
    next: { revalidate: 60 },
  });

  if (!response.ok) return null;
  return response.json();
}

export async function fetchNewsItems(): Promise<NewsItem[]> {
  try {
    const payload = await getJson('/api/news-feed');
    const data = payload?.data;
    if (!Array.isArray(data)) return [];

    return data
      .filter((item) => item?.headline)
      .map((item) => ({
        documentId: String(item.documentId || item.id || item.headline),
        label: item.label || 'Update',
        headline: String(item.headline),
        link_url: item.link_url || undefined,
      }));
  } catch {
    return [];
  }
}

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  try {
    const payload = await getJson('/api/portfolio-feed');
    const data = payload?.data;
    if (!Array.isArray(data)) return [];

    return data
      .filter((item) => item?.slug && item?.title)
      .map((item) => ({
        ...item,
        documentId: String(item.documentId || item.id || item.slug),
        coverUrl: mediaUrl(item.cover?.url || item.cover_url),
        galleryUrls: Array.isArray(item.gallery)
          ? item.gallery
              .map((image: { url?: string }) => mediaUrl(image?.url))
              .filter(
                  (url: string | undefined): url is string =>
                    typeof url === 'string'
                )
          : [],
      }));
  } catch {
    return [];
  }
}
