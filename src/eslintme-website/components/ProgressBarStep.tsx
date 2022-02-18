import style from '@style/ProgressBar.module.scss';
import SettingsIcon from '@mui/icons-material/Settings';
export default function ProgressBarStep({
    id,
    name,
    selected,
    select,
    loading,
}: {
    id: number;
    name: string;
    selected: boolean;
    select: (e: number) => void;
    loading: boolean;
}) {
    return (
        <div className={style.step} onClick={() => select(id)}>
            <div
                className={style.point + ' ' + (selected ? style.selected : '')}
            >
                {loading ? (
                    <SettingsIcon className='rotating-gear'></SettingsIcon>
                ) : (
                    id + 1
                )}
            </div>
        </div>
    );
}
