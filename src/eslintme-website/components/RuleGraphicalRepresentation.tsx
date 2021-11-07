import RuleData from './RuleData';
import RuleStatusIcon from './RuleStatusIcon';

function isValidValue(value: number | string) {
    return (
        typeof value == 'number' ||
        (typeof value == 'string' &&
            ['error', 'warn', 'off'].indexOf(value) >= 0)
    );
}

export default function RuleRepresentation({
    value,
}: {
    value: number | string | any[];
}) {
    if (!value) return <></>;
    if (typeof value == 'object') {
        let statusIcon: JSX.Element | null = null;
        if (isValidValue(value[0]))
            statusIcon = <RuleStatusIcon status={value[0] as any} />;
        else console.log(value);

        const [, ...v] = value;

        return (
            <>
                {statusIcon}
                <RuleData value={v} />
            </>
        );
    }
    if (isValidValue(value)) return <RuleStatusIcon status={value as any} />;
    return <></>;
}
