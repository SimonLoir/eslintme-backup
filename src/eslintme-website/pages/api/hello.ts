// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Extractor from '@core/Extractor';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const ext = new Extractor();
    const ast = ext.process(
        'test',
        `
function test(){
    console.log('Hello world');
}


test()
    `
    );
    res.status(200).json(ast);
}
