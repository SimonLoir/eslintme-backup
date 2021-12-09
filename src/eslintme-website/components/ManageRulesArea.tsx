import { useEffect } from 'react';

export default function ManageRulesArea({
    worker,
    display,
}: {
    worker: Worker;
    display: boolean;
}) {
    useEffect(() => {
        worker.addEventListener('message', ({ data }) => {
            switch (data.type) {
                case 'extract-rules':
                    console.log(data);
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
                <h2>Rules found</h2>
            </div>
            <div>
                <h2>Conflicts</h2>
            </div>
            <div>
                <h2>Exceptions</h2>
                <div>
                    <input type='radio' value='recommended' name='force' />
                    Don't force anything
                    <br />
                    <input type='radio' value='recommended' name='force' />
                    Force eslint recommended rules
                    <br />
                    <input type='radio' value='model' name='force' /> Force
                    model rules
                    <br />
                    <input type='radio' value='model' name='force' /> Force
                    eslint recommended rules, then model rules
                    <br />
                    <input type='radio' value='model' name='force' /> Force
                    model rules, then eslint recommended rules
                </div>
            </div>
        </div>
    );
}
