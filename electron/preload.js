const { contextBridge, ipcRenderer, shell, app} = require('electron')
const fs = require('fs');
const Library = require("./Library");
const path = require("path");
const TrueFireMenu = require("./TrueFireMenu");

contextBridge.exposeInMainWorld('electronAPI', {
    getCourse: async (id) => {
        const lib = new Library();
        return lib.getCourse(id)
    },
    getLastOpenedLesson: async () => {
        const lib = new Library();
        return lib.getLastOpenedLesson()
    },
    updateProgress: async (id, status) => {
        const lib = new Library();
        return lib.updateProgress(id, status)
    },
    openFile: async (file) => {
        await shell.openPath(path.join(__dirname, file));
    },
    closeApp: () => {
        ipcRenderer.send('close-app')
    },
    getCategory: async (id) => {
        const menu = new TrueFireMenu();
        return menu.category(id)
    },
})