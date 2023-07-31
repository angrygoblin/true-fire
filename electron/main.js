const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: 'truefire.ico',
        frame: false
    })
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `app/index.html`),
            protocol: "file:",
            slashes: true
        })
    );
    mainWindow.on('closed', function () {
        mainWindow = null
    })
    mainWindow.setTitle('True Fire')

    // mainWindow.webContents.openDevTools()
}

app.on('ready', () => {
    createWindow();
})

app.on('window-all-closed', function () {
    app.quit()
})

ipcMain.on('close-app', (event, title) => {
    app.quit()
})