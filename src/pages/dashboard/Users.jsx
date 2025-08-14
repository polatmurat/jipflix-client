import { useState } from "react";
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import { useListUsersQuery, useSearchUsersQuery, useDeleteUserMutation } from "../../features/user/userService";

const Users = () => {
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const size = 12;
  const { data, isFetching, refetch } = useListUsersQuery({ page: page - 1, size }, { skip: !!term });
  const { data: sData, isFetching: sFetching } = useSearchUsersQuery({ term, page: page - 1, size }, { skip: !term });
  const [deleteUser] = useDeleteUserMutation();

  const result = term ? sData?.result : data?.result;
  const items = Array.isArray(result?.items) ? result.items : (Array.isArray(result) ? result : []);
  const total = result?.totalElements || items.length || 0;

  const onDelete = async (id) => {
    if (window.confirm('Are you sure to delete this user?')) {
      await deleteUser(id);
      refetch();
    }
  };

  return (
    <Wrapper>
      <ScreenHeader>Users</ScreenHeader>
      <div className="mb-4">
        <input type="text" value={term} onChange={(e) => { setTerm(e.target.value); setPage(1); }} className="form-control w-full md:w-4/12" placeholder="Search users..." />
      </div>
      {(isFetching || sFetching) && <Spinner />}
      {!(isFetching || sFetching) && (
        <>
          <div className="mb-4 overflow-x-auto">
            <table className="w-full bg-palette1 rounded-md">
              <thead>
                <tr className="border-b border-gray-800 text-left">
                  <th className="p-3 uppercase text-base font-sm text-gray-500">ID</th>
                  <th className="p-3 uppercase text-base font-sm text-gray-500">Username</th>
                  <th className="p-3 uppercase text-base font-sm text-gray-500">Email</th>
                  <th className="p-3 uppercase text-base font-sm text-gray-500">Name</th>
                  <th className="p-3 uppercase text-base font-sm text-gray-500">Roles</th>
                  <th className="p-3 uppercase text-base font-sm text-gray-500">Delete</th>
                </tr>
              </thead>
              <tbody>
                {items.map(u => (
                  <tr key={u.id} className="odd:bg-gray-800">
                    <td className="p-3 text-sm text-gray-400">{u.id}</td>
                    <td className="p-3 text-sm text-gray-400">{u.username}</td>
                    <td className="p-3 text-sm text-gray-400">{u.email}</td>
                    <td className="p-3 text-sm text-gray-400">{u.name} {u.surname}</td>
                    <td className="p-3 text-sm text-gray-400">{(u.roles || []).join(', ')}</td>
                    <td className="p-3 text-sm text-gray-400">
                      <button className="bg-red-500 px-4 py-2 text-white rounded" onClick={() => onDelete(u.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} perPage={size} count={total} path={`dashboard/users`} />
        </>
      )}
    </Wrapper>
  );
};

export default Users;


