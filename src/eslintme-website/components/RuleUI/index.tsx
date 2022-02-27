import { rules_meta_data } from 'utils/eslint.configs';

export default function RuleUI({ name }: { name: string }) {
    if (rules_meta_data[name] == undefined)
        return <p>Could not load a graphical editor for this rule.</p>;
    return <></>;
}
