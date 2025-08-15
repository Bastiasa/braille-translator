import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";

let mainWindow: BrowserWindow | null = null;

function createWindow() {

  const isDevelopment = isDev();
  mainWindow = new BrowserWindow({
    title: "Braille Translator",
    backgroundColor: "#000000",
    minWidth: 500,
    minHeight: 500,
    webPreferences: {
      devTools: isDevelopment,
    },
  });

  if (isDevelopment) {
    mainWindow.loadURL("http://localhost:5173/");
  } else {
    mainWindow.setMenu(null);
    mainWindow.loadFile(
      path.join(app.getAppPath(), "/dist-react/index.html")
    );
  }

  return mainWindow;
}

app.whenReady().then(createWindow);
