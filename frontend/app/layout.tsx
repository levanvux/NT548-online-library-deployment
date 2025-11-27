import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { UserProvider } from "./UserProvider";
import "./globals.css";

export const metadata = {
  title: "eShelf",
  description: "An online library app",
  icons: {
    icon: "/images/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-slate-50 antialiased">
        <UserProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </UserProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
