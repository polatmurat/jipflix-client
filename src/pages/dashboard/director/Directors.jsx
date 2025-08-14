import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Wrapper from "../Wrapper";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { clearMessage } from "../../../app/reducers/globalReducer";
import ScreenHeader from "../../../components/ScreenHeader";
import Spinner from "../../../components/skeleton/Spinner";
import { useGetDirectorsPagedQuery, useDeleteDirectorMutation } from "../../../features/director/directorsService";
import Pagination from "../../../components/skeleton/Pagination";

const Directors = () => {
  const dispatch = useDispatch();
  const { page: pageParam } = useParams();
  const [query, setQuery] = useState("");
  const page = pageParam ? parseInt(pageParam) : 1;
  const perPage = 12;
  const { data, isLoading, refetch } = useGetDirectorsPagedQuery({ term: query, page: page - 1, size: perPage, sortBy: 'id', sortDir: 'desc' });
  const [deleteDirector] = useDeleteDirectorMutation();
  const paged = data?.result;
  const items = paged?.items || [];

  useEffect(() => {
    return () => { dispatch(clearMessage()); };
  }, []);

  const onDelete = async (id) => {
    if (window.confirm("Are you sure to delete this director?")) {
      await deleteDirector(id);
      refetch();
    }
  };

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-director" className="btn-dark inline-flex items-center">
          <BsPlusLg className="mr-2" />
          Add Director
        </Link>
      </ScreenHeader>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control w-full md:w-4/12"
          placeholder="Search directors..."
        />
      </div>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className="mb-4">
            <table className="w-full bg-palette1 rounded-md">
              <thead>
                <tr className="border-b border-gray-800 text-left">
                  <th className="p-3 uppercase text-base font-sm text-gray-500">Name</th>
                  <th className="p-3 uppercase text-base font-sm text-gray-500">Edit</th>
                  <th className="p-3 uppercase text-base font-sm text-gray-500">Delete</th>
                </tr>
              </thead>
              <tbody>
                 {(() => {
                   const all = items || [];
                   return all.map((d) => (
                  <tr key={d.id} className="odd:bg-gray-800">
                    <td className="p-3 capitalize text-sm font-normal text-gray-400">{d.name}</td>
                    <td className="p-3 capitalize text-sm font-normal text-gray-400">
                      <Link to={`/dashboard/update-director/${d.id}`} className="bg-palette4 w-1/4 px-5 py-2 cursor-pointer text-white rounded-md">Edit</Link>
                    </td>
                    <td className="p-3 capitalize text-sm font-normal text-gray-400">
                      <a className="bg-red-500 w-1/4 px-4 py-2 cursor-pointer text-white rounded-md" onClick={() => onDelete(d.id)}>Delete</a>
                    </td>
                  </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>
           <Pagination page={page} perPage={perPage} count={paged?.totalElements || 0} path="dashboard/directors" />
        </>
      )}
    </Wrapper>
  );
};

export default Directors;


