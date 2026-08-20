import { draftMode } from 'next/headers';
import { partners, products, resources, sectors, services, team, type Partner, type Product, type Resource, type Sector, type Service, type TeamMember } from './content';

const CMS_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const TOKEN = process.env.STRAPI_API_TOKEN;
const headers = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined;
function mediaUrl(value: unknown) {
  const url = typeof value === 'string' ? value : '';
  if (!url) return undefined;
  if (/^https?:\/\//.test(url)) return url;
  return `${CMS_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}


export type FormOption = { label: string; value: string };
export type FormConfiguration = {
  inquiryTypes: FormOption[];
  sectorOptions: FormOption[];
  serviceOptions: FormOption[];
  productOptions: FormOption[];
  followupOptions: FormOption[];
};
function optionize(input: unknown, fallback: string[]): FormOption[] {
  const source = Array.isArray(input) && input.length ? input : fallback;
  return source.map((item: unknown) => {
    if (item && typeof item === 'object') {
      const candidate = item as {
        label?: unknown;
        value?: unknown;
      };

      if (typeof candidate.label === 'string') {
        return {
          label: candidate.label,
          value: String(candidate.value || candidate.label),
        };
      }
    }
    const label=String(item);
    const value=label.toLowerCase().replace(/\s*\/\s*/g,'-').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    return { label, value };
  });
}

export type CmsPage = {
  title?: string;
  slug?: string;
  page_type: string;
  hero_title: string;
  hero_subtitle?: string;
  body_intro?: string;
  section_payload?: Record<string, unknown> | null;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
};

type StrapiList<T> = { data: T[] };
type CmsMedia = {
    url?: string;
  };

  type CmsProductRecord = Product & {
    maturity_status?: string;
    screenshots?: CmsMedia[];
  };

  type CmsResourceRecord = Resource & {
    sectors?: Array<{ name?: string }>;
    cover?: CmsMedia;
  };

  type CmsTeamRecord = TeamMember & {
    portrait?: CmsMedia;
  };

  type CmsPartnerRecord = Partner & {
    partnership_type?: string;
    logo?: CmsMedia;
  };
async function draftStatus() {
  try { return (await draftMode()).isEnabled ? 'draft' : undefined; } catch { return undefined; }
}

async function fetchList<T>(collection: string, fallback: T[], sortField: string): Promise<T[]> {
  const qs = new URLSearchParams({ 'pagination[pageSize]': '100', sort: `${sortField}:asc` });
  const status = await draftStatus();
  if (status) qs.set('status', status);
  try {
    const response = await fetch(`${CMS_URL}/api/${collection}?${qs.toString()}`, { headers, ...(status ? { cache: 'no-store' as const } : { next: { revalidate: 60 } }) });
    if (!response.ok) return fallback;
    const payload = (await response.json()) as StrapiList<T>;
    return Array.isArray(payload.data) && payload.data.length ? payload.data : fallback;
  } catch { return fallback; }
}

export const cms = {
  async page(pageType: string, fallback: CmsPage): Promise<CmsPage> {
    const qs = new URLSearchParams({ 'filters[page_type][$eq]': pageType, 'pagination[pageSize]': '1' });
    const status = await draftStatus();
    if (status) qs.set('status', status);
    try {
      const response = await fetch(`${CMS_URL}/api/pages?${qs.toString()}`, { headers, ...(status ? { cache: 'no-store' as const } : { next: { revalidate: 60 } }) });
      if (!response.ok) return fallback;
      const payload = await response.json();
      return payload?.data?.[0] || fallback;
    } catch { return fallback; }
  },
  async services(): Promise<Service[]> {
    const data = await fetchList<Service>('services', services, 'name');

    return data.map((item) => {
      const fallback = services.find(x=>x.slug===item.slug);
      return { ...item, bullets: Array.isArray(item.bullets) ? item.bullets : (fallback?.bullets || []), pillar: item.pillar || fallback?.pillar || '', summary: item.summary || fallback?.summary || '' };
    });
  },
  async sectors(): Promise<Sector[]> {
    const data = await fetchList<Sector>('sectors', sectors, 'name');

    return data.map((item) => {
      const fallback = sectors.find(x=>x.slug===item.slug);
      return { ...item, priorities: Array.isArray(item.priorities) ? item.priorities : (fallback?.priorities || []), summary: item.summary || fallback?.summary || '' };
    });
  },
  async products(): Promise<Product[]> {
    const qs=new URLSearchParams({ 'pagination[pageSize]':'100', sort:'name:asc', populate:'screenshots' });
    const status=await draftStatus(); if(status) qs.set('status',status);
    try {
      const response=await fetch(`${CMS_URL}/api/products?${qs.toString()}`, { headers, ...(status?{cache:'no-store' as const}:{next:{revalidate:60}}) });
      const data=response.ok?(await response.json())?.data:null;
      if(!Array.isArray(data)||!data.length) return products;
      return data.map((item: CmsProductRecord) => {const fallback=products.find(x=>x.slug===item.slug);return { ...item, status:item.status||item.maturity_status||undefined, merits:Array.isArray(item.merits)?item.merits:(fallback?.merits||[]), audience:item.audience||fallback?.audience||'', screenshotUrls:Array.isArray(item.screenshots)?item.screenshots
        .map((m: CmsMedia) => mediaUrl(m?.url))
        .filter((url): url is string => Boolean(url)):[] };});
    } catch { return products; }
  },
  async resources(): Promise<Resource[]> {
    const qs=new URLSearchParams({ 'pagination[pageSize]':'100', sort:'title:asc', 'populate[0]':'sectors','populate[1]':'cover' });
    const status=await draftStatus(); if(status) qs.set('status',status);
    try {
      const response=await fetch(`${CMS_URL}/api/resources?${qs.toString()}`, { headers, ...(status ? {cache:'no-store' as const}:{next:{revalidate:60}}) });
      if(!response.ok) return resources;
      const data=(await response.json())?.data;
      if(!Array.isArray(data)||!data.length) return resources;
      return data.map((item: CmsResourceRecord) => ({ ...resources.find(x=>x.slug===item.slug), ...item, sectorNames:Array.isArray(item.sectors)?item.sectors
  .map((s: { name?: string }) => s?.name)
  .filter((name): name is string => Boolean(name)):[], coverUrl:mediaUrl(item.cover?.url) }));
    } catch { return resources; }
  },
  async team(): Promise<TeamMember[]> {
    const qs=new URLSearchParams({ 'pagination[pageSize]':'100', sort:'sort_order:asc', populate:'portrait' });
    const status=await draftStatus(); if(status) qs.set('status',status);
    try {
      const response=await fetch(`${CMS_URL}/api/team-members?${qs.toString()}`, { headers, ...(status?{cache:'no-store' as const}:{next:{revalidate:60}}) });
      const data=response.ok?(await response.json())?.data:null;
      if(!Array.isArray(data)||!data.length) return team;
      return data.map((item: CmsTeamRecord) => {const fallback=team.find(x=>x.name===item.name);return { ...fallback, ...item, initials:item.initials||fallback?.initials||'', contribution:item.contribution||fallback?.contribution||'', relevance:item.relevance||fallback?.relevance||'', portraitUrl:mediaUrl(item.portrait?.url) } as TeamMember;});
    } catch { return team; }
  },
  async formConfiguration(): Promise<FormConfiguration> {
    const fallback = {
      inquiryTypes: [{label:'Consultation',value:'consultation'},{label:'General inquiry',value:'general'},{label:'Partnership',value:'partnership'},{label:'Platform / product',value:'platform'}],
      sectorOptions: sectors.map(x=>({label:x.name,value:x.name})),
      serviceOptions: services.map(x=>({label:x.name,value:x.name})),
      productOptions: products.map(x=>({label:x.name,value:x.name})),
      followupOptions: [{label:'Email',value:'email'},{label:'Phone call',value:'phone'},{label:'Online meeting',value:'online-meeting'},{label:'In-person discussion',value:'in-person'}]
    };
    try {
      const response = await fetch(`${CMS_URL}/api/form-configuration`, { headers, next:{revalidate:60} });
      if (!response.ok) return fallback;
      const record=(await response.json())?.data;
      if (!record) return fallback;
      const inquiries=optionize(record.inquiry_types, fallback.inquiryTypes.map(x=>x.label)).map((x,index)=>({ label:x.label, value: typeof record.inquiry_types?.[index] === 'object' ? x.value : (fallback.inquiryTypes[index]?.value || x.value) }));
      const followups=optionize(record.followup_options, fallback.followupOptions.map(x=>x.label)).map((x,index)=>({ label:x.label, value: typeof record.followup_options?.[index] === 'object' ? x.value : (fallback.followupOptions[index]?.value || x.value) }));
      return {
        inquiryTypes: inquiries,
        sectorOptions: optionize(record.sector_options, sectors.map(x=>x.name)).map(x=>({label:x.label,value:x.label})),
        serviceOptions: optionize(record.service_options, services.map(x=>x.name)).map(x=>({label:x.label,value:x.label})),
        productOptions: optionize(record.product_options, products.map(x=>x.name)).map(x=>({label:x.label,value:x.label})),
        followupOptions: followups
      };
    } catch { return fallback; }
  },
  async partners(): Promise<Partner[]> {
    const qs=new URLSearchParams({ 'pagination[pageSize]':'100', sort:'name:asc', populate:'logo' });
    const status=await draftStatus(); if(status) qs.set('status',status);
    try {
      const response=await fetch(`${CMS_URL}/api/partners?${qs.toString()}`, { headers, ...(status?{cache:'no-store' as const}:{next:{revalidate:60}}) });
      const data=response.ok?(await response.json())?.data:null;
      if(!Array.isArray(data)||!data.length) return partners;
      return data.map((item: CmsPartnerRecord) => ({ ...item, type:item.type||item.partnership_type||'', description:item.description||partners.find(x=>x.name===item.name)?.description||'', logoUrl:mediaUrl(item.logo?.url) }));
    } catch { return partners; }
  }
};
