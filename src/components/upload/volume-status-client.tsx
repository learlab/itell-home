'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchVolumeStatus } from '@/features/upload/status';
import { fetchVolumeData } from '@/features/volumes/request';
import { VolumeCard } from '@/components/volumes/volume-card';

export function VolumeStatusClient({ volumeId }: { volumeId: string }) {
  const { data: statusData, isLoading: statusLoading, error: statusError, dataUpdatedAt } = useQuery({
    queryKey: ['volumeStatus', volumeId],
    queryFn: () => fetchVolumeStatus(volumeId),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      // Stop polling if status is completed or failed
      if (status === 'completed' || status === 'failed') {
        return false;
      }
      // Poll every 15 seconds
      return 15000;
    },
  });

  // Fetch volume data only when status is completed
  const { data: volumeData, isLoading: volumeLoading, error: volumeError } = useQuery({
    queryKey: ['volumeData', volumeId],
    queryFn: () => fetchVolumeData(volumeId),
    enabled: statusData?.status === 'completed',
  });

  // Show volume card when status is completed and volume data is loaded
  if (statusData?.status === 'completed' && volumeData) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Your document is ready!
          </h1>
          <VolumeCard volume={volumeData} documentId={volumeId} />
        </div>
      </div>
    );
  }

  // Show error state for volume fetch failure
  if (statusData?.status === 'completed' && volumeError) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Document Ready, but...
          </h1>
          <div className="rounded-lg bg-red-50 p-6 shadow border border-red-200">
            <p className="font-semibold text-red-900">Failed to load volume data</p>
            <pre className="mt-2 text-sm text-red-700">
              {volumeError instanceof Error ? volumeError.message : 'Unknown error'}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state for volume data
  if (statusData?.status === 'completed' && volumeLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Loading your document...
          </h1>
          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-gray-600">Fetching volume data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show status polling UI for pending/failed status
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          We are processing your document
        </h1>
        <div className="mb-4 rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-600">
            Volume ID: <span className="font-mono font-semibold">{volumeId}</span>
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Last updated: {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleString() : 'Never'}
          </p>
        </div>

        {statusLoading && (
          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-gray-600">Loading status...</p>
          </div>
        )}

        {statusError && (
          <div className="rounded-lg bg-red-50 p-6 shadow border border-red-200">
            <p className="font-semibold text-red-900">Error:</p>
            <pre className="mt-2 text-sm text-red-700">
              {statusError instanceof Error ? statusError.message : 'Unknown error'}
            </pre>
          </div>
        )}

        {statusData && (
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-gray-900">Status Response:</p>
              {(statusData.status === 'completed' || statusData.status === 'failed') && (
                <span className="text-xs text-gray-500">(Polling stopped)</span>
              )}
            </div>
            <pre className="overflow-auto rounded bg-gray-100 p-4 text-sm">
              {JSON.stringify(statusData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
