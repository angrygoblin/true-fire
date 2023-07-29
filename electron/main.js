const { app, BrowserWindow, Menu } = require('electron');

const url = require("url");
const path = require("path");
const fs = require('fs');
const LibraryImporter = require("./LibraryImporter");
const Library = require("./Library");
const TrueFireMenu = require('./TrueFireMenu');

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

    mainWindow.setTitle('True Fire')

    // mainWindow.webContents.openDevTools()
}

async function createMenu() {
    const tfMenu = new TrueFireMenu();
    const jazzPathRows = await tfMenu.jazz();
    const jazzMenu = [];
    for (const item of jazzPathRows) {
        jazzMenu.push({
            label: item.name,
            click: () => {
                mainWindow.webContents.send('open-course', item.id)
            }
        })
    }
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
                {
                    label: 'get length',
                    click: async () => {
                        const lib = new LibraryImporter('lessons');
                        await lib.updateLengths();
                    }
                },
            ]
        },
        {
            label: 'Acoustic',
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
        {
            label: 'Jazz',
            submenu: [
                ...jazzMenu
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