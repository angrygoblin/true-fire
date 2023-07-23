const { app, BrowserWindow, ipcMain, Menu } = require('electron');

const url = require("url");
const path = require("path");
const fs = require('fs');
const LibraryImporter = require("./LibraryImporter");
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
                        const lib = new LibraryImporter('lessons');
                        await lib.importCourses();
                    }
                },
            ]
        },
        {
            label: 'Courses',
            submenu: [
                {
                    label: 'Lesson 2',
                    click: async () => {
                        const lib = new Library('lessons');
                        console.log(lib.getCourse(5))
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