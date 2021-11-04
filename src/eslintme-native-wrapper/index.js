const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function newWindow() {
    const main = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            sandbox: true,
        },
    });
    main.loadURL('http://localhost:3000/from-files/Empty');
}

app.whenReady().then(() => {
    newWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) newWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

function findJSFiles(event, folder) {
    fs.readdirSync(folder).forEach((element) => {
        const p = folder + '/' + element;
        const stats = fs.statSync(p);

        if (stats.isDirectory()) return findJSFiles(event, p);

        const { ext, name } = path.parse(p);

        if (ext != '.js') return console.log('skipped ' + p);

        event.reply('file', {
            path: p,
            name,
            lastModified: stats.mtime,
            size: stats.size,
            content: fs.readFileSync(p),
        });
    });
}

ipcMain.on('select-dirs', async (event, arg) => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
    });
    result.filePaths.forEach((folder) => {
        findJSFiles(event, folder);
    });
});
