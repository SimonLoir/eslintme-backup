import Extractor from '@core/Extractor';

// @see https://medium.com/lagierandlagier/nextjs-webassembly-and-web-workers-a5f7c19d4fd0

const worker: Worker = self as unknown as Worker;
const extractor = new Extractor();
worker.addEventListener('message', ({ data: { name, content, type } }) => {
    if (type == 'new-file') {
        console.time(name);
        extractor.process(name, content);
        console.timeEnd(name);
        setTimeout(() => {
            worker.postMessage({ type: 'processed', name });
        }, 2000);
    }
});
