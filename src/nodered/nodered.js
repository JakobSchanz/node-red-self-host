const RED = require("node-red");
const path = require('path');
const { app, server } = require('../../data/programm_data/serverData/serverData.js');
let redStarted = false;


async function startNodeRed() {
    try {
        const settings = require(path.join(__dirname, '../../data/programm_data/node_red_settings/settings.js'));

        if (redStarted) {
            return;
        }

        RED.init(server, settings);

        app.use(settings.httpAdminRoot, RED.httpAdmin);
        app.use(settings.httpNodeRoot, RED.httpNode);

        await RED.start();
        redStarted = true; 
    } catch (error) {
        console.error("Error in Function startNodeRed: ", error.message);
    }
}

module.exports = startNodeRed;
