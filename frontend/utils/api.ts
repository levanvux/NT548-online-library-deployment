export const getBooks = async () => {
  const res = await fetch("http://localhost:4000/books", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
};
