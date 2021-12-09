import { useEffect } from 'react';
import Editor from '@monaco-editor/react';

export default function ExportArea({
    worker,
    display,
}: {
    worker: Worker;
    display: boolean;
}) {
    useEffect(() => {
        worker.addEventListener('message', ({ data: { type, name } }) => {
            switch (type) {
                case '//event':
                    //
                    break;
            }
        });
    }, []);

    return (
        <div
            style={{
                display: display ? 'grid' : 'none',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '25px',
                height: '100%',
            }}
        >
            <div>
                <h2>Your config file</h2>
                <br />
                <Editor
                    defaultLanguage='json'
                    defaultValue='{}'
                    theme='vs-dark'
                    height='50vh'
                />
            </div>
            <div>
                <h2>Customize</h2>
                <br />
                <Editor
                    defaultLanguage='json'
                    defaultValue='{}'
                    theme='vs-dark'
                    height='50vh'
                />
            </div>
            <div>
                <h2>Export</h2>
                <button>json file</button>
                <button>js file</button>
                <button>yml file</button>
            </div>
        </div>
    );
}
