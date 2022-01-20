/**
 * This files makes the bridge between electron's APIs and classic web APIs
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('native', true);

process.once('loaded', () => {
    // Setting up a receiver for "select-dir" messages coming from the website
    window.addEventListener('message', (evt) => {
        if (evt.data.type === 'select-dirs') ipcRenderer.send('select-dirs');
    });
});

ipcRenderer.on('file', (ev, d) => {
    // Creating a blob from the file's content
    const blob = new Blob([d.content]);
    // Creating a virtual file from the blob
    const file = new File([blob], d.name, {
        lastModified: d.lastModified,
    });
    // The file is then sent to the website
    window.postMessage({ type: 'new-file', file, path: d.path });
});
