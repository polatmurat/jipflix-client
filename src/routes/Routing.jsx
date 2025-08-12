import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "../pages/auth/LoginAdmin";
import Products from "../pages/dashboard/Products";
import Private from "./Private";
import Public from "./Public";
import Categories from "../pages/dashboard/Categories";
import CreateCategory from "../pages/dashboard/CreateCategory";
import UpdateCategory from "../pages/dashboard/UpdateCategory";
import CreateProduct from "../pages/dashboard/CreateProduct";
import UpdateProduct from "../pages/dashboard/UpdateProduct";
import Home from "../pages/home/Home";
import Login from "../pages/home/auth/Login";
import Register from "../pages/home/auth/Register";
import Dashboard from "../pages/users/Dashboard";
import Notifications from "../pages/users/Notifications";
import UserRoute from "./UserRoute";
import UserAuthRoute from "./UserAuthRoute";
import CategoryProducts from "../pages/home/CategoryProducts";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category-products/:name" element={<CategoryProducts />} />
        <Route path="/category-products/:name/:page" element={<CategoryProducts />} />
        <Route element={<UserAuthRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<UserRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="auth">
          <Route
            path="login-admin"
            element={
              <Public>
                <LoginAdmin />
              </Public>
            }
          />
        </Route>
        {/* auth/login-admin */}
        <Route path="dashboard">
          <Route
            path="products"
            element={
              <Private>
                <Products />
              </Private>
            }
          />
          <Route
            path="products/:page"
            element={
              <Private>
                <Products />
              </Private>
            }
          />
          <Route
            path="update-product/:id"
            element={
              <Private>
                <UpdateProduct />
              </Private>
            }
          />
          <Route
            path="categories"
            element={
              <Private>
                <Categories />
              </Private>
            }
          />
          <Route
            path="categories/:page"
            element={
              <Private>
                <Categories />
              </Private>
            }
          />
          <Route
            path="create-category"
            element={
              <Private>
                <CreateCategory />
              </Private>
            }
          />
          <Route
            path="update-category/:id"
            element={
              <Private>
                <UpdateCategory />
              </Private>
            }
          />
          <Route
            path="create-product"
            element={
              <Private>
                <CreateProduct />
              </Private>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
