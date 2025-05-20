const http = require('http');
const express = require("express");
const RED = require("node-red");
const path = require('path');
const mysql = require('mysql2/promise');
const fs = require("fs");
const { spawn } = require('child_process');

const { createCustomNodesFromDB } = require('../write-nodes/write-custom-nodes');
const getDataFromDB = require('../db/get-node-data-from-database');

let redStarted = false;
let server;

async function startNodeRed(nodes, dbConfig) {
    const app = express();
    server = http.createServer(app);

    const settings = require(path.join(__dirname, '../../data/programm_data/node_red_settings/settings.js'));

    if (redStarted) {
        console.error("Node-red is alredy running");
        return;
    }

    RED.init(server, settings);
    app.use(settings.httpAdminRoot, RED.httpAdmin);
    app.use(settings.httpNodeRoot, RED.httpNode);

    app.post("/db-api/crate-custom-node", async (req, res) => {
        const result = await createNewCustomNode(req.body, nodes, dbConfig);
        res.json(result); 
    });

    app.post("/db-api/crate-new-table", async (req, res) => {
        const result = await createNewTable(req.body, nodes, dbConfig);
        res.json(result); 
    });

    app.post("/db-api/table-list", async (req, res) => {
        const result = await getAllTables(dbConfig);
        res.json(result); 
    });


    app.post("/restart-node-red", async (req, res) => {
        res.send("Node-RED wird neu gestartet...");
        spawn('node', ['../start-node-red/startNodeRed.js'], {
            detached: true, 
            stdio: 'inherit'
        });

        child.unref();
        process.exit();
    });

    server.listen(8000);
    await RED.start();
    redStarted = true;
}

async function getAllTables(dbConfig) {
    try {
        connection = await mysql.createConnection (dbConfig.basic_config);
        const [rows] = await connection.query("SHOW TABLES");
        const tables = rows.map(row => Object.values(row)[0]);
        //console.log(tables);
        await connection.end();
        writeTables(tables);
        return tables;
    } catch (error) {
        console.error("error in function getAllTables: ", error.message);
    }
}

function writeTables(tables) { 
    const configPath = path.join(__dirname, "../../data/programm_data/db/db-config.js");
    const fileContent = fs.readFileSync(configPath, "utf8");
    let config;
    eval("config = " + fileContent.replace("module.exports =", ""));
    config.tables = tables;
    const newContent = `module.exports = ${JSON.stringify(config, null, 2)};`;
    fs.writeFileSync(configPath, newContent, "utf8");
}

function createNewCustomNode(newNodeObject, nodes, dbConfig) {
    for (node in nodes) {
        if (node.category == newNodeObject.table && node.name == newNodeObject.name) {
            const payload = {
                message: "node already exists"
            }
            return payload;
        }
    }
    writeInDb(newNodeObject, dbConfig);
    return "teset";
}

async function writeInDb(newNodeObject, dbConfig) {
    let connection;
    try {
        connection = await mysql.createConnection (dbConfig.basic_config);

        const sql = `INSERT INTO ${newNodeObject.table} (name, description, category) VALUES (?, ?, ?)`;
        const values = [
            newNodeObject.name !== undefined ? newNodeObject.name : null,
            newNodeObject.description !== undefined ? newNodeObject.description : null,
            newNodeObject.table !== undefined ? newNodeObject.table : null,
        ];
        const [result] = await connection.execute(sql, values);

    } catch (error) {
        console.error("error when conecting to db", error.message);
    }
}

async function createNewTable(body, nodes, dbConfig) {
    let connection;

    try {
        //icon und color auch custom 
        connection = await mysql.createConnection (dbConfig.basic_config);
        const createTableSQL = `
        CREATE TABLE IF NOT EXISTS \`${body.table}\` (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            description TEXT,
            category VARCHAR(50),
            color VARCHAR(50) DEFAULT '#47919e',
            icon VARCHAR(50) DEFAULT 'fa-industry'
        )
        `;

        await connection.execute(createTableSQL);
    } catch (error) {
        console.error("error when conecting to db", error.message);
    }
}

module.exports = {getAllTables, startNodeRed};
