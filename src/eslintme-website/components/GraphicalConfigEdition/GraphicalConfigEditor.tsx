import { useEffect, useState } from 'react';
import RuleGraphicalEditor from './RuleGraphicalEditor';

export default function GraphicalConfigEditor({ worker }: { worker: Worker }) {
    const [rules, setRules] = useState<any>({});
    const [options, setOptions] = useState<any>({});
    const [exceptions, setExceptions] = useState<any>({});
    const keys = Object.keys({ ...rules, ...exceptions }).sort();

    useEffect(() => {
        worker.addEventListener('message', ({ data }) => {
            switch (data.type) {
                case 'export-config':
                    setRules(data.payload.rules);
                    setExceptions(data.payload.exceptions);
                    setOptions(data.payload.options);
                    break;
            }
        });
    }, []);

    return (
        <>
            {keys.map((e) => (
                <RuleGraphicalEditor
                    key={e}
                    worker={worker}
                    data={rules[e]}
                    exception={exceptions[e]}
                    options={options[e]}
                    name={e}
                />
            ))}
        </>
    );
}
