import React, { useEffect, useMemo, useState } from 'react';
import { getFetchClient, Page, useRBAC } from '@strapi/strapi/admin';
import { permissions } from '../../permissions';

type Submission = {
  documentId: string; full_name: string; organization: string; email: string; phone?: string; role_title?: string;
  form_type: string; sector_interest?: string; service_interest?: string; product_interest?: string; preferred_followup?: string;
  message?: string; status: string; assignee?: string; internal_notes?: string; follow_up_at?: string | null; createdAt: string; updatedAt?: string;
};
type History = { documentId:string; previous_status?:string; new_status:string; changed_by?:string; note?:string; changed_at:string };
type Distribution = {label:string;value:number}[];
type Pagination = {page:number;pageSize:number;pageCount:number;total:number};
type Summary = {
  total:number; distributionSampleSize:number; counts:Record<string,number>; overdueFollowUps:number; recent:Submission[];
  distributions:{type:Distribution;service:Distribution;sector:Distribution;product:Distribution};
  content:{requiringReview:number;recentlyPublished:{uid:string;documentId:string;title:string;updatedAt:string}[]};
};
const STATUSES = ['NEW','IN_REVIEW','CONTACTED','QUALIFIED','CLOSED','ARCHIVED'];
const TYPES = ['consultation','general','partnership','platform','download'];
const css: Record<string, React.CSSProperties> = {
  page:{padding:'32px',background:'#f6f8fb',minHeight:'100vh',fontFamily:'Inter,Arial,sans-serif',color:'#102A43'},
  header:{display:'flex',justifyContent:'space-between',alignItems:'end',gap:'20px',marginBottom:'26px'},
  title:{fontSize:'32px',margin:0,fontWeight:800,letterSpacing:'-0.03em'},
  eyebrow:{fontSize:'11px',fontWeight:800,letterSpacing:'.12em',textTransform:'uppercase',color:'#0B7C7A',margin:'0 0 6px'},
  stats:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(145px,1fr))',gap:'12px',marginBottom:'24px'},
  card:{background:'#fff',border:'1px solid #D9E2EC',borderRadius:'10px',padding:'18px'},
  stat:{fontSize:'28px',fontWeight:800,marginTop:'5px'},
  analytics:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'12px',marginBottom:'24px'},
  toolbar:{display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'14px'},
  input:{height:'40px',border:'1px solid #cbd8e2',borderRadius:'7px',padding:'0 12px',background:'#fff',color:'#102A43'},
  tableWrap:{background:'#fff',border:'1px solid #D9E2EC',borderRadius:'10px',overflow:'auto'},
  table:{width:'100%',borderCollapse:'collapse',minWidth:'1100px'},
  th:{textAlign:'left',fontSize:'11px',letterSpacing:'.06em',textTransform:'uppercase',color:'#60778a',padding:'13px 14px',borderBottom:'1px solid #D9E2EC'},
  td:{fontSize:'13px',padding:'13px 14px',borderBottom:'1px solid #edf1f4',verticalAlign:'top'},
  select:{height:'34px',border:'1px solid #cbd8e2',borderRadius:'6px',padding:'0 8px',background:'#fff',color:'#102A43'},
  button:{height:'36px',border:0,borderRadius:'7px',padding:'0 13px',background:'#0B1F3A',color:'#fff',fontWeight:700,cursor:'pointer'},
  drawerBackdrop:{position:'fixed',inset:0,background:'rgba(4,15,28,.35)',zIndex:1000},
  drawer:{position:'fixed',right:0,top:0,bottom:0,width:'min(620px,92vw)',background:'#fff',zIndex:1001,boxShadow:'-18px 0 50px rgba(0,0,0,.16)',overflow:'auto',padding:'28px'},
  label:{display:'block',fontSize:'11px',fontWeight:800,letterSpacing:'.05em',textTransform:'uppercase',color:'#60778a',marginBottom:'6px'},
  textarea:{width:'100%',minHeight:'110px',border:'1px solid #cbd8e2',borderRadius:'7px',padding:'10px',resize:'vertical',color:'#102A43'},
  detailGrid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'},
  history:{borderLeft:'2px solid #D9E2EC',paddingLeft:'16px',display:'grid',gap:'16px'}
};

