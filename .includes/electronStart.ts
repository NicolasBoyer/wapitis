import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'

const ENV = process.env.NODE_ENV || 'production'
const DEBUG = ENV === 'development'
let win: any
let splash: any

function createWindow() {
    win = new BrowserWindow({ show: false })
    splash = new BrowserWindow({ width: 810, height: 610, transparent: true, frame: false, alwaysOnTop: true })

    if (DEBUG) {
        splash.loadURL('http://localhost:4444/splash.html')
        win.loadURL('http://localhost:4444')
        // Open the DevTools.
        win.webContents.openDevTools()
    } else {
        splash.loadURL(url.format({
            pathname: path.join(app.getAppPath(), 'dist', 'splash.html'),
            protocol: 'file:',
            slashes: true
        }))
        win.loadURL(url.format({
            pathname: path.join(app.getAppPath(), 'dist', 'index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }
    win.once('ready-to-show', () => {
        splash.destroy()
        win.maximize()
    })
    win.on('closed', () => win = null)
}

app.on('ready', () => createWindow())

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
