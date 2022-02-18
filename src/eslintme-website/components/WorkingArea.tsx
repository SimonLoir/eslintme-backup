import { useRouter } from 'next/dist/client/router';
import { useEffect, useRef, useState } from 'react';
import ESWorker from 'utils/worker';
import ExportArea from './ExportArea';
import Loader from './Loader';
import ManageRulesArea from './ManageRulesArea';
import UploadFilesArea from './UploadFilesArea';

export default function WorkingArea({ state }: { state: number }) {
    const router = useRouter();
    const worker = useRef<Worker>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (router.query.model) {
            worker.current = ESWorker.worker;

            worker.current.postMessage({
                type: 'set-model',
                content: router.query.model,
            });

            setLoading(false);
        }
    }, [router.query.model]);

    if (!worker.current || loading)
        return (
            <>
                <Loader text='Please wait while the app is loading'></Loader>
            </>
        );

    if (
        ['Google', 'Airbnb', 'Standard', 'None'].indexOf(
            router.query.model?.toString() as string
        ) < 0
    )
        return (
            <>
                <p>
                    The model your requested does not exist. You may want to
                    rewrite your request. The supported models are Google,
                    AirBnb, Standard and None if you want to start from scratch.
                </p>
            </>
        );

    return (
        <>
            <UploadFilesArea worker={worker.current} display={state == 0} />
            <ManageRulesArea worker={worker.current} display={state == 1} />
            <ExportArea worker={worker.current} display={state == 2} />
        </>
    );
}
