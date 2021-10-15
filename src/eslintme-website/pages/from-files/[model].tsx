import { useEffect } from 'react';

export default function FromFilesPage() {
    useEffect(() => {
        const worker = new Worker(
            new URL('../../src/worker.worker.ts', import.meta.url)
        );

        worker.postMessage('test');
    }, []);
    return <></>;
}
