const express = require("express");
const { spawn } = require('child_process');
const cors = require('cors');
const { app, server } = require('../../data/programm_data/serverData/serverData.js');

const editDbFunctions = require ('../db/editDb.js');
const getAllNodes = require ('../db/get-node-data-from-database.js')

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
        gettAllNodes: "/db-api/get-all-nodes",
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
            try {
                const result = await editDbFunctions.createNewCustomNode(req.body, nodes, dbConfig);
                res.json(result);
            } catch (error) {
                console.error("Error when create custom Nodes: ", error.message);
                res.status(500).json({ error: "Error when create custom Nodes" });
            }
        });

        app.post(config.endPoints.createTable, async (req, res) => {
            try {
                const result = await editDbFunctions.createNewTable(req.body, dbConfig);
                res.status(200).json(result);
            } catch (error) {
                console.error("Error when create new Table: ", error.message);
                res.status(500).json({ error: "Error when create new Table" });
            }
        });

        app.post(config.endPoints.getTables, async (req, res) => {
            try {
                const result = await editDbFunctions.getAllTables(dbConfig);
                res.json(result);               
            } catch (error) {
                console.error("Error when fetch all Tables: ", error.message);
                res.status(500).json({ error: "Error when fetch all Tables" });
            }

        });

        app.post(config.endPoints.restart, async (req, res) => {
            try {
                spawn(config.node, [config.startNodeRedPath], {
                    detached: true,
                    stdio: config.inherit
                }).unref();
                res.json();
                process.exit();                
            } catch (error) {
                console.error("Error when restarting Node-Red: ", error.message);
                res.status(500).json({ error: "Error when restarting Node-Red" });
            }
        });

        app.post(config.endPoints.gettAllNodes, async (req, res) => {
            try {
                const result = await getAllNodes(dbConfig.tables);
                res.json(result);            
            } catch (error) {
                console.error("Error when et all Custom Nodes: ", error.message);
                res.status(500).json({ error: "Error when et all Custom Nodes" });
            }
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