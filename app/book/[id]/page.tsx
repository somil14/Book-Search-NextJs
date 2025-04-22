import { books } from '@/app/data/books';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface BookPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return books.map((book) => ({
    id: String(book.id),
  }));
}

export default async function BookPage({ params }: BookPageProps) {
  const book = books.find((b) => b.id === Number(params.id));

  if (!book) return notFound();

  return (
    <div className="min-h-screen px-6 py-10 md:px-20 lg:px-40 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className=" justify-between items-center mb-6">
        <Link href="/">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-300 cursor-pointer mb-10">📖 BookVerse</h1>
        </Link>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Book Details</h2>
      </div>


        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row gap-8">
          <div className="flex justify-center items-center">
            <Image
              className="rounded-xl shadow-md"
              src={book.image}
              alt={book.title}
              width={300}
              height={400}
              priority
            />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">{book.title}</h3>
          <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 mb-4 italic">by {book.author}</p>
          <p className="text-sm md:text-md text-gray-700 dark:text-gray-400">
            Dive deep into the world of <span className="font-medium">{book.title}</span>, written by the masterful <span className="font-semibold">{book.author}</span>.
            Discover imagination, storytelling, and wisdom wrapped in one engaging read.
          </p>
        </div>
      </div>
    </div>
  );
}