const LogModal = ({ tab, row, onClose }) => {
  if (!row) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-black text-green-400 w-11/12 md:w-8/12 lg:w-6/12 rounded shadow max-h-[80vh] overflow-auto border border-green-800">
        <div className="p-4 border-b border-green-800 flex justify-between items-center">
          <h3 className="font-semibold text-green-300">{tab === 'error' ? 'Error detail' : 'Audit detail'}</h3>
          <button className="px-3 py-1 border border-green-700 rounded text-green-300 hover:bg-green-900/40" onClick={onClose}>Close</button>
        </div>
        <div className="p-4 space-y-3 text-sm">
          {tab === 'error' ? (
            <>
              <div><span className="font-semibold text-green-300">Time:</span> {new Date(row.createdAt).toLocaleString()}</div>
              <div><span className="font-semibold text-green-300">Service:</span> {row.service}</div>
              <div><span className="font-semibold text-green-300">HTTP Status:</span> {row.httpStatus}</div>
              <div><span className="font-semibold text-green-300">Path:</span> {row.path}</div>
              <div><span className="font-semibold text-green-300">Operation:</span> {row.operation}</div>
              <div><span className="font-semibold text-green-300">Exception:</span> {row.exceptionType}</div>
              {row.stacktrace && (
                <div>
                  <div className="font-semibold mb-1 text-green-300">Stacktrace</div>
                  <pre className="whitespace-pre-wrap bg-black p-2 rounded border border-green-800 text-green-300 font-mono">{row.stacktrace}</pre>
                </div>
              )}
              <div>
                <div className="font-semibold mb-1 text-green-300">Description</div>
                <pre className="whitespace-pre-wrap bg-black p-2 rounded border border-green-800 text-green-300 font-mono">{row.description}</pre>
              </div>
            </>
          ) : (
            <>
              <div><span className="font-semibold text-green-300">Time:</span> {new Date(row.createdAt).toLocaleString()}</div>
              <div><span className="font-semibold text-green-300">Service:</span> {row.service}</div>
              <div><span className="font-semibold text-green-300">Action:</span> {row.action}</div>
              <div><span className="font-semibold text-green-300">Path:</span> {row.path}</div>
              <div><span className="font-semibold text-green-300">Method:</span> {row.method}</div>
              <div className="font-semibold mb-1 text-green-300">Details</div>
              <pre className="whitespace-pre-wrap bg-black p-2 rounded border border-green-800 text-green-300 font-mono">{row.details}</pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogModal;


