import { NavLink } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineShoppingCart, AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../../app/reducers/authReducer";

const AccountList = () => {

  const dispatch = useDispatch();

  return (
    <>
    <NavLink to="/user" className="account-list">
        <BsPersonCircle size={22} />
        <span className="account-list__title">My Account</span>
    </NavLink>
    <NavLink to="/orders" className="account-list">
        <AiOutlineShoppingCart size={22} />
        <span className="account-list__title">Orders</span>
    </NavLink>
    <span className="account-list cursor-pointer" onClick={() => dispatch(logout('user-token'))}>
        <AiOutlineLogout size={22} />
        <span className="account-list__title">Logout</span>
    </span>
    </>
  )
}

export default AccountList