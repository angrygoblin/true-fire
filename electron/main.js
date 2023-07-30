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
    const jazzCatRows = await tfMenu.category(1);
    const jazzMenu = [];
    for (const item of jazzCatRows) {
        jazzMenu.push({
            label: item.name,
            click: () => {
                mainWindow.webContents.send('open-course', item.id)
            }
        })
    }
    const acousticCatRows = await tfMenu.category(2);
    const acousticMenu = [];
    for (const item of acousticCatRows) {
        acousticMenu.push({
            label: item.name,
            click: () => {
                mainWindow.webContents.send('open-course', item.id)
            }
        })
    }
    const supplementaryCatRows = await tfMenu.category(3);
    const supplementaryMenu = [];
    for (const item of supplementaryCatRows) {
        supplementaryMenu.push({
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
            ]
        },
        {
            label: 'Acoustic',
            submenu: [
                ...acousticMenu
            ]
        },
        {
            label: 'Jazz',
            submenu: [
                ...jazzMenu
            ]
        },
        {
            label: 'Supplementary',
            submenu: [
                ...supplementaryMenu
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