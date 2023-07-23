const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs');
const Library = require("./Library");



contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => {
        console.log('preload')
        return ipcRenderer.send('set-title', title)
    },
    getCourse: async (id) => {
        const lib = new Library();
        return lib.getCourse(id)
    },
})