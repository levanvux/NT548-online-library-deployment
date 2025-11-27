export type Book = {
  isbn: string;
  title: string;
  coverUrl: string;
  genres?: string[];
  year?: number;
  language?: string;
  pages?: number;
  publisher?: string;
  authors?: string[];
  translators?: string[];
  pdfUrl?: string;
};
