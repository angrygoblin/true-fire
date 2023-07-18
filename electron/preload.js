const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs');

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => {
        console.log('preload')
        return ipcRenderer.send('set-title', title)
    },
    readDir: fs.readdirSync,
    readFile: fs.readFileSync,
    fileExists: fs.existsSync,
    isDir: (path) => {
        return fs.lstatSync(path).isDirectory()
    }
})