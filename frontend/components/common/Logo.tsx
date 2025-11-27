import Link from "next/link";

const Logo = ({ fontSize = "text-5xl" }) => {
  return (
    <div className={`flex justify-center ${fontSize} text-gray-500`}>
      <Link
        className="cursor-pointer select-none tracking-wider no-underline"
        href="/"
        title="eShelf"
      >
        <span className="text-sky-400">e</span>Shelf
      </Link>
    </div>
  );
};

export default Logo;
