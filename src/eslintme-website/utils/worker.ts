export default class ESWorker {
    private static _worker: Worker;
    public static get worker() {
        if (!this._worker)
            ESWorker._worker = new Worker(
                new URL('../src/worker.worker.ts', import.meta.url)
            );
        return ESWorker._worker;
    }
}
