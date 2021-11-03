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
        const path = folder + '/' + element;
        if (fs.statSync(path).isDirectory()) return findJSFiles(event, path);
        console.log(path);
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
