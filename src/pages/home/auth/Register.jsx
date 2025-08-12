import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/home/Header";
import Nav from "../../../components/home/Nav";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useUserRegisterMutation } from "../../../features/auth/authService";
import { useGetGenresQuery } from "../../../features/genre/genresService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../app/reducers/authReducer";
import { setSuccess } from "../../../app/reducers/globalReducer";
import { useForm } from "../../../hooks/Form";
import { ShowError } from "../../../utils/ShowError";

const Register = () => {
  const [errors, setErrors] = useState([]);

  // const [state, setState] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  const { state, onChange } = useForm({
    name: "",
    email: "",
    password: "",
    username: "",
    surname: "",
    preferredGenreIds: [],
  });
  const [registerUser, response] = useUserRegisterMutation();
  console.log(response);

  // const onChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    // Backend expects: username, email, password, name, surname, preferredGenreIds
    const payload = {
      username: state.username || state.email?.split("@")[0] || "",
      email: state.email,
      password: state.password,
      name: state.name,
      surname: state.surname,
      preferredGenreIds: state.preferredGenreIds,
    };
    registerUser(payload);
  };

  useEffect(() => {
    if (response.isError) {
      setErrors(response?.error?.data?.errors);
    }
  }, [response?.error?.data]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: genresResp, isLoading: genresLoading } = useGetGenresQuery();
  const genres = genresResp?.result || [];

  useEffect(() => {
    if (response.isSuccess) {
      const token = response?.data?.result?.token || response?.data?.token;
      localStorage.setItem("user-token", token);
      dispatch(setUserToken(token));
      dispatch(setSuccess("Registered successfully"));
      navigate("/user");
    }
  }, [response.isSuccess]);

  const showErrors = (name) => {
    const exist = errors.find((err) => err.path === name);
    if (exist) {
      return exist.msg;
    } else {
      return false;
    }
  };

  return (
    <>
      <Nav />
      <div className="mt-[70px] pb-[80px]">
        <Header>Sign Up</Header>
        <div className="flex flex-wrap justify-center">
          <motion.div
            initial={{ opacity: 0, x: "100vw" }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full sm:w-10/12 md:w-8/12 lg:6/12 xl:w-5/12 p-6"
          >
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-lg -mt-12 border border-gray-200 p-10"
            >
              <h1 className="heading mb-5">Sign Up</h1>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`form-input ${
                    ShowError(errors, "name")
                      ? "border-rose-600"
                      : "border-gray-300"
                  }`}
                  placeholder="Name..."
                  value={state.name}
                  onChange={onChange}
                />
                {showErrors("name") && (
                  <span className="error">{ShowError(errors, "name")}</span>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="surname" className="form-label">
                  Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  className={`form-input ${
                    ShowError(errors, "surname")
                      ? "border-rose-600"
                      : "border-gray-300"
                  }`}
                  placeholder="Surname..."
                  value={state.surname}
                  onChange={onChange}
                />
                {showErrors("surname") && (
                  <span className="error">{ShowError(errors, "surname")}</span>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className={`form-input ${
                    ShowError(errors, "username")
                      ? "border-rose-600"
                      : "border-gray-300"
                  }`}
                  placeholder="Username..."
                  value={state.username}
                  onChange={onChange}
                />
                {showErrors("username") && (
                  <span className="error">{ShowError(errors, "username")}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`form-input ${
                    ShowError(errors, "email")
                      ? "border-rose-600"
                      : "border-gray-300"
                  }`}
                  placeholder="E-mail..."
                  value={state.email}
                  onChange={onChange}
                />
                {ShowError(errors, "email") && (
                  <span className="error">{ShowError(errors, "email")}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={`form-input ${
                    ShowError(errors, "password")
                      ? "border-rose-600"
                      : "border-gray-300"
                  }`}
                  placeholder="Password..."
                  value={state.password}
                  onChange={onChange}
                />
                {ShowError(errors, "password") && (
                  <span className="error">{ShowError(errors, "password")}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label">Preferred Genres</label>
                <div className="flex flex-wrap gap-2">
                  {genresLoading && <span className="text-sm text-gray-500">Loading...</span>}
                  {!genresLoading && genres?.map((g) => {
                    const checked = state.preferredGenreIds.includes(g.id);
                    return (
                      <label key={g.id} className={`px-3 py-2 border rounded cursor-pointer ${checked ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-800 border-gray-300'}`}>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={checked}
                          onChange={() => {
                            const set = new Set(state.preferredGenreIds);
                            if (set.has(g.id)) set.delete(g.id); else set.add(g.id);
                            onChange({ target: { name: 'preferredGenreIds', value: Array.from(set) } });
                          }}
                        />
                        <span>{g.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="submit"
                  value={response.isLoading ? "Loading..." : "Sign Up"}
                  disabled={response.isLoading ? true : false}
                  className="btn btn-indigo w-full"
                />
              </div>
              <div>
                <p>
                  Already have an account ?{" "}
                  <span className="font-medium text-base text-black capitalize">
                    <Link to="/login">Login</Link>
                  </span>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Register;
