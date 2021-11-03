import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import dragAndDrop from '@style/DragAndDrop.module.scss';

const acceptedExtensions = ['js', 'jsx'];
interface FileManagerProps {
    onNewFile: (hash: string, content: File) => void;
}

export default function FileManager({ onNewFile }: FileManagerProps) {
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

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <>
            <div {...getRootProps()} className={dragAndDrop.container}>
                <input {...getInputProps()} />
                <p>Drag and drop files or click here to select files</p>
                <p>Accepted extensions : .js</p>
            </div>
        </>
    );
}
