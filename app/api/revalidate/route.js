import {isValidSignature, SIGNATURE_HEADER_NAME} from '@sanity/webhook'
const secret = process.env.REVALIDATION_SECRET

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache'; 

export async function POST(request) {
  try {
    const signature = request.headers[SIGNATURE_HEADER_NAME]
    const body = await readBody(req) // Read the body into a string
    if (!(await isValidSignature(body, signature, secret))) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    revalidatePath('/')
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
