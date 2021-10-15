import Extractor from '@core/Extractor';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const Home: NextPage = () => {
    useEffect(() => {
        const featureExtractor = new Extractor();
        featureExtractor.process(
            'file1.js',
            `
function test(){
    console.log('test');
    console.log('hello world');
}

test();`
        );

        featureExtractor.process(
            'file2.js',
            `
 console.log('test');`
        );
        const result = featureExtractor.eolLastRule.extract();
        console.log(result);
    }, []);
    return <></>;
};

export default Home;
