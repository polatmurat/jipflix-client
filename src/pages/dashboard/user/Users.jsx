import { useState } from "react";
import Wrapper from "../Wrapper";
import ScreenHeader from "../../../components/ScreenHeader";
import Spinner from "../../../components/skeleton/Spinner";
import Pagination from "../../../components/skeleton/Pagination";
import EditUser from "./EditUser";
import { 
  useListUsersQuery, 
  useSearchUsersQuery, 
  useDeleteUserMutation,
  useSoftDeleteUserMutation,
  useGetDeletedUsersQuery,
  useAdminUpdateUserMutation
} from "../../../features/user/userService";

const Users = () => {
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [showDeleted, setShowDeleted] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const size = 12;
  
  const { data, isFetching, refetch } = useListUsersQuery({ page: page - 1, size }, { skip: !!term || showDeleted });
  const { data: sData, isFetching: sFetching } = useSearchUsersQuery({ term, page: page - 1, size }, { skip: !term || showDeleted });
  const { data: deletedData, isFetching: deletedFetching } = useGetDeletedUsersQuery(undefined, { skip: !showDeleted });
  
  const [deleteUser] = useDeleteUserMutation();
  const [softDeleteUser] = useSoftDeleteUserMutation();
  const [adminUpdateUser] = useAdminUpdateUserMutation();

  let result, items, total;
  
  if (showDeleted) {
    result = deletedData?.result;
    items = Array.isArray(result) ? result : [];
    total = items.length;
  } else {
    result = term ? sData?.result : data?.result;
    items = Array.isArray(result?.items) ? result.items : (Array.isArray(result) ? result : []);
    total = result?.totalElements || items.length || 0;
  }

  const onHardDelete = async (id) => {
    if (window.confirm('Are you sure to permanently delete this user? This action cannot be undone!')) {
      await deleteUser(id);
      refetch();
    }
  };

  const onSoftDelete = async (id) => {
    if (window.confirm('Are you sure to soft delete this user?')) {
      await softDeleteUser(id);
      refetch();
    }
  };

  const onEdit = (user) => {
    setEditingUser(user);
  };

  const onSaveEdit = async (editForm) => {
    try {
      await adminUpdateUser({ id: editingUser.id, data: editForm });
      setEditingUser(null);
      refetch();
    } catch (error) {
      alert('Failed to update user: ' + (error.data?.message || error.message));
    }
  };

  return (
    <Wrapper>
      <ScreenHeader>Users</ScreenHeader>
      <div className="mb-4 flex gap-4 items-center">
        <input 
          type="text" 
          value={term} 
          onChange={(e) => { setTerm(e.target.value); setPage(1); }} 
          className="form-control w-full md:w-4/12" 
          placeholder="Search users..."
          disabled={showDeleted}
        />
        <label className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={showDeleted}
            onChange={(e) => { setShowDeleted(e.target.checked); setTerm(""); setPage(1); }}
          />
          <span className="text-sm">Show Deleted Users</span>
        </label>
      </div>
      {(isFetching || sFetching || deletedFetching) && <Spinner />}
      {!(isFetching || sFetching || deletedFetching) && (
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
                  <th className="p-3 uppercase text-base font-sm text-gray-500">Actions</th>
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
                      <div className="flex gap-2">
                        {!showDeleted && (
                          <>
                            <button 
                              className="bg-blue-500 px-3 py-1 text-white rounded text-xs"
                              onClick={() => onEdit(u)}
                            >
                              Edit
                            </button>
                            <button 
                              className="bg-orange-500 px-3 py-1 text-white rounded text-xs"
                              onClick={() => onSoftDelete(u.id)}
                            >
                              Soft Delete
                            </button>
                            <button 
                              className="bg-red-500 px-3 py-1 text-white rounded text-xs"
                              onClick={() => onHardDelete(u.id)}
                            >
                              Hard Delete
                            </button>
                          </>
                        )}
                        {showDeleted && (
                          <span className="text-xs text-red-400">Deleted User</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!showDeleted && <Pagination page={page} perPage={size} count={total} path={`dashboard/users`} />}
        </>
      )}
      
      {editingUser && (
        <EditUser 
          user={editingUser} 
          onSave={onSaveEdit} 
          onCancel={() => setEditingUser(null)} 
        />
      )}
    </Wrapper>
  );
};

export default Users;


