import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "../pages/auth/LoginAdmin";
import Movies from "../pages/dashboard/movie/Movies";
import Private from "./Private";
import Public from "./Public";
import Categories from "../pages/dashboard/category/Categories";
import CreateCategory from "../pages/dashboard/category/CreateCategory";
import UpdateCategory from "../pages/dashboard/category/UpdateCategory";
import Directors from "../pages/dashboard/director/Directors";
import CreateDirector from "../pages/dashboard/director/CreateDirector";
import UpdateDirector from "../pages/dashboard/director/UpdateDirector";
import CreateMovie from "../pages/dashboard/movie/CreateMovie";
import UpdateMovie from "../pages/dashboard/movie/UpdateMovie";
import Home from "../pages/home/Home";
import Login from "../pages/home/auth/Login";
import Register from "../pages/home/auth/Register";
import Dashboard from "../pages/users/Dashboard";
import Notifications from "../pages/users/Notifications";
import Users from "../pages/dashboard/user/Users";
import SystemHealth from "../pages/dashboard/SystemHealth";
import SendNotification from "../pages/dashboard/SendNotification";
import Logs from "../pages/dashboard/Logs";
import UserRoute from "./UserRoute";
import UserAuthRoute from "./UserAuthRoute";
import MovieDetails from "../pages/home/MovieDetails";
import GenreMovies from "../pages/home/GenreMovies";
import AllMovies from "../pages/home/AllMovies";
import OAuthCallback from "../pages/auth/OAuthCallback";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:id" element={<GenreMovies />} />
        <Route path="/genre/:id/:page" element={<GenreMovies />} />
        <Route path="/movies" element={<AllMovies />} />
        <Route path="/movies/:page" element={<AllMovies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route element={<UserAuthRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/login/oauth2/code/google" element={<OAuthCallback />} />
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
            path="movies"
            element={
              <Private>
                <Movies />
              </Private>
            }
          />
          <Route
            path="movies/:page"
            element={
              <Private>
                <Movies />
              </Private>
            }
          />
          <Route
            path="update-movie/:id"
            element={
              <Private>
                <UpdateMovie />
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
            path="directors/:page"
            element={
              <Private>
                <Directors />
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
            path="create-movie"
            element={
              <Private>
                <CreateMovie />
              </Private>
            }
          />
          <Route
            path="users"
            element={
              <Private>
                <Users />
              </Private>
            }
          />
          <Route
            path="health"
            element={
              <Private>
                <SystemHealth />
              </Private>
            }
          />
          <Route
            path="send-notification"
            element={
              <Private>
                <SendNotification />
              </Private>
            }
          />
          <Route
            path="logs/:tab"
            element={
              <Private>
                <Logs />
              </Private>
            }
          />
          <Route
            path="directors"
            element={
              <Private>
                <Directors />
              </Private>
            }
          />
          <Route
            path="create-director"
            element={
              <Private>
                <CreateDirector />
              </Private>
            }
          />
          <Route
            path="update-director/:id"
            element={
              <Private>
                <UpdateDirector />
              </Private>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
