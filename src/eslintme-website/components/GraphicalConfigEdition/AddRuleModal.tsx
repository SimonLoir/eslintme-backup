import style from '@style/AddRuleModal.module.scss';
import { useState } from 'react';
import { rules_meta_data } from 'utils/eslint.configs';
const all_rules = Object.keys(rules_meta_data);

export default function AddRuleModal({
    current,
    hide,
    worker,
}: {
    current: string[];
    hide: () => void;
    worker: Worker;
}) {
    const [name, setName] = useState('');
    const rules = all_rules.filter((e) => e.indexOf(name) >= 0);
    const isAlreadyThere = current.indexOf(name) >= 0;
    const isValidRule = all_rules.indexOf(name) >= 0;

    const addRule = (name: string) => {
        const valid = all_rules.indexOf(name) >= 0;
        if (current.indexOf(name) >= 0) {
            alert('This rule is already in the list.');
            return hide();
        }
        if (!valid) {
            if (
                !confirm(
                    `This rule (${name}) is not a valid eslint rule. Do you want to add it anyway ?`
                )
            )
                return;
        }
        worker.postMessage({
            type: 'set-exception',
            content: { name, data: [0] },
        });
        alert(`The rule ${name} was added in the list.`);
        hide();
    };

    return (
        <>
            <div className={style.mask} onClick={hide}></div>
            <div className={style.modal}>
                <input
                    className={style.mainInput}
                    type='text'
                    placeholder='Rule name'
                    value={name}
                    onChange={(e) => setName(e.target.value.trim())}
                />
                {isAlreadyThere ? (
                    <p className={style.error}>
                        This rule can't be added because it is already in the
                        editor.
                    </p>
                ) : (
                    ''
                )}

                {!isValidRule && name.length > 0 ? (
                    <p className={style.warning}>
                        This rule is not a valid eslint rule.
                    </p>
                ) : (
                    ''
                )}
                <div className={style.list}>
                    {rules.map((r) => (
                        <p
                            key={r}
                            onClick={() => addRule(r)}
                            className={style.option}
                        >
                            <b>{r}</b> <br /> {rules_meta_data[r].description}
                        </p>
                    ))}
                </div>

                <div className={style.bottom}>
                    <span onClick={() => hide()}>Cancel</span>
                    {name.trim().length > 0 && !isAlreadyThere ? (
                        <button onClick={() => addRule(name)}>Add</button>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </>
    );
}
