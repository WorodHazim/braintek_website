import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req:NextRequest){const dm=await draftMode();dm.disable();return NextResponse.redirect(new URL('/',req.url));}
