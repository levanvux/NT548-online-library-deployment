"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

type SearchBoxProps = {
  setIsSearchBoxOpen: (open: boolean) => void;
};

export default function SearchBox({ setIsSearchBoxOpen }: SearchBoxProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  const convertText = (term: string): string => {
    return term
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/\s+/g, "")
      .replace(/\+/g, "-");
  };

  const openSearch = () => {
    setIsEditing(true);
    setIsSearchBoxOpen(true);
  };

  // Click outside handler
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    if (searchBoxRef.current && !searchBoxRef.current.contains(target)) {
      setIsEditing(false);
      setIsSearchBoxOpen(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {isEditing ? (
        <div
          ref={searchBoxRef}
          className="flex items-center gap-2 rounded border bg-white px-2 py-1 w-full sm:w-auto"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-gray-800 focus:outline-none"
            placeholder="Tìm kiếm sách"
          />

          <Link
            href={`/search/${convertText(searchTerm)}&-&`}
            className="flex items-center justify-center rounded p-1 hover:bg-gray-300"
          >
            <Search size={20} color="#666" />
          </Link>
        </div>
      ) : (
        <button
          className="flex items-center justify-center text-black opacity-70 hover:opacity-100"
          onClick={openSearch}
        >
          <Search size={32} />
        </button>
      )}
    </>
  );
}
