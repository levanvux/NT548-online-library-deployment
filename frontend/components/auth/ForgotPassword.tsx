"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ForgotPassword({
  setAuthProcess,
}: {
  setAuthProcess: (value: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSendRequest = async () => {
    if (!email) return toast.error("Bạn phải nhập email");

    try {
      const res = await fetch("http://localhost:4000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Gửi yêu cầu không thành công.");
        return;
      }

      toast.success("Yêu cầu đặt lại mật khẩu đã được gửi!");
      setIsSent(true);
    } catch (err) {
      console.error(err);
      toast.error("Gửi yêu cầu không thành công.");
    }
  };

  return (
    <>
      {!isSent ? (
        <p className="text-xl opacity-90">Nhập email để khôi phục mật khẩu</p>
      ) : (
        <p className="text-center text-xl opacity-90">
          Chúng tôi đã nhận được yêu cầu của bạn.
          <br />
          Vui lòng kiểm tra email để tiếp tục khôi phục mật khẩu.
        </p>
      )}

      {!isSent && (
        <input
          type="email"
          placeholder="Nhập email của bạn"
          className="w-full mt-3 border border-gray-300 p-2 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      {!isSent && (
        <button
          className="block mt-4 bg-sky-500 py-1 text-white hover:bg-sky-400 w-full"
          onClick={handleSendRequest}
        >
          Gửi yêu cầu
        </button>
      )}

      <div className="flex gap-2 mt-4 justify-center">
        <p className="text-gray-600">Bạn nhớ mật khẩu?</p>
        <p
          className="cursor-pointer underline text-sky-600"
          onClick={() => setAuthProcess("login")}
        >
          Đăng Nhập
        </p>
      </div>

      <div className="flex gap-2 mt-2 justify-center">
        <p className="text-gray-600">Bạn chưa có tài khoản?</p>
        <p
          className="cursor-pointer underline text-sky-600"
          onClick={() => setAuthProcess("register")}
        >
          Đăng Ký
        </p>
      </div>
    </>
  );
}
