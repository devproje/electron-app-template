const { app, BrowserWindow } = require('electron');
const serve = require('electron-serve');
const path = require('path');

const loadURL = serve({ directory: './src' })
let mainView;

const createView = () => {
    mainView = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: path.join(__dirname, './public/favicon.png'),
        show: false
    });

    mainView.once("close", () => {
        mainView = null;
    });

    loadURL(mainView);
    mainView.show();
}

app.on('ready', createView);

app.on("activate", () => {
    if (!mainView) {
        createView();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});