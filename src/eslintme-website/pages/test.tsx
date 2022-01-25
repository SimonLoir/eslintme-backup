import { useEffect } from 'react';
import * as espree from 'espree';
import QuotesRule from '@core/rules/QuotesRule';

export default function TestPage() {
    useEffect(() => {
        const rule = new QuotesRule();
        const content = `console.log('hello world'); 
        function test(){
            'use strict';
            console.log('hello' + 'world' + 'l\\'enfant');
            console.log("l'enfant")
        }`;
        const program = espree.parse(content, {
            range: true,
            loc: true,
            tokens: true,
            ecmaVersion: 'latest',
            sourceType: 'module',
        });
        const { tokens } = program;
        tokens.forEach((token, id) => {
            if (token.type == 'String') {
                rule.testForToken('a.js', program, content, id);
            }
        });
    }, []);
    return <></>;
}
