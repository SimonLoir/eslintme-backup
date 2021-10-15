const worker: Worker = self as unknown as Worker;
worker.addEventListener('message', ({ data }) => {
    console.log(data);
});
