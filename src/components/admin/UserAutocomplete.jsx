import { useEffect, useMemo, useState } from "react";
import { useSearchUsersQuery } from "../../features/user/userService";

const UserAutocomplete = ({ value, onSelect }) => {
  const [term, setTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebounced(term), 300);
    return () => clearTimeout(t);
  }, [term]);
  const skip = !debounced || debounced.length < 2;
  const { data } = useSearchUsersQuery({ term: debounced, page: 0, size: 10 }, { skip });
  const items = useMemo(() => data?.result?.items || [], [data]);
  return (
    <div className="relative">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="form-control"
        placeholder={value ? `Selected userId: ${value}` : "Search user by name/username/email"}
      />
      {term && items.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-indigo-500 border rounded shadow">
          {items.map(u => (
            <li key={u.id} className="px-3 py-2 hover:bg-gray-500 cursor-pointer" onClick={() => { onSelect(u); setTerm(""); }}>
              <div className="text-sm font-medium">{u.username} ({u.id})</div>
              <div className="text-xs text-gray-200">{u.name} {u.surname} • {u.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserAutocomplete;


