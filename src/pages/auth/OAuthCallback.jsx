import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../app/reducers/authReducer";

export default function OAuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = params.get("token");
    const error = params.get("error");
    if (error) {
      navigate("/login", { replace: true });
      return;
    }
    if (token) {
      localStorage.setItem("user-token", token);
      dispatch(setUserToken(token));
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate, params]);

  return null;
}


