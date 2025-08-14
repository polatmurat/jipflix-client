import { useState, useEffect } from "react";

const EditUser = ({ user, onSave, onCancel }) => {
  const [editForm, setEditForm] = useState({ 
    name: "", 
    surname: "", 
    email: "", 
    username: "", 
    roles: [] 
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        surname: user.surname || "",
        email: user.email || "",
        username: user.username || "",
        roles: user.roles || []
      });
    }
  }, [user]);

  const handleSave = () => {
    onSave(editForm);
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4 text-white">Edit User: {user.username}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Surname</label>
            <input
              type="text"
              value={editForm.surname}
              onChange={(e) => setEditForm({...editForm, surname: e.target.value})}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Username</label>
            <input
              type="text"
              value={editForm.username}
              onChange={(e) => setEditForm({...editForm, username: e.target.value})}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Roles</label>
            <div className="flex gap-2">
              {['ROLE_USER', 'ROLE_ADMIN'].map(role => (
                <label key={role} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editForm.roles.includes(role)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setEditForm({...editForm, roles: [...editForm.roles, role]});
                      } else {
                        setEditForm({...editForm, roles: editForm.roles.filter(r => r !== role)});
                      }
                    }}
                    className="mr-1"
                  />
                  <span className="text-sm text-gray-300">{role.replace('ROLE_', '')}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
