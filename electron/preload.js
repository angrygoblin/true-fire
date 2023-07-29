const { contextBridge, ipcRenderer, shell} = require('electron')
const fs = require('fs');
const Library = require("./Library");
const path = require("path");

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => {
        console.log('preload')
        return ipcRenderer.send('set-title', title)
    },
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
        console.log(file)
        await shell.openPath(path.join(__dirname, file));
    },
    menuClick: (callback) => ipcRenderer.on('open-course', callback)
})