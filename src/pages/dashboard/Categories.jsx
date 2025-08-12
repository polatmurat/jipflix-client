import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { BsPlusLg } from "react-icons/bs";
import { clearMessage, setSuccess } from "../../app/reducers/globalReducer";
import {
  useGetQuery,
  useDeleteCategoryMutation,
} from "../../features/category/categoryService";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

const Categories = () => {
  const { success } = useSelector((state) => state.globalReducer);

  let { page } = useParams();

  const { data = [], isFetching } = useGetQuery(page ? page : 1);

  if (!page) {
    page = 1;
  }

  const dispatch = useDispatch();

  const [removeCategory, response] = useDeleteCategoryMutation();
  console.log(response, " RESPONSE REMOVE");
  const delCategory = (id) => {
    if (window.confirm("This category will be deleted, are you sure?")) {
      removeCategory(id);
    }
  };

  console.log(response.data);

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
    }
  }, [response?.data?.msg]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link
          to="/dashboard/create-category"
          className="btn-dark inline-flex items-center"
        >
          <BsPlusLg className="mr-2" />
          Add Categories
        </Link>
      </ScreenHeader>
      {success && <div className="alert-success md:w-8/12">{success}</div>}
      {!isFetching ? (
        data?.categories?.length > 0 && (
          <>
            <div className="mb-4">
              <table className="w-full bg-palette1 rounded-md">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-3 uppercase text-base font-sm text-gray-500">
                      Name
                    </th>
                    <th className="p-3 uppercase text-base font-sm text-gray-500">
                      Edit
                    </th>
                    <th className="p-3 uppercase text-base font-sm text-gray-500">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.categories?.map((category) => (
                    <tr key={category._id} className="odd:bg-gray-800">
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {category.name}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <Link
                          to={`/dashboard/update-category/${category._id}`}
                          className="bg-palette4 w-1/4 px-5 py-2 cursor-pointer text-white rounded-md"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <a
                          className="bg-red-500 w-1/4 px-4 py-2 cursor-pointer text-white rounded-md"
                          onClick={() => delCategory(category._id)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path="dashboard/categories"
            />
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Categories;
