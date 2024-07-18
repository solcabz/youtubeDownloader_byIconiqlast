import { Link } from "react-router-dom";
import * as Icon from "react-feather";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-stone-800 text-white font-share-tech">
      <h1 className="text-9xl">404</h1>
      <p className="text-7xl">Page not found</p>
      <Link
        to="/"
        className="border-orange-400 rounded-lg border px-8 py-3 mt-4 flex gap-2 justify-center items-center bg-amber-500 hover:bg-amber-700"
      >
        <Icon.Home size={16} /> HOME
      </Link>
    </div>
  );
};

export default Unauthorized;
