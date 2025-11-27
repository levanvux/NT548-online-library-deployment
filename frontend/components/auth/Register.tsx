"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useUser } from "@/app/UserProvider";

export default function Register({
  setAuthProcess,
}: {
  setAuthProcess: (value: string) => void;
}) {
  const router = useRouter();
  const { setUser } = useUser();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const validateAccount = () => {
    if (!username || !email || !password || !passwordAgain)
      return toast.error("Vui lòng nhập đầy đủ thông tin.");

    const warnings: string[] = [];

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      warnings.push(
        "Tên tài khoản phải dài từ 3 đến 20 ký tự, chỉ chứa chữ, số và _."
      );
    }
    if (!/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email)) {
      warnings.push("Email không hợp lệ.");
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,50}$/.test(
        password
      )
    ) {
      warnings.push(
        "Mật khẩu dài 8 ký tự trở lên, phải có chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
    }
    if (password !== passwordAgain) {
      warnings.push("Nhập lại mật khẩu không khớp.");
    }

    if (warnings.length) {
      warnings.forEach((w) => toast.error(w));
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateAccount()) return;

    try {
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Đăng ký không thành công.");
        return;
      }

      toast.success("Đăng ký thành công!");

      const user = {
        username: data.username,
        email: data.email,
        role: data.role,
        isActive: data.isActive,
      };

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Gửi yêu cầu không thành công.");
    }
  };

  return (
    <>
      <p className="text-2xl opacity-90">Đăng Ký</p>

      <input
        type="text"
        placeholder="Tên tài khoản"
        className="w-full border border-gray-300 p-2 text-gray-800 focus:outline-none"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 p-2 text-gray-800 focus:outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Mật khẩu"
          className="w-full border border-gray-300 p-2 pr-10 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isPasswordVisible ? (
          <Eye
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer"
            onClick={() => setIsPasswordVisible(false)}
          />
        ) : (
          <EyeOff
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setIsPasswordVisible(true)}
          />
        )}
      </div>

      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Nhập lại mật khẩu"
          className="w-full border border-gray-300 p-2 pr-10 focus:outline-none"
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
      </div>

      <button
        className="block w-full bg-sky-500 py-1 mt-2 text-white hover:bg-sky-400"
        onClick={handleRegister}
      >
        Đăng ký
      </button>

      <div className="flex gap-2 mt-3 justify-center">
        <p className="text-gray-600">Bạn đã có tài khoản?</p>
        <p
          onClick={() => setAuthProcess("login")}
          className="cursor-pointer underline text-sky-600"
        >
          Đăng nhập
        </p>
      </div>
    </>
  );
}
