import style from '@style/ProgressBar.module.scss';
import SettingsIcon from '@mui/icons-material/Settings';

/**
 * Component representing a step in the progress bar.
 * @prop id The ID of the step.
 * @prop name The name of the step.
 * @prop selected Whether or not the step is selected.
 * @prop select Callback used to select this step.
 * @prop loading Whether this step is pending.
 */
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
    console.assert(id >= 0, 'Step ID must be greater than 0');
    console.assert(name != undefined, 'Name must be provided');
    console.assert(selected != undefined, 'Selected must be provided');
    console.assert(select != undefined, 'Select handler must be provided');

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
