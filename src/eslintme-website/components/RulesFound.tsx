import RuleRepresentation from './RuleGraphicalRepresentation';

export default function RulesFound({ data: rules }: { data: any }) {
    return (
        <>
            {Object.keys(rules).map((rule_name) => {
                return (
                    <div key={rule_name}>
                        <b>{rule_name}</b>
                        <br />
                        <RuleRepresentation value={rules[rule_name]} />
                    </div>
                );
            })}
        </>
    );
}
