import { Link, useNavigate } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { BsArrowLeft } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCreateMutation } from "../../features/category/categoryService";
import { setSuccess } from "../../app/reducers/globalReducer";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState("");
  const [saveCategory, data] = useCreateMutation();
  const errors = data?.error?.data?.errors ? data?.error?.data?.errors : [];

  const submitCategory = (event) => {
    event.preventDefault();
    saveCategory({ name: state });
  };

  useEffect(() => {
    if (data?.isSuccess) {
      dispatch(setSuccess(data?.data?.msg));
      navigate("/dashboard/categories");
    }
  }, [data?.isSuccess]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link
          to="/dashboard/categories"
          className="btn-dark inline-flex items-center"
        >
          <BsArrowLeft className="mr-2" />
          Category List
        </Link>
      </ScreenHeader>
      <form className="w-full md:w-8/12" onSubmit={submitCategory}>
        <h3 className="text-lg capitalize mb-3">Create Category</h3>
        {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key} className="my-4">
              <p className="alert-danger">{error.msg}</p>
            </div>
          ))}
        <div className="mb-3">
          <input
            type="text"
            name=""
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="form-control"
            placeholder="Category Name..."
          />
        </div>
        <div className="mb-3 flex justify-center">
          <input
            type="submit"
            value={data.isLoading ? "Loading..." : "Create Category"}
            className="btn-indigo"
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateCategory;
