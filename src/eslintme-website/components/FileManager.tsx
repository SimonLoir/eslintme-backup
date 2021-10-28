import md5 from 'md5';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import dragAndDrop from '@style/DragAndDrop.module.scss';

interface FileManagerProps {
    onNewFile: (hash: string, content: string) => void;
}

export default function FileManager({ onNewFile }: FileManagerProps) {
    const onDrop = useCallback(
        (acceptedFiles) => {
            acceptedFiles.forEach((file: File) => {
                if (file.type != 'text/javascript') return;
                const reader = new FileReader();
                reader.onload = () => {
                    onNewFile(
                        file.name + '#' + md5(reader.result as string),
                        reader.result as string
                    );
                };
                reader.readAsText(file);
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
