"use client";

import { useSearchParams } from "next/navigation";

export default function Reading() {
  const params = useSearchParams();
  const src = params.get("src") || "/pdfs/lorem-ipsum.pdf";

  return (
    <iframe
      src={src}
      className="w-screen h-screen"
      style={{ border: "none" }}
    />
  );
}
