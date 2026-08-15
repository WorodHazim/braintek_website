'use client';

import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Resource } from '@/lib/content';

export function ResourceExplorer({ resources }: { resources: Resource[] }) {
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('');
  const [format,setFormat]=useState('');
  const [sector,setSector]=useState('');
  const categories=useMemo(()=>[...new Set(resources.map(r=>r.category))].sort(),[resources]);
  const formats=useMemo(()=>[...new Set(resources.map(r=>r.format))].sort(),[resources]);
  const sectors=useMemo(()=>[...new Set(resources.flatMap(r=>r.sectorNames||[]))].sort(),[resources]);
  const filtered=resources.filter(r=>{
    const text=`${r.title} ${r.summary} ${r.category} ${r.format} ${(r.sectorNames||[]).join(' ')}`.toLowerCase();
    return (!query||text.includes(query.toLowerCase())) && (!category||r.category===category) && (!format||r.format===format) && (!sector||(r.sectorNames||[]).includes(sector));
  });
  return <>
    <div className="resource-toolbar" aria-label="Resource filters">
      <label className="resource-search"><Search size={17}/><span className="sr-only">Search insights and resources</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search insights and resources"/></label>
      <label><span className="sr-only">Category</span><select value={category} onChange={e=>setCategory(e.target.value)}><option value="">All categories</option>{categories.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="sr-only">Format</span><select value={format} onChange={e=>setFormat(e.target.value)}><option value="">All formats</option>{formats.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="sr-only">Sector</span><select value={sector} onChange={e=>setSector(e.target.value)} disabled={!sectors.length}><option value="">{sectors.length?'All sectors':'Sector tags managed in CMS'}</option>{sectors.map(x=><option key={x}>{x}</option>)}</select></label>
    </div>
    <div className="resource-grid">{filtered.map(r=><Link href={`/insights-resources/${r.slug}`} className="resource-card" key={r.slug}><div className={`resource-cover${r.coverUrl?' has-image':''}`}>{r.coverUrl?<img src={r.coverUrl} alt="" loading="lazy"/>:null}</div><div className="resource-meta">{r.category} / {r.format}</div><h3>{r.title}</h3><p>{r.summary}</p>{r.sectorNames?.length?<div className="resource-sector-tags">{r.sectorNames.slice(0,2).map(x=><span key={x}>{x}</span>)}</div>:null}<span className="text-link">Open resource <ArrowUpRight size={16}/></span></Link>)}</div>
    {!filtered.length&&<div className="empty-state">No resources match the selected filters.</div>}
  </>;
}
