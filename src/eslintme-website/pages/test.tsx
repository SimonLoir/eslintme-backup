import { useEffect } from 'react';
import * as espree from 'espree';
import IndentRule from '@core/rules/Indent';

export default function TestPage() {
    useEffect(() => {
        const rule = new IndentRule();
        const content = `console.log("coucou")
function test(){
    console.log('Hello world')
    const test = () => {
       console.log("hello world");
       //test

       /*
       *
       * test
       * hello world
       */
    }
}`;

        const program = espree.parse(content, {
            range: true,
            loc: true,
            tokens: true,
            ecmaVersion: 'latest',
        });

        rule.testFile('a.js', program, content);

        console.log(rule.extract());
    }, []);
    return <></>;
}