function MiniDistribution({title,data,sampleSize}:{title:string;data:Distribution;sampleSize:number}){
  const max=Math.max(1,...data.map(x=>x.value));
  return <div style={css.card}><p style={css.eyebrow}>{title}</p><div style={{display:'grid',gap:10,marginTop:12}}>{data.slice(0,5).map(x=><div key={x.label}><div style={{display:'flex',justifyContent:'space-between',gap:12,fontSize:12}}><span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{x.label}</span><strong>{x.value}</strong></div><div style={{height:5,background:'#edf2f5',borderRadius:20,marginTop:5,overflow:'hidden'}}><div style={{height:'100%',width:`${Math.max(4,(x.value/max)*100)}%`,background:'#0EA5A4'}}/></div></div>)}</div>{!data.length&&<div style={{fontSize:12,color:'#718699'}}>No data yet</div>}<div style={{fontSize:10,color:'#8a9cab',marginTop:12}}>Based on the latest {sampleSize} stored submissions</div></div>
}

export default function App(){
  const [summary,setSummary]=useState<Summary|null>(null); const [rows,setRows]=useState<Submission[]>([]); const [page,setPage]=useState(1); const [pagination,setPagination]=useState<Pagination>({page:1,pageSize:50,pageCount:1,total:0});
  const [q,setQ]=useState(''); const [status,setStatus]=useState(''); const [type,setType]=useState(''); const [sector,setSector]=useState(''); const [service,setService]=useState(''); const [product,setProduct]=useState(''); const [assignee,setAssignee]=useState(''); const [busy,setBusy]=useState(false);
  const [selected,setSelected]=useState<Submission|null>(null); const [history,setHistory]=useState<History[]>([]); const [edit,setEdit]=useState<Partial<Submission>&{note?:string}>({}); const [saving,setSaving]=useState(false);
  const client=useMemo(()=>getFetchClient(),[]);
  const { allowedActions: { canUpdate } } = useRBAC({ canUpdate: permissions.update });

  async function load(targetPage=page){setBusy(true);try{
    const qs=new URLSearchParams({status,q,form_type:type,sector,service,product,assignee,page:String(targetPage),pageSize:'50'});
    const [s,r]=await Promise.all([client.get('/braintek-ops/summary'),client.get(`/braintek-ops/submissions?${qs.toString()}`)]);
    setSummary(s.data);setRows(r.data.data||[]);const meta=r.data.meta?.pagination||{page:targetPage,pageSize:50,pageCount:1,total:(r.data.data||[]).length};setPagination(meta);setPage(meta.page||targetPage);
  }finally{setBusy(false)}}
  useEffect(()=>{load(1)},[]); // eslint-disable-line react-hooks/exhaustive-deps

  async function open(row:Submission){const res=await client.get(`/braintek-ops/submissions/${row.documentId}`);setSelected(res.data.data);setHistory(res.data.history||[]);const d=res.data.data;setEdit({status:d.status,assignee:d.assignee||'',internal_notes:d.internal_notes||'',follow_up_at:d.follow_up_at||null,note:''});}
  async function save(){if(!selected||!canUpdate)return;setSaving(true);try{let follow=edit.follow_up_at;if(follow && typeof follow==='string' && !follow.endsWith('Z')){const date=new Date(follow);if(!Number.isNaN(date.getTime()))follow=date.toISOString();}await client.patch(`/braintek-ops/submissions/${selected.documentId}`,{...edit,follow_up_at:follow});const res=await client.get(`/braintek-ops/submissions/${selected.documentId}`);setSelected(res.data.data);setHistory(res.data.history||[]);setEdit({...edit,note:''});await load(page);}finally{setSaving(false)}}
  function close(){setSelected(null);setHistory([]);}

  return <Page.Protect permissions={permissions.access}><main style={css.page}>
    <div style={css.header}><div><p style={css.eyebrow}>BRAINTEK / Website Operations</p><h1 style={css.title}>Inquiry & Content Operations</h1></div><div style={{fontSize:12,color:'#6b8193'}}>CMS + lead workflow + audit history</div></div>
    <div style={css.stats}>
      <div style={css.card}><div style={css.eyebrow}>Total submissions</div><div style={css.stat}>{summary?.total ?? '—'}</div></div>
      {STATUSES.slice(0,5).map(s=><div style={css.card} key={s}><div style={css.eyebrow}>{s.replaceAll('_',' ')}</div><div style={css.stat}>{summary?.counts?.[s] ?? '—'}</div></div>)}
      <div style={css.card}><div style={css.eyebrow}>Overdue follow-up</div><div style={css.stat}>{summary?.overdueFollowUps ?? '—'}</div></div>
      <div style={css.card}><div style={css.eyebrow}>Content in review</div><div style={css.stat}>{summary?.content?.requiringReview ?? '—'}</div></div>
    </div>
    <div style={css.analytics}>
      <MiniDistribution title="Inquiry type" data={summary?.distributions?.type||[]} sampleSize={summary?.distributionSampleSize||0}/>
      <MiniDistribution title="Service interest" data={summary?.distributions?.service||[]} sampleSize={summary?.distributionSampleSize||0}/>
      <MiniDistribution title="Sector interest" data={summary?.distributions?.sector||[]} sampleSize={summary?.distributionSampleSize||0}/>
      <MiniDistribution title="Product interest" data={summary?.distributions?.product||[]} sampleSize={summary?.distributionSampleSize||0}/>
    </div>

    <div style={{...css.card,marginBottom:24}}><p style={css.eyebrow}>Recently published content</p><div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:10}}>{summary?.content?.recentlyPublished?.map(x=><span key={`${x.uid}-${x.documentId}`} style={{padding:'6px 9px',border:'1px solid #D9E2EC',borderRadius:20,fontSize:11}}>{x.title}</span>)}{!summary?.content?.recentlyPublished?.length&&<span style={{fontSize:12,color:'#718699'}}>No seeded publication activity yet.</span>}</div></div>

    <div style={css.toolbar}>
      <input style={{...css.input,minWidth:260}} placeholder="Search name, organization, email or message" value={q} onChange={e=>setQ(e.target.value)}/>
      <select style={css.input} value={status} onChange={e=>setStatus(e.target.value)}><option value="">All statuses</option>{STATUSES.map(s=><option key={s}>{s}</option>)}</select>
      <select style={css.input} value={type} onChange={e=>setType(e.target.value)}><option value="">All inquiry types</option>{TYPES.map(s=><option key={s}>{s}</option>)}</select>
      <input style={css.input} placeholder="Sector" value={sector} onChange={e=>setSector(e.target.value)}/>
      <input style={css.input} placeholder="Service" value={service} onChange={e=>setService(e.target.value)}/>
      <input style={css.input} placeholder="Product" value={product} onChange={e=>setProduct(e.target.value)}/>
      <input style={css.input} placeholder="Assignee" value={assignee} onChange={e=>setAssignee(e.target.value)}/>
      <button onClick={()=>{setPage(1);load(1)}} style={css.button}>{busy?'Loading…':'Apply filters'}</button>
    </div>
    <div style={css.tableWrap}><table style={css.table}><thead><tr>{['Date','Contact','Organization','Type','Sector / Interest','Status','Assignee',''].map(h=><th style={css.th} key={h}>{h}</th>)}</tr></thead><tbody>{rows.map(row=><tr key={row.documentId}><td style={css.td}>{new Date(row.createdAt).toLocaleDateString()}</td><td style={css.td}><strong>{row.full_name}</strong><br/><span style={{color:'#6b8193'}}>{row.email}</span></td><td style={css.td}>{row.organization}</td><td style={css.td}>{row.form_type}</td><td style={css.td}>{row.sector_interest||'—'}<br/><span style={{color:'#6b8193'}}>{row.service_interest||row.product_interest||''}</span></td><td style={css.td}>{row.status.replaceAll('_',' ')}</td><td style={css.td}>{row.assignee||'Unassigned'}</td><td style={css.td}><button style={{...css.button,height:30,fontSize:11}} onClick={()=>open(row)}>Open</button></td></tr>)}{!rows.length&&<tr><td colSpan={8} style={{...css.td,padding:30,textAlign:'center',color:'#6b8193'}}>No inquiries match the current filters.</td></tr>}</tbody></table></div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:14,marginTop:12,fontSize:12,color:'#60778a'}}><span>{pagination.total} matching submissions · Page {pagination.page} of {pagination.pageCount}</span><div style={{display:'flex',gap:8}}><button style={{...css.button,background:'#fff',color:'#102A43',border:'1px solid #D9E2EC'}} disabled={busy||pagination.page<=1} onClick={()=>load(Math.max(1,pagination.page-1))}>Previous</button><button style={css.button} disabled={busy||pagination.page>=pagination.pageCount} onClick={()=>load(Math.min(pagination.pageCount,pagination.page+1))}>Next</button></div></div>

    {selected&&<><div style={css.drawerBackdrop} onClick={close}/><aside style={css.drawer} aria-label="Inquiry details">
      <div style={{display:'flex',justifyContent:'space-between',gap:20,alignItems:'start',marginBottom:24}}><div><p style={css.eyebrow}>Inquiry details</p><h2 style={{fontSize:26,margin:0}}>{selected.full_name}</h2><div style={{fontSize:13,color:'#60778a'}}>{selected.organization}</div></div><button style={{...css.button,background:'#edf2f5',color:'#102A43'}} onClick={close}>Close</button></div>
      <div style={css.detailGrid}>
        <div style={css.card}><span style={css.label}>Email</span><a href={`mailto:${selected.email}`}>{selected.email}</a></div>
        <div style={css.card}><span style={css.label}>Phone</span>{selected.phone||'—'}</div>
        <div style={css.card}><span style={css.label}>Role</span>{selected.role_title||'—'}</div>
        <div style={css.card}><span style={css.label}>Preferred follow-up</span>{selected.preferred_followup||'—'}</div>
        <div style={css.card}><span style={css.label}>Sector</span>{selected.sector_interest||'—'}</div>
        <div style={css.card}><span style={css.label}>Service / product</span>{selected.service_interest||selected.product_interest||'—'}</div>
      </div>
      <div style={{...css.card,marginTop:14}}><span style={css.label}>Message</span><div style={{whiteSpace:'pre-wrap',fontSize:13,lineHeight:1.55}}>{selected.message||'—'}</div></div>
      <div style={{marginTop:24}}><p style={css.eyebrow}>Workflow</p>{canUpdate?<><div style={css.detailGrid}>
        <label><span style={css.label}>Status</span><select style={{...css.input,width:'100%'}} value={String(edit.status||selected.status)} onChange={e=>setEdit(v=>({...v,status:e.target.value}))}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
        <label><span style={css.label}>Assignee</span><input style={{...css.input,width:'100%'}} value={String(edit.assignee||'')} onChange={e=>setEdit(v=>({...v,assignee:e.target.value}))}/></label>
        <label><span style={css.label}>Follow-up</span><input style={{...css.input,width:'100%'}} type="datetime-local" value={typeof edit.follow_up_at==='string'?edit.follow_up_at.slice(0,16):''} onChange={e=>setEdit(v=>({...v,follow_up_at:e.target.value||null}))}/></label>
        <div/>
      </div>
      <label style={{display:'block',marginTop:14}}><span style={css.label}>Internal notes</span><textarea style={css.textarea} value={String(edit.internal_notes||'')} onChange={e=>setEdit(v=>({...v,internal_notes:e.target.value}))}/></label>
      <label style={{display:'block',marginTop:14}}><span style={css.label}>Workflow note / audit comment</span><textarea style={{...css.textarea,minHeight:70}} value={String(edit.note||'')} onChange={e=>setEdit(v=>({...v,note:e.target.value}))}/></label>
      <button onClick={save} disabled={saving} style={{...css.button,height:42,marginTop:14}}>{saving?'Saving…':'Save workflow update'}</button></>:<div style={{...css.card,fontSize:12,color:'#60778a'}}>Read-only access. This administrator does not have permission to update inquiry workflow records.</div>}</div>
      <div style={{marginTop:28}}><p style={css.eyebrow}>Workflow history</p><div style={css.history}>{history.map(h=><div key={h.documentId}><strong style={{fontSize:12}}>{h.previous_status||'—'} → {h.new_status}</strong><div style={{fontSize:11,color:'#60778a'}}>{new Date(h.changed_at).toLocaleString()} · {h.changed_by||'system'}</div>{h.note&&<div style={{fontSize:12,marginTop:4}}>{h.note}</div>}</div>)}{!history.length&&<div style={{fontSize:12,color:'#718699'}}>No workflow history yet.</div>}</div></div>
    </aside></>}
  </main></Page.Protect>;
}
