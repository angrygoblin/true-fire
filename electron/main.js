const { app, BrowserWindow, ipcMain, Menu } = require('electron');

const url = require("url");
const path = require("path");
const fs = require('fs');
const Library = require("./Library");

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
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

    mainWindow.webContents.openDevTools()

    // ipcMain.on('set-title', (event, title) => {
    //     const webContents = event.sender
    //     const win = BrowserWindow.fromWebContents(webContents)
    //     win.setTitle(title)
    // })

}

function createMenu() {
    const template = [
        {
            label: 'Library',
            submenu: [
                {
                    label: 'Update',
                    click: async () => {
                        const lib = new Library('app/lessons');
                        lib.scan();
                    }
                },
            ]
        },
    ];
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

app.on('ready', () => {
    createWindow();
    createMenu();
})

app.on('window-all-closed', function () {
    app.quit()
})