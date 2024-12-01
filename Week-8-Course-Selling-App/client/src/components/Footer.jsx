import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-gray-200 bg-perano-950 text-white font-nunito">
      <p className="text-xs">© 2024 CourseMarket. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs hover:text-perano-200 transition-colors"
          to={"/"}
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs hover:text-perano-200 transition-colors"
          to={"/"}
        >
          Privacy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
