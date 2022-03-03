import { useEffect, useState } from 'react';
import { eslint_environnements } from 'utils/eslint.configs';

export default function EnvironnementChooser({ worker }: { worker: Worker }) {
    const [env, setEnv] = useState<{ [key: string]: boolean }>({});

    const setEnvironnement = (e: any) => {
        setEnv(e);
        worker.postMessage({ type: 'set-env', content: e });
    };

    useEffect(() => {
        setEnvironnement({
            node: true,
            browser: true,
            es6: true,
        });
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            {eslint_environnements.map((e, i) => (
                <p style={{ textAlign: 'left' }} key={i}>
                    <label style={{ cursor: 'pointer' }}>
                        <input
                            type='checkbox'
                            checked={env[e] == true}
                            onChange={(event) => {
                                const tmp = { ...env };
                                tmp[e] = event.target.checked;
                                setEnvironnement(tmp);
                            }}
                        ></input>{' '}
                        {e}
                    </label>
                </p>
            ))}
        </div>
    );
}
