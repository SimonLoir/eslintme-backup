/**
 * This is the main process of the app
 */
const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const serve = require('electron-serve');

const loadURL = serve({ directory: 'files' });

/**
 * Creates a new browser window for the app
 */
async function newWindow() {
    // Creates a new browser window and injects "glue" script
    const main = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            sandbox: true,
        },
    });

    // Serves the html files
    await loadURL(main);

    // Loads the app from the served files
    main.loadURL('app://-');
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
    // Shows a dialog that lets the user choose a directory
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
    });

    // Once the directory is chosen, go through all the files and subdirectories
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

    // checks that the folder does exist
    if (fs.existsSync(folder))
        // Scans all the directories and files
        fs.readdirSync(folder).forEach((element) => {
            const p = folder + '/' + element;
            const stats = fs.statSync(p);

            // Recursively perform the same process on sub directories
            if (stats.isDirectory()) return findJSFiles(event, p);

            // Retrieve extension and name from the path
            const { ext, name } = path.parse(p);

            // We are only interested in js files
            if (ext != '.js') return console.log('skipped ' + p);

            // Tells the renderer that a new file was found
            event.reply('file', {
                path: p,
                name,
                lastModified: stats.mtime,
                size: stats.size,
                content: fs.readFileSync(p),
            });
        });
}
