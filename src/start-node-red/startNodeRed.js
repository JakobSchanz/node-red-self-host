const path = require('path');
const { spawn } = require('child_process');

// Eine Ebene höher aus dem aktuellen Ordner
const mainPath = path.resolve(__dirname, '../..', 'main.js');

function start() {
    const child = spawn('node', [mainPath], {
        stdio: 'inherit',
        detached: false
    });

    child.on('exit', (code) => {
        console.log(`Node-RED wurde beendet mit Code ${code}`);
    });
}

start();