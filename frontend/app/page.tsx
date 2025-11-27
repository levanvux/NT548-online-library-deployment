"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SearchForm from "@/components/book/SearchForm";
import SuggestedBooks from "@/components/book/SuggestedBooks";
import Logo from "@/components/common/Logo";
import Quote from "@/components/common/Quote";
import { Book } from "@/types/book";

export default function Home() {
  const [bookDetails, setBookDetails] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch("http://localhost:4000/books?limit=120", {
          cache: "no-store",
        });
        const data = await res.json();
        setBookDetails(data);
      } catch (err) {
        console.error(err);
        toast.error("Đã có lỗi xảy ra khi tải sách.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, []);

  return (
    <div className="px-4 md:px-24 lg:px-44">
      <div className="mt-12 md:mt-20 lg:mt-24 text-center">
        <Logo fontSize="text-7xl" />
        <Quote />
      </div>

      <div className="mt-12">
        <SearchForm />
      </div>

      <div className="mt-16">
        {loading ? (
          <p>Đang tải sách...</p>
        ) : (
          <SuggestedBooks heading="Tủ sách gợi ý" bookDetails={bookDetails} />
        )}
      </div>
    </div>
  );
}
