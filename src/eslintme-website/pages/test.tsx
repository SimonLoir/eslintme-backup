import FuncCallSpacing from '@core/rules/FuncCallSpacing';
import { useEffect } from 'react';
import * as espree from 'espree';

export default function TestPage() {
    useEffect(() => {
        const fcs = new FuncCallSpacing();
        const content = `console.log ("test")`;
        const program = espree.parse(content, {
            range: true,
            loc: true,
            tokens: true,
            ecmaVersion: 'latest',
        });

        program.tokens.forEach((token, id) => {
            console.log(token);
        });

        console.log(program);
    }, []);
    return <></>;
}
