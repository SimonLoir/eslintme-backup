const { contextBridge, dialog, remote, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('native', true);

process.once('loaded', () => {
    window.addEventListener('message', (evt) => {
        if (evt.data.type === 'select-dirs') {
            ipcRenderer.send('select-dirs');
        }
    });
});

ipcRenderer.on('file', (ev, d) => {
    const blob = new Blob([d.content]);
    const file = new File([blob], d.name, {
        lastModified: d.lastModified,
    });
    window.postMessage({ type: 'new-file', file, path: d.path });
});
