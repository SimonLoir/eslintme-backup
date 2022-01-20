/**
 * This is the main process of the app
 */
const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

/**
 * Creates a new browser window for the app
 */
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
    // Used on macOS device when the app is in the dock but no windows are open.
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) newWindow();
    });
});

app.on('window-all-closed', function () {
    // Prevents the app from quitting on macOS devices
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('select-dirs', async (event) => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
    });
    result.filePaths.forEach((folder) => {
        findJSFiles(event, folder);
    });
});
/**
 * Finds all the .js files in a directory.
 * @param {Electron.IpcMainEvent} event The events that triggered the need for the function to be called.
 * @param {String} folder The path of the folder to search in.
 */
function findJSFiles(event, folder) {
    console.assert(event, 'Event argument was not provided');
    console.assert(folder, 'The folder argument is not a valid path');
    if (fs.existsSync(folder))
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
