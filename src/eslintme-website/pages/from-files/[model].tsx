import { useCallback, useEffect, useRef, useState } from 'react';
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
            ({ data: { type, name, file, outputType } }) => {
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
                        break;

                    case 'output-file-ready':
                        setOutputFileContent(file);
                        setOutputFileType(outputFileType);
                        break;

                    default:
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
        setFiles((files) => [...files, { name, content, processed: false }]);
        worker.current?.postMessage({ type: 'new-file', name, content });
    };

    const buildFile = () =>
        worker.current?.postMessage({ type: 'build-file', outputType: 'json' });

    return (
        <>
            <div className={style.grid}>
                <div>
                    <h2>Control Panel</h2>
                    <button onClick={buildFile}>Build file</button>
                    <h2>Extract rules from files</h2>
                    <FileManager onNewFile={newFile} />
                    <table style={{ width: '100%' }}>
                        <tbody>
                            {filesInQueue.map((file) => (
                                <tr key={file.name}>
                                    <td>{file.name} </td>
                                    <td>
                                        {file.processed ? (
                                            'Processed'
                                        ) : file.failed ? (
                                            <b>Failed</b>
                                        ) : (
                                            'Processing...'
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
