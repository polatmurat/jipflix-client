import { useMemo, useState } from "react";
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import { useListErrorsQuery, useListAuditsQuery } from "../../features/log/logService";
import { useState as useReactState } from 'react';
import LogsFilter from "../../components/admin/LogsFilter";
import LogModal from "../../components/admin/LogModal";

const Logs = () => {
  const [tab, setTab] = useState('error');
  const [service, setService] = useState('');
  const [status, setStatus] = useState('');
  const [action, setAction] = useState('');
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [fromEpoch, setFromEpoch] = useState("");
  const [toEpoch, setToEpoch] = useState("");
  const size = 20;

  const toMs = (v) => v ? new Date(v).getTime() : undefined;
  const errorParams = { service: service || undefined, httpStatus: status ? Number(status) : undefined, text: text || undefined, fromEpoch: toMs(fromEpoch), toEpoch: toMs(toEpoch), page: page - 1, size, sortBy: 'createdAt', sortDir: 'desc' };
  const auditParams = { service: service || undefined, action: action || undefined, text: text || undefined, fromEpoch: toMs(fromEpoch), toEpoch: toMs(toEpoch), page: page - 1, size, sortBy: 'createdAt', sortDir: 'desc' };

  const { data: errData, isFetching: errLoading } = useListErrorsQuery(errorParams, { skip: tab !== 'error' });
  const { data: audData, isFetching: audLoading } = useListAuditsQuery(auditParams, { skip: tab !== 'audit' });
  const result = tab === 'error' ? errData?.result : audData?.result;
  const items = result?.items || [];
  const total = result?.totalElements || 0;

  const [modal, setModal] = useReactState(null);
  const closeModal = () => setModal(null);

  return (
    <Wrapper>
      <ScreenHeader>Logs</ScreenHeader>
      <div className="mb-4 flex items-center gap-2">
        <button className={`btn ${tab==='error' ? 'btn-indigo' : 'btn-dark'}`} onClick={() => { setTab('error'); setPage(1); }}>Errors</button>
        <button className={`btn ${tab==='audit' ? 'btn-indigo' : 'btn-dark'}`} onClick={() => { setTab('audit'); setPage(1); }}>Audits</button>
      </div>
      <LogsFilter
        tab={tab}
        service={service}
        status={status}
        action={action}
        text={text}
        fromEpoch={fromEpoch}
        toEpoch={toEpoch}
        setService={setService}
        setStatus={setStatus}
        setAction={setAction}
        setText={setText}
        setFromEpoch={setFromEpoch}
        setToEpoch={setToEpoch}
      />
      {(errLoading || audLoading) && <Spinner />}
      {!(errLoading || audLoading) && (
        <div className="overflow-x-auto">
          <table className="w-full bg-palette1 rounded-md">
            <thead>
              <tr className="border-b border-gray-800 text-left">
                {tab === 'error' ? (
                  <>
                    <th className="p-3 text-gray-500">Time</th>
                    <th className="p-3 text-gray-500">Service</th>
                    <th className="p-3 text-gray-500">Status</th>
                    <th className="p-3 text-gray-500">Path</th>
                    <th className="p-3 text-gray-500">Description</th>
                  </>
                ) : (
                  <>
                    <th className="p-3 text-gray-500">Time</th>
                    <th className="p-3 text-gray-500">Service</th>
                    <th className="p-3 text-gray-500">Action</th>
                    <th className="p-3 text-gray-500">Path</th>
                    <th className="p-3 text-gray-500">Details</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id} className="odd:bg-gray-800 cursor-pointer" onClick={() => setModal(row)}>
                  {tab === 'error' ? (
                    <>
                      <td className="p-3 text-gray-400">{new Date(row.createdAt).toLocaleString()}</td>
                      <td className="p-3 text-gray-400">{row.service}</td>
                      <td className="p-3 text-gray-400">{row.httpStatus}</td>
                      <td className="p-3 text-gray-400">{row.path}</td>
                      <td className="p-3 text-gray-400">{row.description}</td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 text-gray-400">{new Date(row.createdAt).toLocaleString()}</td>
                      <td className="p-3 text-gray-400">{row.service}</td>
                      <td className="p-3 text-gray-400">{row.action}</td>
                      <td className="p-3 text-gray-400">{row.path}</td>
                      <td className="p-3 text-gray-400">{row.details}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <Pagination page={page} perPage={size} count={total} path={`dashboard/logs/${tab}`} />
          </div>
        </div>
      )}
      <LogModal tab={tab} row={modal} onClose={closeModal} />
    </Wrapper>
  );
};

export default Logs;


