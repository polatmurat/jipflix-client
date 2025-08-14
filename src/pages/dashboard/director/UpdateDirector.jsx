import { Link, useNavigate, useParams } from "react-router-dom";
import ScreenHeader from "../../../components/ScreenHeader";
import Wrapper from "../Wrapper";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useGetDirectorsQuery, useUpdateDirectorMutation } from "../../../features/director/directorsService";

const UpdateDirector = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetDirectorsQuery();
  const [state, setState] = useState("");
  const [updateDirector, response] = useUpdateDirectorMutation();

  useEffect(() => {
    const d = (data?.result || []).find(x => String(x.id) === String(id));
    if (d) setState(d.name);
  }, [data?.result, id]);

  const submit = async (e) => {
    e.preventDefault();
    await updateDirector({ id, body: { name: state } });
    navigate('/dashboard/directors');
  };

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/directors" className="btn-dark inline-flex items-center">
          <BsArrowLeft className="mr-2" />
          Directors List
        </Link>
      </ScreenHeader>
      <form className="w-full md:w-8/12" onSubmit={submit}>
        <h3 className="text-lg capitalize mb-3">Update Director</h3>
        <div className="mb-3">
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="form-control" placeholder="Director Name..." />
        </div>
        <div className="mb-3 flex justify-center">
          <input type="submit" value={response.isLoading ? 'Loading...' : 'Update Director'} className="btn-indigo" />
        </div>
      </form>
    </Wrapper>
  );
};

export default UpdateDirector;


