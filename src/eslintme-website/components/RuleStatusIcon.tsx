import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import WarningIcon from '@mui/icons-material/Warning';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import style from '@style/ComparePage.module.scss';

/**
 * Returns a rule's graphical representation based on the rule's status
 * @param props React props containing the rule's current status
 * @returns a ReactComponent representing the rule
 */
export default function RuleStatusIcon({
    status,
}: {
    status: 'error' | 'warn' | 'off' | 0 | 1 | 2;
}) {
    if (status == 'off' || status == 0)
        return (
            <div className={style.off}>
                <DisabledByDefaultIcon />
            </div>
        );
    if (status == 'warn' || status == 1)
        return (
            <div className={style.warn}>
                <WarningIcon />
            </div>
        );
    if (status == 'error' || status == 2)
        return (
            <div className={style.error}>
                <ReportGmailerrorredIcon />
            </div>
        );

    return <></>;
}
