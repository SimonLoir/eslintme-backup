import md5 from 'md5';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileManagerProps {
    onNewFile: (hash: string, content: string) => void;
}

export default function FileManager({ onNewFile }: FileManagerProps) {
    const onDrop = useCallback((acceptedFiles) => {
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
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
        </>
    );
}
