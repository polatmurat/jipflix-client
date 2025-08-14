import { Link, useNavigate } from "react-router-dom";
import ScreenHeader from "../../../components/ScreenHeader";
import Wrapper from "../Wrapper";
import { BsArrowLeft } from "react-icons/bs";
import { useState } from "react";
import { useCreateDirectorMutation } from "../../../features/director/directorsService";

const CreateDirector = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [createDirector, response] = useCreateDirectorMutation();

  const submit = async (e) => {
    e.preventDefault();
    await createDirector({ name: state });
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
        <h3 className="text-lg capitalize mb-3">Create Director</h3>
        <div className="mb-3">
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="form-control" placeholder="Director Name..." />
        </div>
        <div className="mb-3 flex justify-center">
          <input type="submit" value={response.isLoading ? 'Loading...' : 'Create Director'} className="btn-indigo" />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateDirector;


