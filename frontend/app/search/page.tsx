import Logo from "@/components/common/Logo";
import SearchForm from "@/components/book/SearchForm";
import SearchResultItem from "@/components/book/SearchResultItem";
import { normalize } from "@/utils/text";
import { getBooks } from "@/utils/api";

interface PageProps {
  params: { searchvalues?: string };
}

const searchByKeyword = (keyword: string, bookDetail: any) => {
  return (
    (keyword !== "" &&
      bookDetail?.title &&
      normalize(bookDetail.title).includes(keyword)) ||
    bookDetail?.author?.some((au: string) => normalize(au).includes(keyword)) ||
    (bookDetail?.publisher && normalize(bookDetail.publisher).includes(keyword))
  );
};

const searchByTimes = (times: string[], bookDetail: any) => {
  return (
    bookDetail?.year &&
    times.length > 0 &&
    ((times[0] !== "" && bookDetail.year >= Number(times[0])) ||
      (times[1] !== "" && bookDetail.year <= Number(times[1])))
  );
};

const searchByGenres = (searchGenres: string[], bookDetail: any) => {
  return (
    bookDetail?.genres &&
    searchGenres.length > 0 &&
    searchGenres.some((searchGenre) =>
      bookDetail.genres.some((genre: string) =>
        normalize(genre).includes(searchGenre)
      )
    )
  );
};

export default async function SearchResult({ params }: PageProps) {
  const searchValues = params.searchvalues
    ? params.searchvalues.split("&")
    : [];
  const times = searchValues[1] ? searchValues[1].split("-") : [];
  const searchGenres = searchValues[2] ? searchValues[2].split("+") : [];

  const bookDetails = await getBooks();

  const matchedBookDetails =
    bookDetails && searchValues.length > 0
      ? bookDetails.filter((bookDetail: any) => {
          return (
            searchByKeyword(searchValues[0], bookDetail) ||
            searchByTimes(times, bookDetail) ||
            searchByGenres(searchGenres, bookDetail)
          );
        })
      : [];

  return (
    <div className="mt-8 md:mt-12 lg:mt-16 px-4">
      <Logo fontSize="text-7xl" />
      <SearchForm isSearchResultPage={true} />
      <p
        className={`relative top-px ml-0 md:ml-24 mt-10 inline-block border border-b-0 border-gray-400 bg-white px-4 py-1 text-lg text-teal-800 ${
          matchedBookDetails.length === 0 ? "mb-60 border-b" : ""
        }`}
      >
        Tìm thấy {matchedBookDetails.length} cuốn sách
      </p>

      {matchedBookDetails.length > 0 && (
        <div className="mx-0 md:mx-24 lg:mx-44 mb-6 border border-b-0 border-gray-400 bg-white">
          {matchedBookDetails.map((bookDetail: any) => (
            <div className="border-b border-gray-400" key={bookDetail.id}>
              <SearchResultItem bookDetail={bookDetail} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
