import { BsBell, BsSearch  } from "react-icons/bs";
import { useListNotificationsQuery } from "../../features/notification/notificationService";
import { skipToken } from '@reduxjs/toolkit/query';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {

  const {userToken, user} = useSelector((state) => state.authReducer)
  const userId = user?.uid;
  const { data: notifResp } = useListNotificationsQuery(userToken && userId ? { userId, page: 0, size: 20 } : skipToken);
  const unreadCount = (notifResp?.result?.items || []).filter(n => !n.read).length;

  return (
    <nav className="w-full h-[70px] flex items-center shadow-md fixed top-0 right-0 left-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              src="./logo-light.png"
              className="h-[70px] w-[130px] rounded-md object-cover"
              alt="logo"
            />
          </Link>
          <ul className="flex items-center">
            <li className="nav__item cursor-pointer">
              <BsSearch size={22} />
            </li>
            {/* <li className="nav__item text-black">
              <Link to="/login" className="nav__link">
                Sign In
              </Link>
            </li> */}
            {userToken ? <li className="nav__item text-black">
              <Link to="/user" className="nav__link">
                {user?.sub}
              </Link>
            </li> : <li className="nav__item text-black">
              <Link to="/login" className="nav__link">
                Sign In
              </Link>
            </li>}
            {userToken && (
              <li className="nav__item relative">
                <Link to="/notifications">
                  <BsBell size={20} />
                  {unreadCount > 0 && <span className="nav__circle">{unreadCount}</span>}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
