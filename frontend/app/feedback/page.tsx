"use client";

import { useState } from "react";

export default function Feedback() {
  const [errorType, setErrorType] = useState("book");
  const [subType, setSubType] = useState("");
  const [content, setContent] = useState("");

  const bookOptions = [
    "Sách không xem được",
    "Sách sai định dạng",
    "Không đúng với lời giới thiệu",
    "Nội dung không phù hợp",
    "Khác",
  ];

  const accountOptions = ["Tài khoản bị khoá", "Mất dữ liệu cá nhân", "Khác"];

  const donateOptions = [
    "Thanh toán không đúng số tiền",
    "Chưa được hệ thống công nhận",
    "Khác",
  ];

  const getSubOptions = () => {
    if (errorType === "book") return bookOptions;
    if (errorType === "account") return accountOptions;
    if (errorType === "donate") return donateOptions;
    return [];
  };

  const handleSubmit = () => {
    if (!content) {
      alert("Vui lòng nhập nội dung chi tiết");
      return;
    }
    if (confirm("Bạn có chắc muốn gửi không?")) {
      setContent("");
      setSubType("");
      alert("Đã gửi phản hồi!");
    }
  };

  return (
    <div className="w-full px-4 md:px-20 py-10 text-gray-800">
      <div className="mx-auto max-w-4xl border-2 border-sky-400 rounded-xl p-6 flex flex-col gap-6">
        <h1 className="text-center text-2xl md:text-3xl font-semibold text-sky-400">
          GỬI PHẢN HỒI CHO CHÚNG TÔI
        </h1>

        {/* Loại lỗi */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <label className="w-40 text-right md:block hidden">Loại lỗi:</label>
          <label className="md:hidden font-medium">Loại lỗi:</label>

          <select
            value={errorType}
            onChange={(e) => setErrorType(e.target.value)}
            className="w-full md:w-[20rem] p-2 rounded border"
          >
            <option value="book">Lỗi sách</option>
            <option value="account">Lỗi tài khoản</option>
            <option value="donate">Lỗi donate - ủng hộ</option>
            <option value="other">Khác</option>
          </select>

          {errorType !== "other" && (
            <select
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
              className="w-full md:w-[20rem] p-2 rounded border"
            >
              <option value="">-- Chọn chi tiết lỗi --</option>
              {getSubOptions().map((op) => (
                <option key={op}>{op}</option>
              ))}
            </select>
          )}
        </div>

        {/* Nội dung chi tiết */}
        <div className="flex flex-col md:flex-row gap-3">
          <label className="w-40 text-right md:block hidden">
            <span className="text-red-600">*</span> Nội dung chi tiết:
          </label>

          <label className="md:hidden font-medium">
            <span className="text-red-600">*</span> Nội dung chi tiết:
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-36 border rounded p-2"
          />
        </div>

        <button
          className="self-center bg-teal-500 hover:bg-teal-400 text-white px-8 py-2 rounded text-xl"
          onClick={handleSubmit}
        >
          Gửi
        </button>
      </div>

      {/* Thông tin liên hệ */}
      <div className="max-w-4xl mx-auto mt-8 leading-7">
        <p className="text-xl font-semibold">Thông tin liên hệ:</p>
        <p>
          <span className="text-gray-500">Địa chỉ:</span> Toà nhà Chọc Trời,
          TP.HCM, Việt Nam
        </p>
        <p>
          <span className="text-gray-500">Số điện thoại:</span> 0123456789
        </p>
        <p>
          <span className="text-gray-500">Email:</span>{" "}
          <span className="text-sky-400 hover:underline cursor-pointer">
            deptrai@gmail.com
          </span>
        </p>
      </div>
    </div>
  );
}
