import { useEffect } from 'react';
import * as espree from 'espree';
import NoDebuggerRule from '@core/rules/NoDebuggerRule';

export default function TestPage() {
    useEffect(() => {
        const rule = new NoDebuggerRule();
        const content = `a.debugger();debugger;a.test();`;
        const program = espree.parse(content, {
            range: true,
            loc: true,
            tokens: true,
            ecmaVersion: 'latest',
            sourceType: 'module',
        });
        const { tokens } = program;
        console.log(tokens);
        tokens.forEach((token, id) => {});
    }, []);
    return <></>;
}
