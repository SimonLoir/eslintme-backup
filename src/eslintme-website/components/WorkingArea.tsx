import { useRouter } from 'next/dist/client/router';
import { useEffect, useRef, useState } from 'react';
import ESWorker from 'utils/worker';
import UploadFilesArea from './UploadFilesArea';

export default function WorkingArea({ state }: { state: number }) {
    const router = useRouter();
    const worker = useRef<Worker>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        worker.current = ESWorker.worker;

        worker.current.postMessage({
            type: 'set-model',
            content: router.query.model,
        });

        setLoading(false);
    }, []);

    if (!worker.current || loading)
        return <>Please wait while the app is loading...</>;

    if (state == 0) return <UploadFilesArea worker={worker.current} />;

    return <>Fatal error</>;
}
