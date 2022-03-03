import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import dragAndDrop from '@style/DragAndDrop.module.scss';
import md5 from 'md5';

const acceptedExtensions = ['js', 'jsx'];
interface FileManagerProps {
    onNewFile: (hash: string, content: File) => void;
}

/**
 * Components that lets the user upload files.
 * @prop onNewFile Callback called when a new file is uploaded.
 */
export default function FileManager({ onNewFile }: FileManagerProps) {
    const [onNativeDevice, setOnNativeDevice] = useState(false);
    const onDrop = useCallback(
        (acceptedFiles) => {
            acceptedFiles.forEach((file: File) => {
                const file_extension = file.name.split('.').pop();
                if (!file_extension) return;
                if (acceptedExtensions.indexOf(file_extension) < 0) return;

                // The setTimeout is used to prevent the thread to be blocked.
                // The progress can then be rendered on the screen
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

    /**
     * Sends a message to show a Directory Selection Dialog.
     */
    const onOpenFolder = useCallback(() => {
        window.postMessage({ type: 'select-dirs' });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    useEffect(() => {
        /**
         * Adds import capabilities from a directory thanks to electron.
         */
        if ('native' in window) {
            // Tells the component that it is rendered in a "native" app.
            setOnNativeDevice(true);

            // Link between electron and the app
            window.addEventListener('message', ({ data }) => {
                if (data.type == 'new-file') {
                    const { file, path } = data;
                    onNewFile(
                        file.name +
                            '#' +
                            file.lastModified +
                            '.' +
                            file.size +
                            'from-import' +
                            md5(path),
                        file
                    );
                }
            });
        }
    }, []);

    return (
        <>
            {onNativeDevice ? (
                /* This is only displayed if the app runs in an electron wrapper. */
                <>
                    <p>
                        <button onClick={onOpenFolder}>Open from folder</button>
                    </p>
                </>
            ) : null}
            <div {...getRootProps()} className={dragAndDrop.container}>
                <input {...getInputProps()} />
                <p style={{ textAlign: 'center' }}>
                    Drag and drop files or click here to select files
                </p>
                <p style={{ textAlign: 'center' }}>Accepted extensions : .js</p>
            </div>
        </>
    );
}
