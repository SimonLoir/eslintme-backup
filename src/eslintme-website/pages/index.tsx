import Extractor from '@core/Extractor';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const Home: NextPage = () => {
    useEffect(() => {
        const featureExtractor = new Extractor();
        console.log(
            featureExtractor.process(
                'file1.js',
                `
function test(){
    console.log('test');
    console.log('hello world');
}

test();
`
            )
        );
    }, []);
    return <></>;
};

export default Home;
