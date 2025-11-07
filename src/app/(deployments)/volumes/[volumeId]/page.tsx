import { VolumeStatusClient } from '@/components/upload/volume-status-client';

export default async function VolumeDebugPage({
	params,
}: {
	params: Promise<{ volumeId: string }>;
}) {
	const { volumeId } = await params;

	return <VolumeStatusClient volumeId={volumeId} />;
}
