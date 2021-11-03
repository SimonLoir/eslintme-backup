import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import dragAndDrop from '@style/DragAndDrop.module.scss';

const acceptedExtensions = ['js', 'jsx'];
interface FileManagerProps {
    onNewFile: (hash: string, content: File) => void;
}

export default function FileManager({ onNewFile }: FileManagerProps) {
    const [onNativeDevice, setOnNativeDevice] = useState(false);
    const onDrop = useCallback(
        (acceptedFiles) => {
            acceptedFiles.forEach((file: File) => {
                const file_extension = file.name.split('.').pop();
                if (!file_extension) return;
                if (acceptedExtensions.indexOf(file_extension) < 0) return;

                // The setTimeout is used to prevent the thread to be blocked.
                setTimeout(() => {
                    onNewFile(
                        file.name + '#' + file.lastModified + '.' + file.size,
                        file
                    );
                }, 0);
            });
        },
        [onNewFile]
    );

    const onOpenFolder = useCallback(() => {
        window.postMessage({ type: 'select-dirs' });
        console.log('dirs');
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    useEffect(() => {
        if ('native' in window) {
            setOnNativeDevice(true);
            window.addEventListener('message', (e) => {});
        }
    }, []);

    return (
        <>
            {onNativeDevice ? (
                <>
                    <button onClick={onOpenFolder}>Open from folder</button>
                </>
            ) : null}
            <div {...getRootProps()} className={dragAndDrop.container}>
                <input {...getInputProps()} />
                <p>Drag and drop files or click here to select files</p>
                <p>Accepted extensions : .js</p>
            </div>
        </>
    );
}
