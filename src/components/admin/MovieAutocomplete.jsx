import { useEffect, useMemo, useState } from "react";
import { useSearchMoviesQuery } from "../../features/movie/movieService";

const MovieAutocomplete = ({ value, onSelect }) => {
  const [term, setTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebounced(term), 300);
    return () => clearTimeout(t);
  }, [term]);
  const skip = !debounced || debounced.length < 2;
  const { data } = useSearchMoviesQuery({ title: debounced, page: 0, size: 10 }, { skip });
  const items = useMemo(() => data?.result?.items || [], [data]);
  return (
    <div className="relative">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="form-control"
        placeholder={value ? `Selected movieId: ${value}` : "Search movie by title"}
      />
      {term && items.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-indigo-500 border rounded shadow">
          {items.map(m => (
            <li key={m.id} className="px-3 py-2 hover:bg-gray-500 cursor-pointer" onClick={() => { onSelect(m); setTerm(""); }}>
              <div className="text-sm font-medium">{m.title} ({m.id})</div>
              {m.imageUrl && <img src={m.imageUrl} alt={m.title} className="mt-1 h-10 w-16 object-cover rounded" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieAutocomplete;


