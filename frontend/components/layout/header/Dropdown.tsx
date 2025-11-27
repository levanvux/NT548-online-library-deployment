"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Menu,
  X,
  List,
  CircleDollarSign,
  MessageSquareWarning,
  LogOut,
} from "lucide-react";
import { useUser } from "@/app/UserProvider";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { user, setUser } = useUser();
  const router = useRouter();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm("Bạn có chắc muốn đăng xuất?");
    if (!confirmed) return;

    try {
      await fetch("http://localhost:4000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");

      setUser(null);

      setIsOpen(false);

      toast.success("Đã đăng xuất thành công!");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`
          flex h-10 w-10 
          items-center justify-center 
          text-black opacity-70 
          transition-all duration-300 
          hover:opacity-100
          ${isOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"}
        `}
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white text-gray-800 shadow-lg">
          <Link
            href="/genres"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 hover:bg-black hover:text-white"
          >
            <List className="mr-3 inline" />
            Thể Loại
          </Link>

          <Link
            href="/feedback"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 hover:bg-black hover:text-white"
          >
            <MessageSquareWarning className="mr-3 inline" />
            Báo Lỗi
          </Link>

          <Link
            href="/donate"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 hover:bg-black hover:text-white"
          >
            <CircleDollarSign className="mr-3 inline" />
            Ủng Hộ
          </Link>

          <div className="my-1 border-t border-gray-200"></div>

          {user && (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-black hover:text-white flex items-center"
            >
              <LogOut className="mr-3" />
              Đăng Xuất
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
