import style from '@style/ProgressBar.module.scss';
import ProgressBarStep from './ProgressBarStep';
export default function ProgressBar({
    steps,
    current,
    select,
}: {
    steps: string[];
    current: number;
    select: (e: number) => void;
}) {
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
                    />
                ))}
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
