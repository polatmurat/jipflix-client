import {
  BsCardList,
  BsPeople,
  BsXCircle,
  BsFilm,
  BsBell,
} from "react-icons/bs";
import { PiBroadcast } from "react-icons/pi";
import { RiMovie2Line } from "react-icons/ri";
import { VscBracketError } from "react-icons/vsc";

import { Link } from "react-router-dom";

const Sidebar = ({ side, closeSidebar }) => {
  return (
    <div
      className={`fixed z-10 top-0 ${side} sm:left-0  w-64 h-screen bg-palette1 transition-all ease-in-out duration-200`}
    >
      <Link to="/dashboard/movies">
        <img src="/logo-light.png" alt="Logo" />
      </Link>
      <ul className="mt-3">
        <li className="px-4 py-3 transition-all text-white flex items-center justify-center sm:hidden">
          <BsXCircle
            className="mr-2 text-3xl inline-block cursor-pointer"
            onClick={closeSidebar}
          />
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <BsFilm className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/movies" className="text-base capitalize">
            Movies
          </Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <BsCardList className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/categories" className="text-base capitalize">
            Genres
          </Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <RiMovie2Line className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/directors" className="text-base capitalize">Directors</Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <BsPeople className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/users" className="text-base capitalize">Users</Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <BsBell className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/send-notification" className="text-base capitalize">Send Notification</Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <PiBroadcast className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/send-notification" className="text-base capitalize">Broadcast</Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <VscBracketError className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/logs/error" className="text-base capitalize">Logs</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;