import style from '@style/LevelChooser.module.scss';
import Clear from '@mui/icons-material/Clear';
import WarningIcon from '@mui/icons-material/Warning';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

export default function RuleLevelChooser({
    selected,
}: {
    selected: 0 | 1 | 2;
}) {
    return (
        <>
            <div
                className={
                    style.button + ' ' + (selected == 0 ? style.selected : '')
                }
            >
                <Clear className={style.none} />
            </div>
            <div
                className={
                    style.button + ' ' + (selected == 1 ? style.selected : '')
                }
            >
                <WarningIcon className={style.warning} />
            </div>
            <div
                className={
                    style.button + ' ' + (selected == 2 ? style.selected : '')
                }
            >
                <ReportGmailerrorredIcon className={style.error} />
            </div>
        </>
    );
}
