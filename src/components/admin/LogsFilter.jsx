const LogsFilter = ({
  tab,
  service,
  status,
  action,
  text,
  fromEpoch,
  toEpoch,
  setService,
  setStatus,
  setAction,
  setText,
  setFromEpoch,
  setToEpoch
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-3 mb-4">
      <input className="form-control" placeholder="Service" value={service} onChange={(e) => setService(e.target.value)} />
      {tab === 'error' && <input className="form-control" placeholder="HTTP Status" value={status} onChange={(e) => setStatus(e.target.value)} />}
      {tab === 'audit' && <input className="form-control" placeholder="Action" value={action} onChange={(e) => setAction(e.target.value)} />}
      <input className="form-control md:col-span-2" placeholder="Search text" value={text} onChange={(e) => setText(e.target.value)} />
      <input className="form-control" type="datetime-local" value={fromEpoch} onChange={(e) => setFromEpoch(e.target.value)} />
      <input className="form-control" type="datetime-local" value={toEpoch} onChange={(e) => setToEpoch(e.target.value)} />
    </div>
  );
};

export default LogsFilter;


