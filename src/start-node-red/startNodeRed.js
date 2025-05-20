const path = require('path');
const { spawn } = require('child_process');

const mainPath = path.resolve(__dirname, '../..', 'main.js');

const config = {
    node: "node",
    inherit: "inherit"
}

function start() {
    try {
        spawn(config.node, [mainPath], {
            stdio: config.inherit,
            detached: false
        });
    } catch (error) {
        console.error("Error in function start: ", error.message);
    }
}

start();