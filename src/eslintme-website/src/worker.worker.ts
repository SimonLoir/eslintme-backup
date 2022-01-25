import Core from '@core/Core';
import { eslint_rules } from 'utils/eslint.configs';

// @see https://medium.com/lagierandlagier/nextjs-webassembly-and-web-workers-a5f7c19d4fd0

const worker: Worker = self as unknown as Worker;
const core = new Core();
const extractor = core.rules;

extractor.onProgress((currentTask, totalTasks, name, ratio) => {
    worker.postMessage({ type: 'progress', name, ratio });
});

worker.addEventListener(
    'message',
    ({ data: { name, content, type, format, call } }) => {
        if (type == 'new-file') {
            try {
                const reader = new FileReader();
                reader.onload = () => {
                    if (!reader.result) return;
                    try {
                        // The extractor processes the file and saves the test result for later use
                        extractor.process(name, reader.result.toString());
                        // We inform the renderer thread that the file was processed successfully
                        worker.postMessage({ type: 'processed', name });
                    } catch (error) {
                        // We inform the renderer thread that the file was not processed properly
                        worker.postMessage({
                            type: 'processing-error',
                            name,
                            error,
                        });
                    }
                };
                reader.readAsText(content);
            } catch (error) {
                // We inform the renderer thread that the file was not processed properly
                worker.postMessage({ type: 'processing-error', name, error });
            }
        } else if (type == 'upload-finished') {
            /**
             * Once the upload of the files has finished, the renderer sends a message to indicate
             * that all files are sent. We then send the list of extracted rules to the renderer
             */
            worker.postMessage({
                type: 'extract-rules',
                payload: core.extractRules(),
            });
        } else if (type == 'build-file') {
            /**
             * The renderer can ask the worker to export the config file in the specified format
             */

            // Getting the MIME type
            const type =
                format == 'json'
                    ? 'application/json'
                    : format == 'js'
                    ? 'application/javascript'
                    : 'application/yaml';

            // Creating the blob
            const blob = new Blob([core.export(format)], { type });

            // Sending the blob to the renderer
            worker.postMessage({ type: 'download-ready', blob });
        } else {
            console.log('Unknown ', type);
        }
    }
);

console.log(eslint_rules);
