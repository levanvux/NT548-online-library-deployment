"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { ArrowLeft, Download, Bookmark, Play } from "lucide-react";
import SuggestedBooks from "@/components/book/SuggestedBooks";
import { Book } from "@/types/book";
import { useUser } from "@/app/UserProvider";

export default function BookDetailPage() {
  const router = useRouter();
  const { isbn } = useParams();

  const [book, setBook] = useState<any>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user, loaded } = useUser();

  const toggleBookmark = async () => {
    const bookId = book.id;

    try {
      const method = isBookmarked ? "DELETE" : "POST";

      const res = await fetch(`http://localhost:4000/bookmarks/${bookId}`, {
        method,
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi kết nối server");
    }
  };

  // FETCH BOOK INFO
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:4000/books/${isbn}`);
        if (!res.ok) {
          toast.error("Không thể tải dữ liệu sách");
          return;
        }
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
        toast.error("Lỗi kết nối server");
      }
    };

    fetchBook();
  }, [isbn]);

  // FETCH RELATED BOOKS
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(`http://localhost:4000/books?limit=60`);
        const data = await res.json();
        setRelatedBooks(data);
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải sách gợi ý");
      }
    };

    fetchRelated();
  }, [isbn]);

  if (!book) {
    return <p className="px-4 py-10 text-gray-600">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="px-4 md:px-16 lg:px-24">
      {/* Back */}
      <p
        className="my-4 flex cursor-pointer gap-1 text-gray-700"
        onClick={() => router.back()}
      >
        <ArrowLeft /> <span className="hover:underline">Quay Lại</span>
      </p>

      <div className="mb-32">
        <div className="flex flex-col md:flex-row">
          {/* Cover */}
          <Image
            className="rounded-sm object-cover drop-shadow-[0_0.2rem_0.2rem_rgba(0,0,0,0.5)] mb-6 md:mb-0 md:mr-8 mx-auto md:mx-0"
            width={256}
            height={384}
            src={book.coverUrl}
            alt={book.title}
          />

          <div>
            {/* Title */}
            <p className="mb-1 text-xl md:text-2xl text-gray-800">
              {book.title}
            </p>

            {/* Author */}
            <p className="mb-4 text-sm text-sky-400">
              {book.author?.map((name: string, i: number) => (
                <span key={i}>
                  <span className="cursor-pointer underline hover:text-sky-600">
                    {name}
                  </span>
                  {i !== book.author.length - 1 && ", "}
                </span>
              ))}
            </p>

            {/* Bookmark */}
            {!loaded ? (
              <div />
            ) : (
              user && (
                <div className="mb-5 flex items-center gap-2">
                  <Bookmark
                    onClick={toggleBookmark}
                    className={`cursor-pointer ${
                      isBookmarked
                        ? "text-blue-500"
                        : "text-gray-400 hover:text-gray-500"
                    }`}
                    fill={isBookmarked ? "#3b82f6" : "#f9fafb"}
                  />
                  <span
                    className={`text-sm ${
                      isBookmarked ? "text-blue-500" : "text-gray-400"
                    }`}
                  >
                    Đánh dấu
                  </span>
                </div>
              )
            )}

            {/* Description */}
            {book.description && (
              <p className="mb-5 text-sm leading-relaxed text-gray-700">
                <span className="text-gray-500">Giới thiệu:</span>{" "}
                {book.description}
              </p>
            )}

            {/* Info Grid */}
            <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-sm text-gray-700">
              {book.genres?.length > 0 && (
                <p>
                  <span className="text-gray-500">Thể loại:</span>{" "}
                  {book.genres.join(", ")}
                </p>
              )}

              {book.language && (
                <p>
                  <span className="text-gray-500">Ngôn ngữ:</span>{" "}
                  {book.language}
                </p>
              )}

              {book.year && (
                <p>
                  <span className="text-gray-500">Năm:</span> {book.year}
                </p>
              )}

              {book.publisher && (
                <p>
                  <span className="text-gray-500">Nhà xuất bản:</span>{" "}
                  {book.publisher}
                </p>
              )}

              {book.translator?.length > 0 && (
                <p>
                  <span className="text-gray-500">Người dịch:</span>{" "}
                  {book.translator.join(", ")}
                </p>
              )}

              {book.isbn && (
                <p>
                  <span className="text-gray-500">Mã:</span> {book.isbn}
                </p>
              )}

              {book.extension && book.size && (
                <p>
                  <span className="text-gray-500">File:</span> {book.extension},{" "}
                  {book.size}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-6">
              <button
                className="flex items-center justify-center gap-1 rounded bg-sky-400 px-5 py-2 text-white hover:bg-sky-300 w-full sm:w-auto"
                onClick={() => router.push(`/reading/${book.isbn}`)}
              >
                <Play />
                Đọc sách
              </button>

              <button className="flex items-center justify-center gap-1 rounded border border-gray-300 px-5 py-2 text-gray-600 hover:border-sky-400 w-full sm:w-auto">
                <Download />
                Tải xuống
              </button>

              <p
                className="cursor-pointer py-2 text-center text-amber-400 underline hover:text-amber-500"
                onClick={() => router.push("/feedback")}
              >
                Báo cáo lỗi?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested books */}
      <SuggestedBooks
        heading="Bạn có thể sẽ thích"
        bookDetails={relatedBooks}
      />
    </div>
  );
}
