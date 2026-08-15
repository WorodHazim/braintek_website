import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const uidToCollection: Record<string,string> = {
  'api::page.page':'pages',
  'api::service.service':'services',
  'api::sector.sector':'sectors',
  'api::product.product':'products',
  'api::resource.resource':'resources',
  'api::team-member.team-member':'team-members',
  'api::partner.partner':'partners'
};
const collectionToBase: Record<string,string> = {
  services:'/services', sectors:'/sectors', products:'/platforms-products', resources:'/insights-resources'
};

export async function GET(req:NextRequest){
  const secret=req.nextUrl.searchParams.get('secret')||'';
  if(!process.env.PREVIEW_SECRET || secret!==process.env.PREVIEW_SECRET) return new NextResponse('Invalid preview token',{status:401});

  const uid=req.nextUrl.searchParams.get('uid')||'';
  const documentId=req.nextUrl.searchParams.get('documentId')||'';
  const collection=uidToCollection[uid];
  if(!collection || !documentId) return new NextResponse('Invalid preview request',{status:400});

  const cms=process.env.STRAPI_URL||process.env.NEXT_PUBLIC_STRAPI_URL||'http://localhost:1337';
  const requestHeaders: HeadersInit = process.env.STRAPI_API_TOKEN ? { Authorization:`Bearer ${process.env.STRAPI_API_TOKEN}` } : {};
  try{
    const res=await fetch(`${cms}/api/${collection}/${encodeURIComponent(documentId)}?status=draft`,{headers:requestHeaders,cache:'no-store'});
    if(!res.ok) return new NextResponse('Preview content not found',{status:404});
    const json=await res.json();
    const record=json?.data;
    const dm=await draftMode(); dm.enable();
    if(collection==='pages'){
      const path=record?.slug==='home' || record?.page_type==='home' ? '/' : `/${record?.slug || ''}`;
      return NextResponse.redirect(new URL(path,req.url));
    }
    if(collection==='team-members') return NextResponse.redirect(new URL('/expert-team',req.url));
    if(collection==='partners') return NextResponse.redirect(new URL('/partners',req.url));
    const base=collectionToBase[collection];
    if(record?.slug && base) return NextResponse.redirect(new URL(`${base}/${record.slug}`,req.url));
  }catch{}
  return new NextResponse('Unable to enable preview',{status:500});
}
