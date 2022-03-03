import style from '@style/ProgressBar.module.scss';
import { useEffect, useState } from 'react';
import ProgressBarStep from './ProgressBarStep';

/**
 * Component representing progress bar located on top of the app.
 * @prop steps A list of names for the steps.
 * @prop current The index of the current step.
 * @prop select The callback used to select a step.
 */
export default function ProgressBar({
    steps,
    current,
    select,
}: {
    steps: string[];
    current: number;
    select: (e: number) => void;
}) {
    const [loader, setLoader] = useState<any>({});
    const [count, setCount] = useState(0);

    useEffect(() => {
        window.addEventListener('message', ({ data }) => {
            if (data.type == 'new-file-processing') {
                setLoader((l: any) => {
                    l['1'] = true;
                    setCount((count) => count + 1);
                    return l;
                });
            } else if (data.type == 'process-finished') {
                setLoader((l: any) => {
                    l['1'] = false;
                    setCount((count) => 0);
                    return l;
                });
            }
        });
    }, []);

    return (
        <>
            <div
                className={style.bar}
                style={{ width: getBarWidth(steps.length) }}
            ></div>
            <div style={getGridStyle(steps.length)}>
                {steps.map((step, i) => (
                    <ProgressBarStep
                        key={step}
                        id={i}
                        name={step}
                        selected={current == i}
                        select={select}
                        loading={loader[(i + 1).toString()]}
                    />
                ))}
                <span style={{ display: 'none' }}>{count}</span>
            </div>
        </>
    );
}

function getGridStyle(count: number): React.CSSProperties {
    return {
        display: 'grid',
        gridTemplateColumns: 'repeat(' + count + ', 1fr)',
        width: '100%',
        height: '100%',
    };
}

function getBarWidth(count: number): string {
    const percent = 100 - 100 / count;
    return `calc(${percent}% - 280px)`;
}
