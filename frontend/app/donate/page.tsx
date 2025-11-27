"use client";

import { useState } from "react";

export default function Donate() {
  const [method, setMethod] = useState("scratch");
  const [scratchType, setScratchType] = useState("");
  const [scratchValue, setScratchValue] = useState("");
  const [serial, setSerial] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState("");

  const copy = (text: string, tag: string) => {
    navigator.clipboard.writeText(text);
    setCopied(tag);
    setTimeout(() => setCopied(""), 1500);
  };

  const rechargeScratchCard = () => {
    if (scratchType && scratchValue && serial && code) {
      alert("Giao dịch thành công.\nChúc bạn nhiều sức khoẻ, may mắn!");
      setScratchType("");
      setScratchValue("");
      setSerial("");
      setCode("");
    } else {
      alert("Giao dịch không thành công :(");
    }
  };

  return (
    <div className="w-full px-4 md:px-20 lg:px-32 py-10 text-gray-200 bg-slate-900">
      <p className="text-xl md:text-3xl font-semibold mb-3 text-white">
        Ủng hộ cho eShelf
      </p>

      <p className="text-gray-300 max-w-2xl">
        Chân thành cảm ơn đóng góp của bạn! Sự hỗ trợ của bạn giúp chúng tôi
        phát triển và duy trì hệ thống tốt hơn.
      </p>

      {/* Tabs */}
      <ul className="flex mt-6 text-white text-sm md:text-base">
        {[
          { id: "scratch", label: "Qua thẻ cào" },
          { id: "momo", label: "Qua Momo" },
          { id: "atm", label: "Qua ATM" },
          { id: "paypal", label: "Qua PayPal" },
        ].map((item) => (
          <li
            key={item.id}
            onClick={() => setMethod(item.id)}
            className={`px-4 py-2 md:px-6 cursor-pointer select-none ${
              method === item.id
                ? "bg-slate-700 underline"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            {item.label}
          </li>
        ))}
      </ul>

      {/* Content container */}
      <div className="bg-slate-800 mt-0 rounded-b-lg p-6 md:p-10">
        {/* ================= SCRATCH CARD ================= */}
        {method === "scratch" && (
          <div className="flex flex-col gap-4 text-black">
            <select
              value={scratchType}
              onChange={(e) => setScratchType(e.target.value)}
              className="p-2 rounded"
            >
              <option value="">Chọn loại thẻ</option>
              <option value="viettel">Viettel</option>
              <option value="vinaphone">VinaPhone</option>
              <option value="mobifone">MobiFone</option>
            </select>

            <select
              value={scratchValue}
              onChange={(e) => setScratchValue(e.target.value)}
              className="p-2 rounded"
            >
              <option value="">Chọn mệnh giá thẻ</option>
              {[
                "10k",
                "20k",
                "30k",
                "50k",
                "100k",
                "200k",
                "300k",
                "500k",
                "1000k",
              ].map((v) => (
                <option key={v} value={v}>
                  {v.replace("k", ".000")}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Nhập serial"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              className="p-2 rounded"
            />

            <input
              type="text"
              placeholder="Nhập mã thẻ"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="p-2 rounded"
            />

            <button
              onClick={rechargeScratchCard}
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded w-32"
            >
              Xác nhận
            </button>
          </div>
        )}

        {/* ================= MOMO ================= */}
        {method === "momo" && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <img
              src="/images/random-qr-code.jpg"
              className="h-40 md:h-72 rounded"
              alt="QR Momo"
            />
            <div className="text-white font-semibold">
              <InfoRow
                label="Số điện thoại"
                value="0123456789"
                onCopy={() => copy("0123456789", "momo-sdt")}
                copied={copied === "momo-sdt"}
              />

              <InfoRow
                label="Chủ tài khoản"
                value="Lê Văn Vũ"
                onCopy={() => copy("Lê Văn Vũ", "momo-ten")}
                copied={copied === "momo-ten"}
              />

              <p className="text-gray-300 mt-4">
                <em>Chúng tôi rất cảm kích sự rộng lượng của bạn!</em>
              </p>
            </div>
          </div>
        )}

        {/* ================= ATM ================= */}
        {method === "atm" && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <img
              src="/images/random-qr-code.jpg"
              className="h-40 md:h-72 rounded"
              alt="QR ATM"
            />
            <div className="text-white font-semibold">
              <InfoRow
                label="Số tài khoản"
                value="12345556789"
                onCopy={() => copy("12345556789", "atm-stk")}
                copied={copied === "atm-stk"}
              />

              <InfoRow
                label="Chủ tài khoản"
                value="Lê Văn Vũ"
                onCopy={() => copy("Lê Văn Vũ", "atm-ten")}
                copied={copied === "atm-ten"}
              />

              <p className="text-gray-300 mt-4">
                <em>Chúng tôi rất cảm kích sự rộng lượng của bạn!</em>
              </p>
            </div>
          </div>
        )}

        {/* ================= PAYPAL ================= */}
        {method === "paypal" && (
          <p className="text-center text-white text-lg py-10">
            Bạn có thể ủng hộ qua PayPal:&nbsp;
            <a
              href="https://www.paypal.com/vn/home"
              target="_blank"
              className="text-red-400 underline hover:text-red-200"
            >
              Click here
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

/* Component con gọn đẹp */
function InfoRow({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="relative my-3 w-60 md:w-80">
      <p className="text-red-500">{label}</p>
      <p className="text-white">{value}</p>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
        onClick={onCopy}
      >
        {copied ? "Đã copy" : "Copy"}
      </button>
    </div>
  );
}
