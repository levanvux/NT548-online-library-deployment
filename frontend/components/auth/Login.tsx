"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserProvider";

export default function Login({
  setAuthProcess,
}: {
  setAuthProcess: (value: string) => void;
}) {
  const router = useRouter();
  const { setUser } = useUser();

  const [isPasswordVisible, SetIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEyeClick = () => {
    SetIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Đăng nhập không thành công.");
        return;
      }

      const user = {
        username: data.username,
        email: data.email,
        role: data.role,
        isActive: data.isActive,
      };

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Đăng nhập thành công!");

      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error("Gửi yêu cầu không thành công.");
    }
  };

  return (
    <>
      <p className="text-2xl opacity-90">Đăng Nhập</p>

      <input
        type="text"
        className="w-full border border-gray-300 p-2 text-gray-800 focus:outline-none"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : "password"}
          className="w-full border border-gray-300 p-2 pr-9 focus:outline-none"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isPasswordVisible ? (
          <Eye
            className="absolute right-1 top-1/2 -translate-y-1/2 transform text-gray-800 cursor-pointer"
            onClick={handleEyeClick}
          />
        ) : (
          <EyeOff
            className="absolute right-1 top-1/2 -translate-y-1/2 transform text-gray-500 cursor-pointer"
            onClick={handleEyeClick}
          />
        )}
      </div>

      <button
        className="w-32 text-sm text-gray-600 underline text-left"
        onClick={() => setAuthProcess("forgot-password")}
      >
        Quên mật khẩu?
      </button>

      <button
        className="block w-full bg-sky-500 py-1 text-white hover:bg-sky-400 mt-2 disabled:bg-gray-300"
        onClick={handleLogin}
      >
        Đăng nhập
      </button>

      <div className="flex gap-2 mt-4">
        <p className="text-gray-600">Bạn chưa có tài khoản?</p>

        <button
          onClick={() => setAuthProcess("register")}
          className="flex grow cursor-pointer justify-center rounded-sm border border-gray-300"
        >
          <p>Đăng Ký</p>
        </button>
      </div>
    </>
  );
}
