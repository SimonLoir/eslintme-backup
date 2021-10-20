import { useEffect } from 'react';
import * as espree from 'espree';
import DotLocationRule from '@core/rules/DotLocationRule';

export default function TestPage() {
    useEffect(() => {
        const cs = new DotLocationRule();
        const content = `hello.world()
        hello.
        world()
        
        hello
        .world()

        test
        .
        test()
        
        const a = [...test]`;
        const program = espree.parse(content, {
            range: true,
            loc: true,
            tokens: true,
            ecmaVersion: 'latest',
        });

        program.tokens.forEach((token, id) => {
            if (token.type == 'Punctuator') {
                if (token.value == '.') {
                    cs.testForToken('a.js', program, content, id);
                }
            }
        });

        console.log(cs.extract());
    }, []);
    return <></>;
}
