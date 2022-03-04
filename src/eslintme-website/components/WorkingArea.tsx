import { useRouter } from 'next/dist/client/router';
import { useEffect, useRef, useState } from 'react';
import {
    airbnb,
    google,
    recommended_rules,
    standard,
} from 'utils/eslint.configs';
import ESWorker from 'utils/worker';
import ExportArea from './ExportArea';
import Loader from './Loader';
import ManageRulesArea from './ManageRulesArea';
import UploadFilesArea from './UploadFilesArea';

/**
 * Component representing the working area.
 * @prop state The state of the working area
 *     - 0 : File Upload Area
 *     - 1 : Rules Management Area
 *     - 2 : Export Area
 */
export default function WorkingArea({ state }: { state: number }) {
    const router = useRouter();
    const worker = useRef<Worker>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (router.query.model) {
            // Getting an instance of the worker
            worker.current = ESWorker.worker;

            // We set the current model
            worker.current.postMessage({
                type: 'set-model',
                content: router.query.model,
            });

            // We populate the worker with the models we might use
            worker.current.postMessage({
                type: 'store-rules-set',
                content: { name: 'Google', data: google },
            });
            worker.current.postMessage({
                type: 'store-rules-set',
                content: { name: 'Airbnb', data: airbnb },
            });
            worker.current.postMessage({
                type: 'store-rules-set',
                content: { name: 'Standard', data: standard },
            });
            worker.current.postMessage({
                type: 'store-rules-set',
                content: { name: 'recommended', data: recommended_rules },
            });

            // We allow the website to be displayed when the worker is ready
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
