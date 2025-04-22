// app/api/search/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Book } from '@/app/types/books';

const dataFilePath = path.join(process.cwd(), 'app/data/books.json');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.toLowerCase() || '';

  const fileData = fs.readFileSync(dataFilePath, 'utf-8');
  const books: Book[] = JSON.parse(fileData);

  const result = books.filter((book: Book) =>
    book.title.toLowerCase().includes(query)
  );

  return NextResponse.json(result);
}
