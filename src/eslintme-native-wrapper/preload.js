/**
 * This files makes the bridge between electron's APIs and classic web APIs
 */
const { contextBridge, ipcRenderer } = require('electron');

// This allows the renderer that it is running in a "native" environnement
contextBridge.exposeInMainWorld('native', true);

process.once('loaded', () => {
    // Setting up a receiver for "select-dir" messages coming from the website
    window.addEventListener('message', (evt) => {
        if (evt.data.type === 'select-dirs') ipcRenderer.send('select-dirs');
    });
});

ipcRenderer.on('file', (ev, file) => {
    console.assert(file, 'Failed to get a proper file');
    // Creating a blob from the file's content
    const blob = new Blob([file.content]);
    // Creating a virtual file from the blob
    const file = new File([blob], file.name, {
        lastModified: file.lastModified,
    });
    // The file is then sent to the website
    window.postMessage({ type: 'new-file', file, path: file.path });
});
