import style from '@style/ProgressBar.module.scss';
export default function ProgressBarStep({
    id,
    name,
    selected,
    select,
}: {
    id: number;
    name: string;
    selected: boolean;
    select: (e: number) => void;
}) {
    return (
        <div className={style.step} onClick={() => select(id)}>
            <div
                className={style.point + ' ' + (selected ? style.selected : '')}
            >
                {id + 1}
            </div>
        </div>
    );
}
