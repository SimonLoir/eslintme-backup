import { useEffect } from 'react';
import { rules_meta_data } from 'utils/eslint.configs';

export default function TestPage() {
    useEffect(() => {
        console.log(rules_meta_data);
    }, []);
    return <></>;
}
