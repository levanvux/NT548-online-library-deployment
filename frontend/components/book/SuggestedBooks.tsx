"use client";

import Link from "next/link";
import Image from "next/image";
import { Book } from "@/types/book";

type SuggestedBooksProps = {
  heading: string;
  bookDetails: Book[];
};

export default function SuggestedBooks({
  heading,
  bookDetails = [],
}: SuggestedBooksProps) {
  return (
    <>
      <p className="mb-5 border-b-2 border-b-sky-400 pb-2 text-xl text-sky-400">
        {heading}
      </p>

      <div className="mb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {bookDetails.map((book, index) => (
          <Link
            href={`/book/${book.isbn}`}
            key={`${book.isbn}-${index}`}
            className="relative w-full aspect-5/7 cursor-pointer"
          >
            <Image
              src={book.coverUrl}
              fill
              className="rounded-sm object-cover drop-shadow-md"
              alt={book.title}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
