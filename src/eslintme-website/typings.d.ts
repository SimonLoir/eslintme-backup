// From https://webpack.js.org/loaders/worker-loader/#loading-without-worker-loader
declare module '*.worker.ts' {
    // You need to change `Worker`, if you specified a different value for the `workerType` option
    class WebpackWorker extends Worker {
        constructor();
    }

    // Uncomment this if you set the `esModule` option to `false`
    // export = WebpackWorker;
    export default WebpackWorker;
}
declare interface FileStoreFile {
    name: string;
    processed: boolean;
    failed?: boolean;
    ratio: number;
}
declare type FileStore = FileStoreFile[];

declare module 'eslint/lib/rules' {
    import type { TSESLint } from '@typescript-eslint/experimental-utils';

    type Rule = TSESLint.RuleModule<string, Array<unknown>>;

    class LazyLoadingRuleMap extends Map<string, Rule> {
        public constructor(loaders: Array<[string, () => Rule]>);
    }
    const rules: LazyLoadingRuleMap;
    export = rules;
}
