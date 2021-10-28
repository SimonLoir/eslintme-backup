import Core from '@core/Core';

// @see https://medium.com/lagierandlagier/nextjs-webassembly-and-web-workers-a5f7c19d4fd0

const worker: Worker = self as unknown as Worker;
const core = new Core();
const extractor = core.rules;

extractor.onProgress((currentTask, totalTasks, name, ratio) => {
    worker.postMessage({ type: 'progress', name, ratio });
});

worker.addEventListener(
    'message',
    ({ data: { name, content, type, outputType } }) => {
        if (type == 'new-file') {
            try {
                // The extractor processes the file and saves the test result for later use
                extractor.process(name, content);
                // We inform the renderer thread that the file was processed successfully
                worker.postMessage({ type: 'processed', name });
            } catch (error) {
                // We inform the renderer thread that the file was not processed properly
                worker.postMessage({ type: 'processing-error', name, error });
            }
        } else if (type == 'build-file') {
            // We generate the output file based on its type
            const file = core.build(outputType);
            // We send the result back to the renderer thread
            worker.postMessage({
                type: 'output-file-ready',
                file,
                outputType,
            });
        }
    }
);
