import { Link, useNavigate } from "react-router-dom";
import ScreenHeader from "../../../components/ScreenHeader";
import Wrapper from "../Wrapper";
import { BsArrowLeft } from "react-icons/bs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateMovieMutation } from "../../../features/movie/movieService";
import { useGetDirectorsQuery } from "../../../features/director/directorsService";
import { useGetGenresQuery } from "../../../features/genre/genresService";
import Spinner from "../../../components/skeleton/Spinner";
import ImageUploader from "../../../components/admin/ImageUploader";

const CreateMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: directorsResp, isLoading: directorsLoading } = useGetDirectorsQuery();
  const { data: genresResp, isLoading: genresLoading } = useGetGenresQuery();
  const directors = directorsResp?.result || [];
  const genres = genresResp?.result || [];

  const [state, setState] = useState({
    title: "",
    description: "",
    directorId: "",
    genreIds: [],
    imageUrl: "",
    rating: 0,
    releaseYear: ""
  });

  const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });
  const toggleGenre = (id) => {
    const set = new Set(state.genreIds);
    if (set.has(id)) set.delete(id); else set.add(id);
    setState({ ...state, genreIds: Array.from(set) });
  };

  const [createMovie, response] = useCreateMovieMutation();

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      title: state.title,
      description: state.description,
      directorId: state.directorId ? Number(state.directorId) : null,
      genreIds: state.genreIds,
      imageUrl: state.imageUrl,
      rating: state.rating ? Number(state.rating) : null,
      releaseYear: state.releaseYear ? Number(state.releaseYear) : null
    };
    await createMovie(payload);
    navigate('/dashboard/movies');
  };

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/movies" className="btn-dark inline-flex items-center">
          <BsArrowLeft className="mr-2" />
          Movies List
        </Link>
      </ScreenHeader>
      <form className="w-full md:w-8/12" onSubmit={submit}>
        <h3 className="text-lg capitalize mb-3">Create Movie</h3>
        <div className="mb-3">
          <input type="text" name="title" value={state.title} onChange={onChange} className="form-control" placeholder="Title..." />
        </div>
        <div className="mb-3">
          <textarea name="description" value={state.description} onChange={onChange} className="form-control" placeholder="Description..." />
        </div>
        <div className="mb-3">
          {directorsLoading ? <Spinner /> : (
            <select name="directorId" value={state.directorId} onChange={onChange} className="form-control">
              <option value="">Choose Director...</option>
              {directors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          )}
        </div>
        <div className="mb-3">
          <label className="input-label">Genres</label>
          {genresLoading ? <Spinner /> : (
            <div className="flex flex-wrap gap-2 mt-2">
              {genres.map(g => {
                const checked = state.genreIds.includes(g.id);
                return (
                  <label key={g.id} className={`px-3 py-2 border rounded cursor-pointer ${checked ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-800 border-gray-300'}`}>
                    <input type="checkbox" className="hidden" checked={checked} onChange={() => toggleGenre(g.id)} />
                    <span>{g.name}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label className="input-label">Image</label>
          <ImageUploader value={state.imageUrl} onChange={(url) => setState({ ...state, imageUrl: url })} />
        </div>
        <div className="mb-3">
          <input type="number" min="1880" max="2100" name="releaseYear" value={state.releaseYear} onChange={onChange} className="form-control" placeholder="Release Year..." />
        </div>
        <div className="mb-3">
          <input type="number" step="0.1" min="0" max="10" name="rating" value={state.rating} onChange={onChange} className="form-control" placeholder="Rating..." />
        </div>
        <div className="mb-3 flex justify-center">
          <input type="submit" value={response.isLoading ? 'Loading...' : 'Create Movie'} className="btn-indigo" />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateMovie;


