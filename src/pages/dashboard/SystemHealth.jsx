import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/skeleton/Spinner";
import { useGetSystemHealthQuery } from "../../features/health/healthService";

const SystemHealth = () => {
  const { data: healthData, isLoading, error, refetch } = useGetSystemHealthQuery(undefined, {
    // Refetch every 30 seconds
    pollingInterval: 30000,
    // Refetch on focus
    refetchOnFocus: true,
    // Refetch on reconnect
    refetchOnReconnect: true
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'UP': return 'text-green-400';
      case 'DOWN': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'UP': return 'bg-green-500';
      case 'DOWN': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const getLatencyColor = (latency) => {
    if (latency < 100) return 'text-green-400';
    if (latency < 300) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (isLoading) {
    return (
      <Wrapper>
        <ScreenHeader>System Health</ScreenHeader>
        <Spinner />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ScreenHeader>System Health</ScreenHeader>
      
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Overall Status:</span>
            <span className={`font-bold text-lg ${getStatusColor(healthData?.overall || 'UNKNOWN')}`}>
              {healthData?.overall || 'UNKNOWN'}
            </span>
            <span className={`w-3 h-3 rounded-full ${getStatusBadge(healthData?.overall || 'UNKNOWN')}`}></span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            Auto-refreshing every 30s
          </span>
          <button
            onClick={refetch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh Now'}
          </button>
        </div>
      </div>

      {error ? (
        <div className="bg-red-900 border border-red-500 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-red-400 mb-2">Failed to Load Health Data</h3>
          <p className="text-gray-300">Unable to connect to health endpoint</p>
          <p className="text-sm text-gray-400 mt-2">{error.message || 'Network error'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(healthData.services || {}).map(([serviceName, serviceData]) => (
            <div key={serviceName} className="bg-palette1 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white capitalize">
                  {serviceName.replace('-service', '')}
                </h3>
                <span className={`w-4 h-4 rounded-full ${getStatusBadge(serviceData.status)}`}></span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status:</span>
                  <span className={`font-semibold ${getStatusColor(serviceData.status)}`}>
                    {serviceData.status}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Latency:</span>
                  <span className={`font-semibold ${getLatencyColor(serviceData.latencyMs)}`}>
                    {serviceData.latencyMs}ms
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">URL:</span>
                  <span className="text-sm text-blue-400 font-mono truncate ml-2">
                    {serviceData.url}
                  </span>
                </div>
              </div>
              
              {/* Latency bar */}
              <div className="mt-4">
                <div className="text-xs text-gray-400 mb-1">Response Time</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      serviceData.latencyMs < 100 ? 'bg-green-500' :
                      serviceData.latencyMs < 300 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((serviceData.latencyMs / 500) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {serviceData.latencyMs < 100 ? 'Fast' : 
                   serviceData.latencyMs < 300 ? 'Moderate' : 'Slow'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Summary Stats */}
      {healthData?.services && (
        <div className="mt-8 bg-palette1 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {Object.values(healthData.services).filter(s => s.status === 'UP').length}
              </div>
              <div className="text-sm text-gray-400">Services UP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {Object.values(healthData.services).filter(s => s.status === 'DOWN').length}
              </div>
              <div className="text-sm text-gray-400">Services DOWN</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {Object.values(healthData.services).length}
              </div>
              <div className="text-sm text-gray-400">Total Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {Math.round(Object.values(healthData.services).reduce((acc, s) => acc + s.latencyMs, 0) / Object.values(healthData.services).length)}ms
              </div>
              <div className="text-sm text-gray-400">Avg Latency</div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default SystemHealth;
