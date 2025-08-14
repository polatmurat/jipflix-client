import { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/skeleton/Spinner";
import { useCreateNotificationMutation, useBroadcastNotificationMutation } from "../../features/notification/notificationService";
import UserAutocomplete from "../../components/admin/UserAutocomplete";
import MovieAutocomplete from "../../components/admin/MovieAutocomplete";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import toast, { Toaster } from 'react-hot-toast';

const SendNotification = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ userId: "", movieId: "", type: "MOVIE_NEW", title: "", message: "", broadcast: false });
  const [createNotification, createResp] = useCreateNotificationMutation();
  const [broadcastNotification, broadcastResp] = useBroadcastNotificationMutation();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: form.userId ? Number(form.userId) : null,
      movieId: form.movieId ? Number(form.movieId) : null,
      type: form.type,
      title: form.title,
      message: form.message
    };
    if (form.broadcast) {
      await broadcastNotification(payload);
    } else {
      await createNotification(payload);
    }
  };

  useEffect(() => {
    if (createResp.isSuccess || broadcastResp.isSuccess) {
      toast.success('Notification sent successfully');
      setForm((prev) => ({ userId: "", movieId: "", type: "MOVIE_NEW", title: "", message: "", broadcast: prev.broadcast }));
      navigate('/dashboard/movies');
    }
  }, [createResp.isSuccess, broadcastResp.isSuccess, navigate]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/movies" className="btn-dark inline-flex items-center">
          <BsArrowLeft className="mr-2" /> Back
        </Link>
      </ScreenHeader>
      <form className="w-full md:w-8/12" onSubmit={onSubmit}>
        <h3 className="text-lg capitalize mb-3">Send Notification</h3>
        <div className="mb-3 flex items-center gap-2">
          <input id="broadcast" type="checkbox" checked={form.broadcast} onChange={(e) => setForm({ ...form, broadcast: e.target.checked, userId: e.target.checked ? "" : form.userId })} />
          <label htmlFor="broadcast">Broadcast to all users</label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!form.broadcast && (
            <div>
              <label className="input-label">User</label>
              <UserAutocomplete value={form.userId} onSelect={(u) => setForm({ ...form, userId: u.id })} />
            </div>
          )}
          <div>
            <label className="input-label">Movie (optional)</label>
            <MovieAutocomplete value={form.movieId} onSelect={(m) => setForm({ ...form, movieId: m.id })} />
          </div>
        </div>
        <div className="mt-3">
          <label className="input-label">Type</label>
          <select name="type" value={form.type} onChange={onChange} className="form-control">
            <option value="MOVIE_NEW">MOVIE_NEW</option>
            <option value="MOVIE_MATCH_INTEREST">MOVIE_MATCH_INTEREST</option>
          </select>
        </div>
        <div className="mt-3">
          <label className="input-label">Title</label>
          <input type="text" name="title" value={form.title} onChange={onChange} className="form-control" placeholder="Title" />
        </div>
        <div className="mt-3">
          <label className="input-label">Message</label>
          <textarea name="message" value={form.message} onChange={onChange} className="form-control" placeholder="Message" />
        </div>
        <div className="mt-4 flex justify-center">
          <input type="submit" value={(createResp.isLoading || broadcastResp.isLoading) ? 'Sending...' : (form.broadcast ? 'Broadcast' : 'Send')} className="btn-indigo" />
        </div>
        {(createResp.isLoading || broadcastResp.isLoading) && <div className="mt-3"><Spinner /></div>}
      </form>
      <Toaster position="top-right" />
    </Wrapper>
  );
};

export default SendNotification;


