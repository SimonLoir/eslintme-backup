import { useEffect, useRef, useState } from 'react';
import style from '@style/FromFile.module.scss';
import FileManager from '@components/FileManager';
import Loader from '@components/Loader';

export default function FromFilesPage() {
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

                    case 'output-file-ready':
                        setOutputFileContent(file);
                        setOutputFileType(outputType);
                        console.log(file, outputFileType);

                        //const downloadElement = document.createElement('a');
                        //const blob = new Blob([file]);
                        //const url = URL.createObjectURL(blob);
                        //downloadElement.href = url;
                        //downloadElement.download =
                        //    '.eslintrc.' + outputFileType;
                        //downloadElement.click();

                        break;

                    default:
                        console.assert(false, 'Not handled event received');
                        break;
                }
            }
        );
    }, []);

    useEffect(() => {
        filesRef.current = filesInQueue;
    }, [filesInQueue]);

    const newFile = (name: string, content: File) => {
        if (filesRef.current.filter((f) => f.name == name).length != 0)
            return console.log('Duplicate file ' + name);
        setFiles((files) => [...files, { name, processed: false, ratio: 0 }]);
        worker.current?.postMessage({ type: 'new-file', name, content });
    };

    const buildFile = () =>
        worker.current?.postMessage({ type: 'build-file', outputType: 'json' });

    const processing = filesInQueue.filter((f) => !f.failed && !f.processed);

    return (
        <>
            <div className={style.grid}>
                <div>
                    <h2>Control Panel</h2>
                    <button onClick={buildFile}>Build file</button>
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
                <div></div>
            </div>
        </>
    );
}
