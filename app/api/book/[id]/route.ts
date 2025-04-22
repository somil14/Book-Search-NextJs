// app/api/book/[id]/route.ts
import { books } from '@/app/data/books';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const book = books.find((b) => b.id === Number(params.id));

  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }

  return NextResponse.json(book);
}