import { useEffect, useState } from 'react';
import AddRuleModal from './AddRuleModal';
import RuleGraphicalEditor from './RuleGraphicalEditor';

export default function GraphicalConfigEditor({ worker }: { worker: Worker }) {
    const [rules, setRules] = useState<any>({});
    const [options, setOptions] = useState<any>({});
    const [exceptions, setExceptions] = useState<any>({});
    const [addRule, setAddRule] = useState(false);

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
            {addRule ? (
                <AddRuleModal
                    current={keys}
                    hide={() => setAddRule(false)}
                    worker={worker}
                />
            ) : (
                ''
            )}
            <p>
                <button onClick={() => setAddRule(true)}>Add a new rule</button>
            </p>
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
