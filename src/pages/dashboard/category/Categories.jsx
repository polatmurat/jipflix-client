import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ScreenHeader from "../../../components/ScreenHeader";
import Wrapper from "../Wrapper";
import { BsPlusLg } from "react-icons/bs";
import { clearMessage, setSuccess } from "../../../app/reducers/globalReducer";
import { useGetGenresQuery, useDeleteGenreMutation } from "../../../features/genre/genresService";
import Spinner from "../../../components/skeleton/Spinner";
import Pagination from "../../../components/skeleton/Pagination";

const Categories = () => {
  const { success } = useSelector((state) => state.globalReducer);
  const { page: pageParam } = useParams();
  const [query, setQuery] = useState("");
  const page = pageParam ? parseInt(pageParam) : 1;
  const perPage = 12;

  const { data, isFetching, refetch } = useGetGenresQuery();

  const dispatch = useDispatch();

  const [removeCategory, response] = useDeleteGenreMutation();
  console.log(response, " RESPONSE REMOVE");
  const delCategory = (id) => {
    if (window.confirm("This genre will be deleted, are you sure?")) {
      removeCategory(id);
      refetch();
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
          Add Genres
        </Link>
      </ScreenHeader>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control w-full md:w-4/12"
          placeholder="Search genres..."
        />
      </div>
      {success && <div className="alert-success md:w-8/12">{success}</div>}
      {!isFetching ? (
        (data?.result?.length || 0) > 0 && (
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
                  {(() => {
                    const all = data?.result || [];
                    const filtered = query ? all.filter(g => g.name.toLowerCase().includes(query.toLowerCase())) : all;
                    const start = (page - 1) * perPage;
                    const items = filtered.slice(start, start + perPage);
                    return items.map((category) => (
                    <tr key={category.id} className="odd:bg-gray-800">
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {category.name}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <Link
                          to={`/dashboard/update-category/${category.id}`}
                          className="bg-palette4 w-1/4 px-5 py-2 cursor-pointer text-white rounded-md"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <a
                          className="bg-red-500 w-1/4 px-4 py-2 cursor-pointer text-white rounded-md"
                          onClick={() => delCategory(category.id)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
            {(() => {
              const total = (query ? (data?.result || []).filter(g => g.name.toLowerCase().includes(query.toLowerCase())).length : (data?.result || []).length);
              return (
                <Pagination
                  page={page}
                  perPage={perPage}
                  count={total}
                  path="dashboard/categories"
                />
              );
            })()}
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Categories;
