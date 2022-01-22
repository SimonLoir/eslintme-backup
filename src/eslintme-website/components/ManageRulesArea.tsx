import { useEffect, useState } from 'react';

export default function ManageRulesArea({
    worker,
    display,
}: {
    worker: Worker;
    display: boolean;
}) {
    const [rules, setRules] = useState<any>({});

    useEffect(() => {
        worker.addEventListener('message', ({ data }) => {
            switch (data.type) {
                case 'extract-rules':
                    console.log(data);
                    setRules((e: any) => data.payload);
                    console.log(rules);
                    break;
            }
        });
    }, []);

    return (
        <div
            style={{
                display: display ? 'grid' : 'none',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '25px',
                height: '100%',
            }}
        >
            <div>
                <h2>Rules found</h2>
                <br />
                <table className='table' style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(rules)
                            .sort()
                            .map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{e}</td>
                                        <td>{JSON.stringify(rules[e])}</td>

                                        <td>
                                            <button style={{ marginTop: 0 }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Conflicts</h2>
            </div>
        </div>
    );
}
