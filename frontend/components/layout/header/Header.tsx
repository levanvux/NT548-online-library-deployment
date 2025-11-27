"use client";

import Link from "next/link";
import Image from "next/image";
import Dropdown from "./Dropdown";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { useUser } from "@/app/UserProvider";

export default function Header() {
  const { user, loaded } = useUser();
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white shadow-sm">
      {/* Logo */}
      <Link
        href="/"
        className="mb-2 sm:mb-0 cursor-pointer bg-green-400 px-3 py-1 text-white font-semibold rounded flex-none"
        title="eShelf"
      >
        Màn Hình Chính
      </Link>

      {/* Right section */}
      <div className="flex flex-row items-center w-full sm:w-auto gap-6">
        <div className="w-full sm:w-auto">
          <SearchBox setIsSearchBoxOpen={setIsSearchBoxOpen} />
        </div>

        <Dropdown />

        {!loaded ? (
          <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
        ) : user ? (
          <Link
            href="/profile"
            className="w-64 flex items-center gap-2 mt-2 sm:mt-0 cursor-pointer"
          >
            <Image
              src="/images/avatars/kitty-avatar.avif"
              alt="avatar"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="underline text-gray-600 hover:text-gray-800 truncate overflow-hidden whitespace-nowrap">
              {user.username}
            </span>
          </Link>
        ) : (
          <Link
            href="/auth"
            className="mt-2 w-52 sm:mt-0 text-blue-600 underline hover:text-blue-500"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
}
