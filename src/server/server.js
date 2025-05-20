const express = require("express");
const { spawn } = require('child_process');
const cors = require('cors');
const { app, server } = require('../../data/programm_data/serverData/serverData.js');

const editDbFunctions = require ('../db/editDb.js');
//const { config } = require("process"); was fehlt da 

const config = {
    url: 'http://localhost:3000',
    port: "8000",
    node: "node",
    inherit: "inherit",
    startNodeRedPath: "../start-node-red/startNodeRed.js",
    endPoints: {
        createCustomNode: "/db-api/crate-custom-node",
        createTable: "/db-api/crate-new-table",
        getTables: "/db-api/table-list",
        restart: "/restart-node-red",
    }
}

function startExpressServer(nodes, dbConfig) {
    return new Promise((resolve, reject) => {
        app.use(cors({
            origin: config.url,  
            methods: ['GET', 'POST', 'PUT', 'DELETE'], 
            credentials: true  
        }));
        app.use(express.json());

        app.post(config.endPoints.createCustomNode, async (req, res) => {
            const result = await editDbFunctions.createNewCustomNode(req.body, nodes, dbConfig);
            res.json(result);
        });

        app.post(config.endPoints.createTable, async (req, res) => {
            const result = await editDbFunctions.createNewTable(req.body, nodes, dbConfig);
            res.json(result);
        });

        app.post(config.endPoints.getTables, async (req, res) => {
            const result = await editDbFunctions.getAllTables(dbConfig);
            res.json(result);
        });

        app.post(config.endPoints.restart, async (req, res) => {
            res.send("Node-RED is restarted...");

            spawn(config.node, [config.startNodeRedPath], {
                detached: true,
                stdio: config.inherit
            }).unref();

            process.exit();
        });


        server.listen(config.port, (err) => {
            if (err) reject(err);
            else {
                resolve();
            }
        });
    });   
}

module.exports = startExpressServer;