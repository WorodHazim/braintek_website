'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  ExternalLink,
  Inbox,
  LogOut,
  Mail,
  Menu,
  Phone,
  RefreshCw,
  Save,
  Search,
  Send,
  X,
} from 'lucide-react';
import styles from './AdminApp.module.css';

type Status='NEW'|'IN_REVIEW'|'CONTACTED'|'QUALIFIED'|'CLOSED'|'ARCHIVED';
type Submission={documentId:string;form_type:string;full_name:string;organization:string;role_title?:string;email:string;phone?:string;sector_interest?:string;service_interest?:string;product_interest?:string;preferred_followup?:string;message:string;status:Status;assignee?:string;internal_notes?:string;follow_up_at?:string;source_url?:string;createdAt?:string;status_history?:Array<{id?:number;previous_status?:string;new_status:string;changed_by?:string;note?:string;changed_at:string}>};
type Summary={counts:Record<Status|'total',number>;recent:Submission[];content:{services:number;sectors:number;products:number;resources:number;team_members:number;partners:number}};
const statuses:Status[]=['NEW','IN_REVIEW','CONTACTED','QUALIFIED','CLOSED','ARCHIVED'];
const labels:Record<Status,string>={NEW:'New',IN_REVIEW:'In Review',CONTACTED:'Contacted',QUALIFIED:'Qualified',CLOSED:'Closed',ARCHIVED:'Archived'};
const cms='http://localhost:1337/admin';
function dt(value?:string){if(!value)return '—';const d=new Date(value);return Number.isNaN(d.getTime())?'—':new Intl.DateTimeFormat('en-AE',{dateStyle:'medium',timeStyle:'short'}).format(d)}
function localDate(value?:string){if(!value)return '';const d=new Date(value);if(Number.isNaN(d.getTime()))return '';return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,16)}

