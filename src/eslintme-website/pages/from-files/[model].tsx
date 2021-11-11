import { useEffect, useRef, useState } from 'react';
import style from '@style/FromFile.module.scss';
import FileManager from '@components/FileManager';
import Loader from '@components/Loader';
import { useRouter } from 'next/dist/client/router';

export default function FromFilesPage() {
    const router = useRouter();
    const [filesInQueue, setFiles] = useState<FileStore>([]);
    const filesRef = useRef(filesInQueue);
    const [outputFileContent, setOutputFileContent] = useState('{}');
    const [outputFileType, setOutputFileType] = useState('json');
    const worker = useRef<Worker | null>();

    useEffect(() => {
        // Creates a new worker for the page
        // The worker is destroyed once the page is reloaded
        worker.current = new Worker(
            new URL('../../src/worker.worker.ts', import.meta.url)
        );

        worker.current.postMessage({
            type: 'set-model',
            content: router.query.model,
        });

        worker.current.addEventListener(
            'message',
            ({ data: { type, name, file, outputType, error, ratio } }) => {
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

                        break;

                    case 'output-to-view':
                    case 'output-file-ready':
                        setOutputFileContent(file);
                        setOutputFileType(outputType);
                        console.log(file, outputFileType);

                        if (type != 'output-to-view') {
                            const downloadElement = document.createElement('a');
                            const blob = new Blob([file]);
                            const url = URL.createObjectURL(blob);
                            downloadElement.href = url;
                            downloadElement.download =
                                '.eslintrc.' + outputFileType;
                            downloadElement.click();
                        }

                        break;

                    default:
                        console.warn(
                            'The event received does not match any event : ',
                            type
                        );
                        break;
                }
            }
        );
    }, []);

    useEffect(() => {
        filesRef.current = filesInQueue;
        if (filesInQueue.filter((f) => !f.failed && !f.processed).length == 0)
            worker.current?.postMessage({
                type: 'build-file',
                outputType: 'json',
                call: 'output-to-view',
            });
    }, [filesInQueue]);

    const newFile = (name: string, content: File) => {
        if (filesRef.current.filter((f) => f.name == name).length != 0)
            return console.log('Duplicate file ' + name);
        setFiles((files) => [...files, { name, processed: false, ratio: 0 }]);
        worker.current?.postMessage({ type: 'new-file', name, content });
    };

    const buildFile = (type: 'json') =>
        worker.current?.postMessage({ type: 'build-file', outputType: type });

    const processing = filesInQueue.filter((f) => !f.failed && !f.processed);

    return (
        <>
            <div className={style.grid}>
                <div>
                    <h2>Control Panel</h2>
                    <button onClick={() => buildFile('json')}>
                        Build file
                    </button>
                    <br />
                    <br />
                    <h2>Extract rules from files</h2>
                    <FileManager onNewFile={newFile} />

                    {processing.length > 0 ? (
                        <Loader
                            text={`${filesInQueue.length - processing.length}/
                        ${filesInQueue.length} files processed`}
                        />
                    ) : (
                        ''
                    )}

                    <table style={{ width: '100%' }}>
                        <tbody>
                            {filesInQueue.sort().map((file) => (
                                <tr key={file.name}>
                                    <td>{file.name.split('#')[0]} </td>
                                    <td style={{ textAlign: 'right' }}>
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
                <div>
                    <h2>Rules found</h2>

                    <h2>Conflicts</h2>

                    <h2>Your exceptions</h2>
                </div>
            </div>
        </>
    );
}
