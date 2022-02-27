import { rules_meta_data } from 'utils/eslint.configs';
import SchemaEntity from './SchemaEntity';

export default function RuleUI({ name }: { name: string }) {
    if (rules_meta_data[name]?.schema == undefined)
        return <p>Could not load a graphical editor for this rule.</p>;
    const schema: any[] = rules_meta_data[name].schema;
    return (
        <>
            {JSON.stringify(schema)}
            {schema.map((e, i) => (
                <SchemaEntity data={e} key={i} />
            ))}
        </>
    );
}