export function AdminApp({email}:{email:string}){
 const [tab,setTab]=useState<'overview'|'inquiries'|'content'>('overview');
 const [summary,setSummary]=useState<Summary|null>(null);const [items,setItems]=useState<Submission[]>([]);const [selected,setSelected]=useState<Submission|null>(null);
 const [query,setQuery]=useState('');const [filter,setFilter]=useState('');const [loading,setLoading]=useState(false);const [error,setError]=useState('');const [menu,setMenu]=useState(false);
 const [status,setStatus]=useState<Status>('NEW');const [assignee,setAssignee]=useState('');const [follow,setFollow]=useState('');const [notes,setNotes]=useState('');const [updateNote,setUpdateNote]=useState('');const [activity,setActivity]=useState('');
 const api = useCallback(async (url: string, init?: RequestInit) => {
    const r = await fetch(url, { ...init, cache: 'no-store' });

    if (r.status === 401) {
      window.location.assign('/admin/login');
      throw new Error('Authentication required.');
    }

    const data = await r.json().catch(() => ({}));

    if (!r.ok) {
      throw new Error(data?.error || data?.message || 'Request failed.');
    }

    return data;
  }, []);

  const loadSummary = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const d = await api('/api/admin/dashboard/summary');
      setSummary(d.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load dashboard.');
    } finally {
      setLoading(false);
    }
  }, [api]);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const p = new URLSearchParams({
        page: '1',
        pageSize: '100',
      });

      if (query) p.set('q', query);
      if (filter) p.set('status', filter);

      const d = await api(`/api/admin/submissions?${p}`);
      setItems(d.data || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load inquiries.');
    } finally {
      setLoading(false);
    }
  }, [api, query, filter]);
 async function openItem(id:string){setLoading(true);setError('');try{const d=await api(`/api/admin/submissions/${encodeURIComponent(id)}`);const x=d.data as Submission;setSelected(x);setStatus(x.status);setAssignee(x.assignee||'');setFollow(localDate(x.follow_up_at));setNotes(x.internal_notes||'');setUpdateNote('');setActivity('')}catch(e){setError(e instanceof Error?e.message:'Unable to load inquiry.')}finally{setLoading(false)}}
 useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadSummary();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadSummary]);

  useEffect(() => {
    if (tab !== 'inquiries' || selected) return;

    const timer = window.setTimeout(() => {
      void loadItems();
    }, query ? 250 : 0);

    return () => window.clearTimeout(timer);
  }, [tab, query, selected, loadItems]);
 async function save(){if(!selected)return;setLoading(true);setError('');try{await api(`/api/admin/submissions/${encodeURIComponent(selected.documentId)}`,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({status,assignee,follow_up_at:follow?new Date(follow).toISOString():null,internal_notes:notes,note:updateNote})});await openItem(selected.documentId);await loadSummary()}catch(e){setError(e instanceof Error?e.message:'Unable to save inquiry.')}finally{setLoading(false)}}
 async function addActivity(){if(!selected||!activity.trim())return;setLoading(true);try{await api(`/api/admin/submissions/${encodeURIComponent(selected.documentId)}/log`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({note:activity})});setActivity('');await openItem(selected.documentId)}catch(e){setError(e instanceof Error?e.message:'Unable to add note.')}finally{setLoading(false)}}
 async function logout(){await fetch('/api/admin/auth/logout',{method:'POST'});window.location.assign('/admin/login')}
 const cards=useMemo(()=>statuses.filter(s=>s!=='ARCHIVED'),[]);
 return <div className={styles.viewport} data-braintek-admin-root>
  <aside className={`${styles.sidebar} ${menu?styles.open:''}`}><div className={styles.brand}><img src="/brand/braintek-logo.png" alt="BrainTek"/><span>Operations</span><button onClick={()=>setMenu(false)}><X size={17}/></button></div>
   <nav><p>Workspace</p><button className={tab==='overview'?styles.active:''} onClick={()=>{setTab('overview');setSelected(null);setMenu(false)}}><BarChart3 size={17}/>Dashboard</button><button className={tab==='inquiries'?styles.active:''} onClick={()=>{setTab('inquiries');setSelected(null);setMenu(false)}}><Inbox size={17}/>Inquiries</button><button className={tab==='content'?styles.active:''} onClick={()=>{setTab('content');setSelected(null);setMenu(false)}}><BookOpen size={17}/>Content overview</button><p>CMS</p><a href={cms} target="_blank" rel="noreferrer"><ExternalLink size={16}/>Open Strapi CMS</a></nav>
   <footer><span>Signed in</span><strong>{email}</strong><button onClick={logout}><LogOut size={15}/>Sign out</button></footer>
  </aside>
  <div className={styles.work}><header className={styles.top}><button className={styles.mobile} onClick={()=>setMenu(true)}><Menu size={18}/></button><div><span>BRAINTEK</span><strong>Operational Administration</strong></div><a href="/" target="_blank">View website <ExternalLink size={13}/></a></header>
   <main className={styles.main}>{error?<div className={styles.error}>{error}</div>:null}
    {tab==='overview'?<><section className={styles.heading}><div><p>Operational overview</p><h1>Dashboard</h1><span>Inquiries, workflow and content at a glance.</span></div><button onClick={loadSummary}><RefreshCw size={14}/>Refresh</button></section>
     <section className={styles.metrics}><article className={styles.total}><p>Total inquiries</p><strong>{summary?.counts.total??'—'}</strong></article>{cards.map(s=><button key={s} onClick={()=>{setFilter(s);setTab('inquiries')}}><p>{labels[s]}</p><strong>{summary?.counts[s]??'—'}</strong></button>)}</section>
     <div className={styles.split}><section className={styles.panel}><header><div><p>Recent activity</p><h2>Latest inquiries</h2></div><button onClick={()=>setTab('inquiries')}>View all <ArrowRight size={13}/></button></header><div className={styles.recent}>{summary?.recent.map(x=><button key={x.documentId} onClick={()=>{setTab('inquiries');openItem(x.documentId)}}><div><strong>{x.full_name}</strong><span>{x.organization}</span></div><i className={`${styles.badge} ${styles[x.status]}`}>{labels[x.status]}</i><small>{dt(x.createdAt)}</small></button>)}{!summary?.recent.length?<p>No inquiries yet.</p>:null}</div></section>
      <aside className={styles.contentSnap}><p>CMS snapshot</p><div><span><strong>{summary?.content.services??'—'}</strong>Services</span><span><strong>{summary?.content.sectors??'—'}</strong>Sectors</span><span><strong>{summary?.content.products??'—'}</strong>Platforms</span><span><strong>{summary?.content.resources??'—'}</strong>Insights</span></div><button onClick={()=>setTab('content')}>Open content overview <ArrowRight size={13}/></button></aside></div></>:null}

    {tab==='inquiries'&&!selected?<><section className={styles.heading}><div><p>Lead management</p><h1>Inquiries</h1><span>Review, route and progress requests from the website.</span></div></section><section className={styles.filters}><label><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name, organization, email, service…"/></label><select value={filter} onChange={e=>setFilter(e.target.value)}><option value="">All statuses</option>{statuses.map(s=><option key={s} value={s}>{labels[s]}</option>)}</select><button onClick={loadItems}><RefreshCw size={14}/>Refresh</button></section><section className={styles.table}><header><span>Contact</span><span>Interest</span><span>Status</span><span>Received</span><span/></header>{loading?<p>Loading…</p>:items.map(x=><button key={x.documentId} onClick={()=>openItem(x.documentId)}><div><strong>{x.full_name}</strong><span>{x.organization}</span><small>{x.email}</small></div><div><strong>{x.service_interest||x.product_interest||x.form_type}</strong><span>{x.sector_interest||'—'}</span></div><i className={`${styles.badge} ${styles[x.status]}`}>{labels[x.status]}</i><small>{dt(x.createdAt)}</small><ArrowRight size={14}/></button>)}{!loading&&!items.length?<p>No matching inquiries.</p>:null}</section></>:null}

    {tab==='inquiries'&&selected?<><section className={styles.heading}><div><button className={styles.back} onClick={()=>setSelected(null)}><ArrowLeft size={14}/>Back to inquiries</button><p>Inquiry record</p><h1>{selected.organization}</h1><span>{selected.full_name} · {selected.email}</span></div><i className={`${styles.badge} ${styles[selected.status]}`}>{labels[selected.status]}</i></section><div className={styles.detail}><div className={styles.detailMain}><section className={styles.card}><header><p>Contact</p><h2>{selected.full_name}</h2></header><div className={styles.info}><span><b>Role</b>{selected.role_title||'—'}</span><span><b>Email</b><a href={`mailto:${selected.email}`}>{selected.email}</a></span><span><b>Phone</b>{selected.phone?<a href={`tel:${selected.phone}`}>{selected.phone}</a>:'—'}</span><span><b>Received</b>{dt(selected.createdAt)}</span></div></section><section className={styles.card}><header><p>Inquiry context</p><h2>What they need.</h2></header><div className={styles.info}><span><b>Type</b>{selected.form_type}</span><span><b>Sector</b>{selected.sector_interest||'—'}</span><span><b>Service</b>{selected.service_interest||'—'}</span><span><b>Platform</b>{selected.product_interest||'—'}</span></div><div className={styles.message}><b>Message</b><p>{selected.message}</p></div></section><section className={styles.card}><header><p>Activity history</p><h2>Operational timeline.</h2></header><div className={styles.add}><input value={activity} onChange={e=>setActivity(e.target.value)} placeholder="Add call / meeting / internal activity note…"/><button onClick={addActivity} disabled={!activity.trim()}><Send size={14}/>Add</button></div><div className={styles.timeline}>{selected.status_history?.map((h,i)=><article key={`${h.changed_at}-${i}`}><i/><div><strong>{h.note||`${h.previous_status||''} → ${h.new_status}`}</strong><span>{dt(h.changed_at)}</span><p>{h.changed_by||'BRAINTEK'}</p></div></article>)}{!selected.status_history?.length?<p>No activity recorded.</p>:null}</div></section></div>
     <aside className={styles.workflow}><header><p>Workflow</p><h2>Progress the inquiry.</h2></header><label>Status<select value={status} onChange={e=>setStatus(e.target.value as Status)}>{statuses.map(s=><option key={s}>{s}</option>)}</select></label><label>Assignee<input value={assignee} onChange={e=>setAssignee(e.target.value)} placeholder="Name or team"/></label><label>Follow-up date<input type="datetime-local" value={follow} onChange={e=>setFollow(e.target.value)}/></label><label>Internal notes<textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Private operational notes…"/></label><label>Update note<textarea value={updateNote} onChange={e=>setUpdateNote(e.target.value)} placeholder="Optional history note…"/></label><button onClick={save} disabled={loading}><Save size={14}/>{loading?'Saving…':'Save changes'}</button><div className={styles.quick}><a href={`mailto:${selected.email}`}><Mail size={14}/>Email contact</a>{selected.phone?<a href={`tel:${selected.phone}`}><Phone size={14}/>Call contact</a>:null}</div></aside></div></>:null}

    {tab==='content'?<><section className={styles.heading}><div><p>Content operations</p><h1>Content overview</h1><span>Publishing stays inside Strapi; this dashboard stays focused on operational work.</span></div></section><section className={styles.contentIntro}><div><p>Publishing boundary</p><h2>Manage content in Strapi. Manage inquiries here.</h2></div><p>Use these shortcuts to open the relevant Strapi collection. Counts come from the live CMS database.</p></section><section className={styles.contentGrid}>{[{k:'services',n:'Services',t:'api::service.service'},{k:'sectors',n:'Sectors',t:'api::sector.sector'},{k:'products',n:'Platforms & Products',t:'api::product.product'},{k:'resources',n:'Insights & Resources',t:'api::resource.resource'},{k:'team_members',n:'Expert Team',t:'api::team-member.team-member'},{k:'partners',n:'Partners',t:'api::partner.partner'}].map(x=><a key={x.k} href={`${cms}/content-manager/collection-types/${x.t}`} target="_blank" rel="noreferrer"><ArrowUpRight size={15}/><span>{x.n}</span><strong>{summary?.content[x.k as keyof Summary['content']]??'—'}</strong><p>Open in Strapi Content Manager</p></a>)}</section></>:null}
   </main>
  </div>
 </div>
}
