import { useEffect, useState } from 'react';
import GraphicalConfigEditor from './GraphicalConfigEdition/GraphicalConfigEditor';
import RuleRepresentation from './RuleGraphicalRepresentation';

/**
 * Component representing the area were the users can manage the rules of their config.
 * @prop worker The eslintme web worker.
 * @prop display Whether or not this area should be displayed on the screen.
 */
export default function ManageRulesArea({
    worker,
    display,
}: {
    worker: Worker;
    display: boolean;
}) {
    console.assert(worker != undefined, 'No worker provided');
    console.assert(display != undefined, 'Undefined display state');
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
            <div style={{ overflow: 'auto' }}>
                <h2>Rules found</h2>
                <p>
                    The rules below are the rules extracted from the files you
                    provided. If the software was not sure about a particular
                    rule, it removed it from its list. However, if you feel like
                    the software made a mistake, you can always look in the
                    "Configuration Editor" view. You may find the other options
                    the software did not keep.
                </p>
                <table className='table' style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(rules)
                            .sort()
                            .map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{e}</td>
                                        <td>
                                            <RuleRepresentation
                                                value={rules[e]}
                                            ></RuleRepresentation>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            <div style={{ overflow: 'auto' }}>
                <h2>Configuration Editor</h2>
                <GraphicalConfigEditor worker={worker} />
            </div>
        </div>
    );
}
