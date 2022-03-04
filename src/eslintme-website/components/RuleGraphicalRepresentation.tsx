import RuleData from './RuleData';
import RuleStatusIcon from './RuleStatusIcon';

/**
 * Tells whether a rule is valid or not.
 * @param value The value of the rule
 * @returns true if the rule is valid, false otherwise.
 */
function isValidValue(value: number | string) {
    return (
        typeof value == 'number' ||
        (typeof value == 'string' &&
            ['error', 'warn', 'off'].indexOf(value) >= 0)
    );
}

/**
 * Component representing a rule in a graphical manner.
 * @prop value The value of the rule.
 * @prop icon Whether or not an icon should be displayed.
 */
export default function RuleRepresentation({
    value,
    icon = true,
}: {
    value: number | string | any[];
    icon?: boolean;
}) {
    console.assert(icon != undefined, 'icon should be a boolean.');
    if (!value) return <></>;
    if (typeof value == 'object') {
        let statusIcon: JSX.Element | null = null;
        if (isValidValue(value[0]) && icon)
            statusIcon = <RuleStatusIcon status={value[0] as any} />;

        const [, ...v] = value;

        return (
            <>
                {statusIcon}
                <RuleData value={v} />
            </>
        );
    }
    if (isValidValue(value) && icon)
        return <RuleStatusIcon status={value as any} />;
    return <></>;
}
