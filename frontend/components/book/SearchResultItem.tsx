"use client";

import { Heart, Bookmark } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SearchResultItem = ({ bookDetail = null }) => {
  const convertText = (input: string) => {
    if (!input) return "";
    return input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/\s+/g, "")
      .replace(/\&/g, "-");
  };

  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);

  if (!bookDetail || !bookDetail.coverUrl || !bookDetail.title) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-4 px-4 py-5 relative">
      {/* Cover */}
      <Link href={`/book/${bookDetail.isbn}`} className="w-24 flex-shrink-0">
        <Image
          src={bookDetail.coverUrl}
          alt={bookDetail.title}
          className="aspect-[5/7] w-full rounded-sm object-cover drop-shadow-md"
        />
      </Link>

      {/* Info */}
      <div className="relative flex-grow">
        {/* Title */}
        <p className="font-semibold">
          <Link href={`/book/${bookDetail.isbn}`} className="underline">
            {bookDetail.title}
          </Link>
        </p>

        {/* Publisher */}
        {bookDetail.publisher && (
          <p>
            <Link
              href={`/search/${convertText(bookDetail.publisher)}&-&`}
              className="text-sm text-gray-400 hover:text-blue-700"
            >
              {bookDetail.publisher}
            </Link>
          </p>
        )}

        {/* Authors */}
        <p className="mt-2 text-[0.925rem] text-sky-400">
          {bookDetail.author && bookDetail.author.length > 0 ? (
            bookDetail.author.map((au, index) => (
              <Link
                key={index}
                href={`/search/${convertText(au)}&-&`}
                className="hover:underline"
              >
                {au}
                {index < bookDetail.author.length - 1 && ", "}
              </Link>
            ))
          ) : (
            <span className="hover:underline">Tác giả ẩn danh</span>
          )}
        </p>

        {/* Heart & Bookmark */}
        <Heart
          onClick={() => setIsHeartClicked(!isHeartClicked)}
          className={`absolute right-12 top-0 cursor-pointer ${
            isHeartClicked
              ? "text-sky-400"
              : "text-gray-400 hover:text-gray-500"
          }`}
          fill={isHeartClicked ? "#38bdf8" : "#fff"}
        />
        <Bookmark
          onClick={() => setIsBookmarkClicked(!isBookmarkClicked)}
          className={`absolute right-4 top-0 cursor-pointer ${
            isBookmarkClicked
              ? "text-amber-400"
              : "text-gray-400 hover:text-gray-500"
          }`}
          fill={isBookmarkClicked ? "#fbbf24" : "#fff"}
        />

        {/* Additional info */}
        <p className="absolute bottom-0 right-0 text-[0.925rem] text-gray-500">
          {bookDetail.year && (
            <>
              Năm: <span className="mr-4 text-gray-800">{bookDetail.year}</span>
            </>
          )}
          {bookDetail.language && (
            <>
              Ngôn ngữ:{" "}
              <span className="mr-4 text-gray-800">{bookDetail.language}</span>
            </>
          )}
          {bookDetail.extension && bookDetail.size && (
            <>
              File:{" "}
              <span className="mr-4 text-gray-800">
                {bookDetail.extension}, {bookDetail.size}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default SearchResultItem;
