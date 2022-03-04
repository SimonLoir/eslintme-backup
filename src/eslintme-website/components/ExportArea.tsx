import { useEffect } from 'react';
import EnvironnementChooser from './EnvironnementChooser';

/**
 * Component representing the area were the users can export their config.
 * @prop worker The eslintme web worker.
 * @prop display Whether or not this area should be displayed on the screen.
 */
export default function ExportArea({
    worker,
    display,
}: {
    worker: Worker;
    display: boolean;
}) {
    console.assert(worker != undefined, 'No worker provided');
    console.assert(display != undefined, 'Undefined display state');

    useEffect(() => {
        worker.addEventListener('message', ({ data: { type, blob } }) => {
            switch (type) {
                case 'download-ready':
                    console.log('New download ready');
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
                    a.remove();
                    break;
            }
        });
    }, []);

    return (
        <div
            style={{
                display: display ? 'grid' : 'none',
                overflow: 'auto',
                height: '100%',
                gridTemplateColumns: '1fr 1fr',
                gap: '25px',
            }}
        >
            <div>
                <h2>Environnement</h2>
                <EnvironnementChooser worker={worker} />
            </div>
            <div>
                <h2>Export</h2>
                <p>
                    You can now export your ESLint config file in the desired
                    format. You may want to rename the file with a dot at the
                    beginning.
                </p>
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
