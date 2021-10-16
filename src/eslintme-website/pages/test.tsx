import FuncCallSpacingRule from '@core/rules/FuncCallSpacing';
import { useEffect } from 'react';
import * as espree from 'espree';

export default function TestPage() {
    useEffect(() => {
        const fcs = new FuncCallSpacingRule();
        const content = `function test(){

        }
        test ();`;
        const program = espree.parse(content, {
            range: true,
            loc: true,
            tokens: true,
            ecmaVersion: 'latest',
        });

        program.tokens.forEach((token, id) => {
            if (token.type == 'Punctuator') {
                if (token.value == '(') {
                    fcs.testForToken('a.js', program, content, id);
                }
            }
        });

        console.log(fcs.extract());
    }, []);
    return <></>;
}
