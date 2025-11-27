import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineWechat,
  AiFillYoutube,
  AiFillGithub,
} from "react-icons/ai";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-300 text-gray-400">
      <div className="grid grid-cols-1 items-center gap-2 py-4 text-center text-sm sm:grid-cols-3 sm:gap-0">
        <span className="mb-2 select-none sm:mb-0">© {year} eShelf.</span>

        <span className="mb-2 cursor-pointer select-none sm:mb-0">
          Điều khoản · Chính sách
        </span>

        <div className="flex justify-center gap-3 sm:gap-4">
          <AiFillFacebook
            className="cursor-pointer hover:text-gray-500"
            size={24}
          />
          <AiFillInstagram
            className="cursor-pointer hover:text-gray-500"
            size={24}
          />
          <AiOutlineWechat
            className="cursor-pointer hover:text-gray-500"
            size={24}
          />
          <AiFillYoutube
            className="cursor-pointer hover:text-gray-500"
            size={24}
          />
          <a
            href="https://github.com/levanvux/eShelf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub className="hover:text-gray-500" size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
