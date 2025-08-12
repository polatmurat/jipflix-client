import {
  BsCardList,
  BsBagCheck,
  BsPeople,
  BsXCircle,
  BsBarChart,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = ({ side, closeSidebar }) => {
  return (
    <div
      className={`fixed z-10 top-0 ${side} sm:left-0  w-64 h-screen bg-palette1 transition-all ease-in-out duration-200`}
    >
      <div>
        <img src="/logo.png" alt="Logo" />
      </div>
      <ul className="mt-3">
        <li className="px-4 py-3 transition-all text-white flex items-center justify-center sm:hidden">
          <BsXCircle
            className="mr-2 text-3xl inline-block cursor-pointer"
            onClick={closeSidebar}
          />
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <BsCardList className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/products" className="text-base capitalize">
            Products
          </Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <BsBagCheck className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/products" className="text-base capitalize">
            Orders
          </Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <BsPeople className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/products" className="text-base capitalize">
            Customers
          </Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <BsBarChart className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/categories" className="text-base capitalize">
            Categories
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
