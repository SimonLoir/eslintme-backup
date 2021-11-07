export default function RuleData({ value }: { value: any }) {
    if (Array.isArray(value)) {
        if (typeof value == 'object') {
            return (
                <ol>
                    {value.map((e) => (
                        <li key={e}>
                            <RuleData value={e} />
                        </li>
                    ))}
                </ol>
            );
        }
    }
    if (typeof value == 'object') {
        return (
            <ul>
                {Object.keys(value).map((e) => (
                    <li key={e}>
                        {e} : <RuleData value={value[e]} />
                    </li>
                ))}
            </ul>
        );
    }
    return <>{JSON.stringify(value)}</>;
}
