"use client";

import Select, { MultiValue } from "react-select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Option = { value: string; label: string };

interface SearchFormProps {
  isSearchResultPage?: boolean;
  genres?: string[];
}

export default function SearchForm({
  isSearchResultPage = false,
  genres = [],
}: SearchFormProps) {
  const router = useRouter();

  const [genresArray, setGenresArray] = useState<string[]>([]);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch("http://localhost:4000/genres");
        const data = await res.json();
        setGenresArray(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGenres();
  }, []);

  const [searchValue, setSearchValue] = useState<string>("");
  const [fromYear, setFromYear] = useState<string>("");
  const [toYear, setToYear] = useState<string>("");
  const [advancedSearch, setAdvancedSearch] = useState<boolean>(
    genres.length > 0 || isSearchResultPage
  );
  const [selectedLanguages, setSelectedLanguages] = useState<Option[] | null>(
    null
  );
  const [selectedGenres, setSelectedGenres] = useState<Option[] | null>(
    genres.length > 0 ? genres.map((g) => ({ value: g, label: g })) : null
  );

  // Options
  const genreOptions: Option[] = genresArray.map((genre) => ({
    value: genre,
    label: genre,
  }));

  const languageOptions: Option[] = [
    { value: "Tiếng Anh", label: "Tiếng Anh" },
    { value: "Tiếng Việt", label: "Tiếng Việt" },
  ];

  const convertText = (input: string) => {
    if (!input) return "";
    return input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/\s+/g, "")
      .replace(/\+/g, "-");
  };

  const convertArrayToString = (array: Option[] | null) => {
    if (!array || array.length === 0) return "";
    return array.map((o) => convertText(o.value)).join("+");
  };

  const handleSearch = () => {
    const query = `/search/${convertText(
      searchValue
    )}&${fromYear}-${toYear}&${convertArrayToString(selectedGenres)}`;
    router.push(query);
  };

  return (
    <>
      {/* Search input */}
      <div className="mx-4 mb-2 mt-8 flex border border-gray-400 hover:outline hover:outline-sky-400 md:mx-24 lg:mx-44">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Tìm kiếm theo tên sách, tên tác giả, nxb..."
          className="w-full px-3 text-gray-800 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="border-l border-l-gray-400 bg-gray-200 px-6 py-2 text-gray-600 md:px-12"
        >
          Tìm
        </button>
      </div>

      {/* Advanced search */}
      {advancedSearch ? (
        <div className="mx-4 flex flex-col text-[0.9rem] md:mx-24 md:flex-row lg:mx-44">
          {/* Year range */}
          <div>
            <input
              type="number"
              value={fromYear}
              onChange={(e) => setFromYear(e.target.value)}
              placeholder="Từ năm"
              className="mr-5 w-24 rounded border border-gray-300 px-3 py-[0.42rem] text-gray-800 [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <input
              type="number"
              value={toYear}
              onChange={(e) => setToYear(e.target.value)}
              placeholder="Đến năm"
              className="mr-5 w-24 rounded border border-gray-300 py-[0.42rem] pl-3 pr-2 text-gray-800 [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          {/* Languages */}
          <Select
            value={selectedLanguages}
            onChange={(newValue: MultiValue<Option>) =>
              setSelectedLanguages([...newValue])
            }
            options={languageOptions}
            placeholder="Chọn ngôn ngữ"
            className="w-60 text-gray-800 placeholder-pink-600"
            isMulti
          />

          {/* Genres */}
          <Select
            value={selectedGenres}
            onChange={(newValue: MultiValue<Option>) =>
              setSelectedGenres([...newValue])
            }
            options={genreOptions}
            placeholder="Chọn thể loại"
            className="w-60 text-gray-800 placeholder-pink-600"
            isMulti
          />
        </div>
      ) : (
        <p
          onClick={() => setAdvancedSearch(true)}
          className="ml-4 w-[8.4rem] cursor-pointer border-b border-dashed border-gray-400 text-sm text-gray-400 md:ml-24 lg:ml-44"
        >
          Tìm kiếm nâng cao
        </p>
      )}
    </>
  );
}
