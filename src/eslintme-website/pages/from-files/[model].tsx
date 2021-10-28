import { useEffect, useRef, useState } from 'react';
import style from '@style/FromFile.module.scss';
import Editor from '@monaco-editor/react';
import FileManager from '@components/FileManager';

export default function FromFilesPage() {
    const [filesInQueue, setFiles] = useState<FileStore>([]);
    const filesRef = useRef(filesInQueue);
    const [outputFileContent, setOutputFileContent] = useState('{}');
    const [outputFileType, setOutputFileType] = useState('json');
    const worker = useRef<Worker | null>();

    useEffect(() => {
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
                        break;
                }
            }
        );
    }, []);

    useEffect(() => {
        filesRef.current = filesInQueue;
    }, [filesInQueue]);

    const newFile = (name: string, content: string) => {
        if (filesRef.current.filter((f) => f.name == name).length != 0)
            return alert('Duplicate file ' + name);
        setFiles((files) => [
            ...files,
            { name, content, processed: false, ratio: 0 },
        ]);
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
                        <p>Some files are still being processed</p>
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
                    <Editor
                        defaultLanguage={outputFileType}
                        value={outputFileContent}
                        theme='vs-dark'
                        options={{ readOnly: true }}
                    />
                </div>
            </div>
        </>
    );
}
