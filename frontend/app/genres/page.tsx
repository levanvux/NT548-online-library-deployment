"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { normalize } from "@/utils/text";

interface Genre {
  id: number;
  name: string;
}

const Genres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [bookDetails, setBookDetails] = useState<any[]>([]);
  const [searchGenre, setSearchGenre] = useState("");
  const [filteredGenres, setFilteredGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const genresRes = await fetch("http://localhost:4000/genres");
        const booksRes = await fetch("http://localhost:4000/books");

        const genresData = await genresRes.json();
        const booksData = await booksRes.json();

        setGenres(genresData);
        setFilteredGenres(genresData);
        setBookDetails(booksData);
      } catch (error) {
        console.log("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const handleSearch = (term: string) => {
    setSearchGenre(term);
    const normalized = normalize(term.trim());

    const result = genres.filter((genre) =>
      normalize(genre.name).includes(normalized)
    );

    setFilteredGenres(result);
  };

  const countBooksByGenre = (genreName: string) => {
    return bookDetails.filter(
      (book) => book.genres && book.genres.includes(genreName)
    ).length;
  };

  return (
    <div className="px-12 md:px-44 py-8">
      {/* Breadcrumb */}
      <p className="mb-8 cursor-default text-sm text-gray-400">
        <Link className="cursor-pointer text-sky-400" href="/">
          Trang Chính
        </Link>
        {" > "}
        <span className="cursor-pointer">Thể Loại</span>
      </p>

      {/* Header + Search */}
      <div className="mb-3 flex flex-wrap justify-between">
        <h1 className="text-2xl font-bold text-gray-700">Tất Cả Thể Loại</h1>

        <input
          type="text"
          value={searchGenre}
          onChange={(e) => handleSearch(e.target.value)}
          className="mt-3 w-64 rounded-sm border border-gray-300 px-3 py-1 text-gray-500 focus:outline-none md:mt-0"
          placeholder="Tìm kiếm thể loại"
        />
      </div>

      {/* Genres List */}
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
        {filteredGenres.map((genre) => (
          <Link
            href={`/genre/${encodeURIComponent(genre.name)}`}
            className="text-gray-600 hover:text-sky-400"
            key={genre.id}
          >
            {genre.name}{" "}
            <span className="text-sm italic text-gray-400">
              ({countBooksByGenre(genre.name)})
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genres;
