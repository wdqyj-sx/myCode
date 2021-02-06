const { app, BrowserWindow} = require("electron");
const isDev = require("electron-is-dev");
let mainWindows;

app.on("ready",()=>{
    mainWindows = new BrowserWindow({
        width:1200,
        height:800,
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true
        }
    })
    mainWindows.webContents.openDevTools();
    //判断当前环境是否为开发环境
    let localUrl = isDev ? "http://localhost:3000":"reactUrl";
    mainWindows.loadURL(localUrl);
    
})
