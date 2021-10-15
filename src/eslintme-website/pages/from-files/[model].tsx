import { useCallback, useEffect, useRef, useState } from 'react';
import style from '@style/FromFile.module.scss';
import Editor from '@monaco-editor/react';
import FileManager from '@components/FileManager';

export default function FromFilesPage() {
    const worker = useRef<Worker | null>();
    const [json, setJson] = useState('{}');
    const [files, setFiles] = useState<FileStore>([]);

    useEffect(() => {
        worker.current = new Worker(
            new URL('../../src/worker.worker.ts', import.meta.url)
        );

        worker.current.addEventListener(
            'message',
            ({ data: { type, name } }) => {
                setFiles((files) =>
                    files.map((file) =>
                        file.name != name ? file : { ...file, processed: true }
                    )
                );
                console.log(type, name, files);
            }
        );
    }, []);

    const onNewFile = (name: string, content: string) => {
        //if (files.filter((f) => f.name == name).length != 0) return;
        setFiles((files) => [...files, { name, content, processed: false }]);
        worker.current?.postMessage({ type: 'new-file', name, content });
    };

    return (
        <>
            <div className={style.grid}>
                <div>
                    <h2>Extract rules from files</h2>
                    <FileManager onNewFile={onNewFile} />
                    {files.map((file) => (
                        <p key={file.name}>
                            {file.name}{' '}
                            {file.processed ? 'Processed' : 'Processing...'}
                        </p>
                    ))}
                </div>
                <div>
                    <Editor
                        defaultLanguage='json'
                        value={json}
                        theme='vs-dark'
                        options={{ readOnly: true }}
                    />
                </div>
            </div>
        </>
    );
}
