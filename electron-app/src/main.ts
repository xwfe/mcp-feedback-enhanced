import { app, BrowserWindow } from 'electron';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';

let pythonProcess: ChildProcess | null = null;
let serverUrl = 'http://localhost:8765';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });
  win.loadURL(serverUrl);
}

function startPythonServer() {
  const script = path.join(__dirname, '..', '..', 'scripts', 'start_web_server.py');
  pythonProcess = spawn('python', [script], { stdio: ['ignore', 'pipe', 'inherit'] });

  pythonProcess.stdout?.on('data', (data: Buffer) => {
    const url = data.toString().trim();
    if (url.startsWith('http')) {
      serverUrl = url;
      if (app.isReady()) {
        createWindow();
      }
    }
  });
}

app.whenReady().then(startPythonServer);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  if (pythonProcess) {
    pythonProcess.kill();
  }
});
