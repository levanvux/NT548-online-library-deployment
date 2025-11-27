"use client";

import { useState, useEffect } from "react";

import { Quote } from "@/types/quote";

export default function Quote() {
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/quotes/random", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setRandomQuote(data))
      .catch((e) => console.error(e));
  }, []);

  if (!randomQuote) return null;

  return (
    <div className="mx-auto mt-4 w-4/5 text-center text-sm italic text-gray-600 md:w-2/5">
      <p>“{randomQuote.quote}”</p>
      <p className="text-right">&#65123;{randomQuote.author}</p>
    </div>
  );
}
