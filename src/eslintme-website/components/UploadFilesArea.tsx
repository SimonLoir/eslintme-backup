import { useEffect, useRef, useState } from 'react';
import FileManager from './FileManager';
import Loader from './Loader';

export default function UploadFilesArea({
    worker,
    display,
}: {
    worker: Worker;
    display: boolean;
}) {
    const [filesInQueue, setFiles] = useState<FileStore>([]);
    const filesRef = useRef(filesInQueue);

    useEffect(() => {
        filesRef.current = filesInQueue;
        if (filesInQueue.filter((f) => !f.failed && !f.processed).length == 0)
            worker.postMessage({ type: 'upload-finished' });
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
                        console.log(error);
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
        worker.postMessage({ type: 'new-file', name, content });
    };

    const processing = filesInQueue.filter((f) => !f.failed && !f.processed);

    return (
        <div
            style={{
                display: display ? 'grid' : 'none',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '25px',
                height: '100%',
            }}
        >
            <div>
                <h2>Upload files</h2>
                <p>
                    If you want to create a config file based on other projects,
                    you can upload your JS files here. If you don't want to
                    upload flies, you can skip this step.
                </p>
                <FileManager onNewFile={newFile} />
                {processing.length > 0 ? (
                    <Loader
                        text={`${filesInQueue.length - processing.length}/
                        ${filesInQueue.length} files processed`}
                    />
                ) : (
                    ''
                )}
            </div>
            {filesInQueue.length > 0 ? (
                <div style={{ overflow: 'auto' }}>
                    <h2>Files processed</h2>
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
                                            (file.ratio * 100).toFixed(0) + '%'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
