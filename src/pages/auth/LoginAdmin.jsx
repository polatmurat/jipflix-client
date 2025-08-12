import { useState, useEffect } from "react";
import { useAuthLoginMutation } from "../../features/auth/authService";
import { setAdminToken } from "../../app/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const [login, response] = useAuthLoginMutation();

  console.log("Response : ", response);

  const errors = response.error?.data?.errors ? response.error.data.errors : [];

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { username, password };
    login(userData);
  };

  useEffect(() => {
    if (response.isSuccess) {
      const token = response?.data?.result?.token || response?.data?.token;
      localStorage.setItem("admin-token", token);
      dispatch(setAdminToken(token));
      navigate('/dashboard/products');
    }
  }, [response.isSuccess, response?.data?.result?.token, response?.data?.token, dispatch, navigate]);

  return (
    <div className="bg-palette2 h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="bg-palette3 p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 rounded-md"
      >
        <h3 className="text-white text-center mb-3 capitalize font-semibold text-lg">
          Admin Panel
        </h3>
        {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key}>
              <p className="alert-danger">
                {error.msg}
              </p>
            </div>
          ))}

        <div>
          <div className="mb-3">
            <input
              className="w-full bg-palette2 p-3 rounded outline-none text-white"
              type="text"
              onChange={onChange}
              value={username}
              name="username"
              id="username"
              placeholder="Username..."
            />
          </div>
          <div className="mb-3">
            <input
              className="w-full bg-palette2 p-3 rounded outline-none text-white"
              type="password"
              onChange={onChange}
              value={password}
              name="password"
              id="password"
              placeholder="Password..."
            />
          </div>
          <div className="mb-3">
            <input
              type="submit"
              value={response.isLoading ? "Loading ... " : "Sign In"}
              className="bg-indigo-600 w-full p-3 cursor-pointer text-white rounded-lg"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginAdmin;
