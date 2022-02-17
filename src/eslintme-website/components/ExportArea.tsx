import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import GraphicalConfigEditor from './GraphicalConfigEdition/GraphicalConfigEditor';

export default function ExportArea({
    worker,
    display,
}: {
    worker: Worker;
    display: boolean;
}) {
    const [content, setContent] = useState('{"rules":{}}');

    useEffect(() => {
        worker.addEventListener('message', ({ data: { type, blob } }) => {
            switch (type) {
                case 'download-ready':
                    /**
                     * The worker may indicate that a config file has been generated
                     * The renderer makes it downloadable
                     */

                    // Creating an URL for the blob
                    const url = URL.createObjectURL(blob);

                    // We create an "a" element
                    const a = document.createElement('a');

                    // The element points to the blob's url
                    a.href = url;

                    // We make it downloadable
                    a.download =
                        '.eslintrc.' +
                        blob.type
                            .replace('application/', '')
                            .replace('javascript', 'js');

                    // We simulate a click on the element to trigger the download
                    a.click();
                    break;
            }
        });
    }, []);

    return (
        <div
            style={{
                display: display ? 'block' : 'none',
                overflow: 'auto',
                height: '100%',
            }}
        >
            <div>
                <h2>Your config file</h2>
                <p>
                    This is how your config file looks like after completing the
                    first steps. If you want to override certain parts of the
                    config file, you can edit the "customize" field.
                </p>
                <Editor
                    defaultLanguage='json'
                    defaultValue={content}
                    theme='vs-dark'
                    height='25vh'
                    options={{ readOnly: true }}
                />
                <GraphicalConfigEditor worker={worker} />
            </div>
            <div>
                <h2>Export</h2>
                <button
                    onClick={() =>
                        worker.postMessage({
                            type: 'build-file',
                            format: 'json',
                        })
                    }
                >
                    json file
                </button>
                <button
                    onClick={() =>
                        worker.postMessage({
                            type: 'build-file',
                            format: 'js',
                        })
                    }
                >
                    js file
                </button>
                <button
                    onClick={() =>
                        worker.postMessage({
                            type: 'build-file',
                            format: 'yml',
                        })
                    }
                >
                    yml file
                </button>
            </div>
        </div>
    );
}
