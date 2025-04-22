import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Book } from '@/app/types/books';

const jsonPath = path.join(process.cwd(), 'app/data/books.json');
const tsPath = path.join(process.cwd(), 'app/data/books.ts');

export async function POST(request: Request) {
  const newBook: Omit<Book, 'id'> = await request.json();

  // Read existing books
  const fileData = fs.readFileSync(jsonPath, 'utf-8');
  const books: Book[] = JSON.parse(fileData);

  // Assign a new ID (max + 1 strategy)
  const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
  const bookWithId: Book = { id: newId, ...newBook };

  // Push and save
  books.push(bookWithId);

  // Save to JSON
  fs.writeFileSync(jsonPath, JSON.stringify(books, null, 2), 'utf-8');

  // Save to TS file (for generateStaticParams to pick up)
  const tsContent = `import { Book } from '@/app/types/books';

export const books: Book[] = ${JSON.stringify(books, null, 2)};
`;
  fs.writeFileSync(tsPath, tsContent, 'utf-8');

  return NextResponse.json({ message: 'Book added successfully', book: bookWithId });
}
