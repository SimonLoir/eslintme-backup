import { useEffect } from 'react';
import * as espree from 'espree';
import NoVarRule from '@core/rules/NoVarRule';

export default function TestPage() {
    useEffect(() => {
        const rule = new NoVarRule();
        const content = `let test = "hello world";const test2 = ""`;
        const program = espree.parse(content, {
            range: true,
            loc: true,
            tokens: true,
            ecmaVersion: 'latest',
            sourceType: 'module',
        });
        const { tokens } = program;
        console.log(tokens);
        tokens.forEach((token, id) => {
            if (token.type == 'Keyword') {
                if (['var', 'let', 'const'].indexOf(token.value) >= 0)
                    rule.testForToken('a.js', program, content, id);
            }
        });

        console.log(rule.extract());
    }, []);
    return <></>;
}
