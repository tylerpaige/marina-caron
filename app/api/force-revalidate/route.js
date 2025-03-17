import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache'; 

export async function POST(request) {
  try {
    revalidatePath('/')
    revalidatePath('/exhibitions')
    revalidatePath('/publications')
    revalidatePath('/writing')
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
