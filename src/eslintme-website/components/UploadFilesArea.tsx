import { useEffect, useRef, useState } from 'react';
import FileManager from './FileManager';
import Loader from './Loader';
import OverrideOrderList from './OverrideOrderList/OverrideOrderList';

/**
 * Component representing the area were the users can upload their files.
 * @prop worker The eslintme web worker.
 * @prop display Whether or not this area should be displayed on the screen.
 */
export default function UploadFilesArea({
    worker,
    display,
}: {
    worker: Worker;
    display: boolean;
}) {
    console.assert(worker != undefined, 'No worker provided');
    console.assert(display != undefined, 'Undefined display state');

    const [filesInQueue, setFiles] = useState<FileStore>([]);
    const filesRef = useRef(filesInQueue);

    useEffect(() => {
        // Sends a message to the worker when all the file have been sent
        filesRef.current = filesInQueue;
        if (filesInQueue.filter((f) => !f.failed && !f.processed).length == 0) {
            worker.postMessage({ type: 'upload-finished' });
            window.postMessage({ type: 'process-finished' });
        }
    }, [filesInQueue]);

    useEffect(() => {
        worker.addEventListener(
            'message',
            ({ data: { type, name, error, ratio } }) => {
                switch (type) {
                    case 'processed':
                        setFiles((files) =>
                            files.map((file) =>
                                file.name != name
                                    ? file
                                    : { ...file, processed: true }
                            )
                        );

                        break;

                    case 'processing-error':
                        setFiles((files) =>
                            files.map((file) =>
                                file.name != name
                                    ? file
                                    : { ...file, failed: true }
                            )
                        );
                        console.error(error);
                        break;

                    case 'progress':
                        setFiles((files) =>
                            files.map((file) =>
                                file.name != name ? file : { ...file, ratio }
                            )
                        );
                        break;
                }
            }
        );
    }, []);

    const newFile = (name: string, content: File) => {
        if (filesRef.current.filter((f) => f.name == name).length != 0)
            return console.log('Duplicate file ' + name);
        setFiles((files) => [...files, { name, processed: false, ratio: 0 }]);
        window.postMessage({ type: 'new-file-processing' });
        worker.postMessage({ type: 'new-file', name, content });
    };

    const processing = filesInQueue.filter((f) => !f.failed && !f.processed);
    const failed = filesInQueue.reduce((acc, f) => acc + (f.failed ? 1 : 0), 0);

    return (
        <div
            style={{
                display: display ? 'grid' : 'none',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '25px',
                height: '100%',
            }}
        >
            <div style={{ overflow: 'auto' }}>
                <h2>Upload files</h2>
                <p>
                    If you want to create a config file based on other projects,
                    you can upload your JS files here. If you don't want to
                    upload flies, you can skip this step.
                </p>
                <FileManager onNewFile={newFile} />
                <p>
                    {processing.length > 0 ? (
                        <Loader
                            text={`${filesInQueue.length - processing.length}/
                    ${filesInQueue.length} files processed`}
                        />
                    ) : (
                        `${filesInQueue.length - processing.length}/
                        ${
                            filesInQueue.length
                        } files processed - ${failed} failed`
                    )}
                </p>

                {filesInQueue.length > 0 ? (
                    <div>
                        <table
                            className='table'
                            style={{ width: '100%', marginTop: 15 }}
                        >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filesInQueue.sort().map((file) => (
                                    <tr
                                        key={file.name}
                                        style={{ textAlign: 'center' }}
                                    >
                                        <td>{file.name.split('#')[0]} </td>
                                        <td>
                                            {file.processed ? (
                                                '100%'
                                            ) : file.failed ? (
                                                <b>Failed</b>
                                            ) : (
                                                (file.ratio * 100).toFixed(0) +
                                                '%'
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <p>
                            This web app processes your files locally. None of
                            the files you provide to this app will be sent
                            anywhere. If you downloaded the app, you can also
                            use ESLintME without an internet connection !
                        </p>
                    </div>
                )}
            </div>

            <div>
                <h2>Rules order</h2>
                <p>
                    You can enable and disable some sets of rules. You can also
                    choose whether or not those rules should override the rules
                    below.
                </p>
                <OverrideOrderList worker={worker} />
            </div>
        </div>
    );
}
