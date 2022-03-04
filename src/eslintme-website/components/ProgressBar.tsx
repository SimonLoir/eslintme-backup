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
    console.assert(
        steps != undefined && steps.length != 0,
        'No steps provided'
    );
    console.assert(current != undefined, 'No current provided');
    console.assert(select != undefined, 'No select handler provided');

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

/**
 * Generates css for a grid based on the number of columns.
 * @param count The number of columns.
 * @returns css properties to create a grid.
 */
function getGridStyle(count: number): React.CSSProperties {
    console.assert(count != undefined && count > 0, 'Invalid count');
    return {
        display: 'grid',
        gridTemplateColumns: 'repeat(' + count + ', 1fr)',
        width: '100%',
        height: '100%',
    };
}

/**
 * Gets the width of the progress bar.
 * @param count The number of steps on the progress bar.
 * @returns The width the progress bar should have.
 */
function getBarWidth(count: number): string {
    console.assert(count != undefined && count > 0, 'Invalid count');
    const percent = 100 - 100 / count;
    return `calc(${percent}% - 280px)`;
}
