"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Book } from '@/app/types/books';

export default function Home() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await fetch(`/api/search?query=${query}`);
      const data: Book[] = await res.json();

      if (data.length === 0) {
        setError('No books found.');
      } else {
        setError('');
        setBooks(data);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while searching.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-8">
      <div className="max-w-3xl mx-auto text-center">
        <Link href="/">
          <h1 className="text-4xl font-extrabold mb-6 text-blue-700 dark:text-blue-300 cursor-pointer">📖 BookVerse</h1>
        </Link>


        <h5 className="font-semibold mb-8">Try searching <em>Atomic Habbits</em> or <em>Deep Work</em></h5>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex items-center gap-4 justify-center mb-10"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books by title or author..."
            className="w-full max-w-md p-3 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white
            "
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {error && <p className="text-red-500 mb-6">{error}</p>}

        {books.length > 0 && (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
              {books.map((book) => (
                <div key={book.id} className="bg-white dark:bg-gray-700 p-5 rounded-2xl shadow-lg hover:shadow-xl transition">
                  {book.image && (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-48 w-full object-cover rounded-lg mb-4"
                    />
                  )}
                  <Link href={`/book/${book.id}`}>
                    <div className="text-lg font-semibold text-blue-700 dark:text-blue-300 hover:underline cursor-pointer">{book.title}</div>
                  </Link>
                  <p className="text-sm text-blue-600 dark:text-blue-400">by {book.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <Link href="/add-book">
          <button className="mb-6 bg-green-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-green-700 transition">
            ➕ Add New Book
          </button>
        </Link>
      </div>
    </div>
  );
}
