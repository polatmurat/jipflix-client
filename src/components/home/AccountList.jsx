import { NavLink } from "react-router-dom";
import { BsPersonCircle, BsBell } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../../app/reducers/authReducer";

const AccountList = () => {
  const dispatch = useDispatch();

  const menuItems = [
    {
      to: "/user",
      icon: BsPersonCircle,
      label: "My Account",
      description: "Account settings"
    },
    {
      to: "/notifications",
      icon: BsBell,
      label: "Notifications",
      description: "Your alerts"
    }
  ];

  return (
    <nav className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`
            }
          >
            <Icon size={20} className="flex-shrink-0" />
            <div className="flex-1">
              <div className="font-medium text-sm">{item.label}</div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </div>
          </NavLink>
        );
      })}
      
      <div className="pt-4 border-t border-gray-200">
        <button
          className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50 w-full text-left group"
          onClick={() => dispatch(logout('user-token'))}
        >
          <AiOutlineLogout size={20} className="flex-shrink-0" />
          <div className="flex-1">
            <div className="font-medium text-sm">Logout</div>
            <div className="text-xs text-red-400">Sign out of account</div>
          </div>
        </button>
      </div>
    </nav>
  );
}

export default AccountList