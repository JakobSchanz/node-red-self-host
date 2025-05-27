const mysql = require('mysql2/promise');
const fs = require("fs");
const path = require('path');

const config = {
    sqlComands: {
        getTables: "SHOW TABLES",
    },
    utf: "utf8",
    dbConfigPath: "../../data/programm_data/db/db-config.js",
    moduleExport: "module.exports"
}

async function getAllTables(dbConfig) {
    try {
        const connection = await mysql.createConnection (dbConfig.basic_config);
        const [rows] = await connection.query(config.sqlComands.getTables);
        const tables = rows.map(row => Object.values(row)[0]);
        await connection.end();
        writeTables(tables);
        return tables;
    } catch (error) {
        console.error("error in function getAllTables: ", error.message);
    }
}

function writeTables(tables) { 
    try {
        const configPath = path.join(__dirname, config.dbConfigPath);
        const fileContent = fs.readFileSync(configPath, config.utf);
        let configTables;
        eval("configTables = " + fileContent.replace(`${config.moduleExport} =`, ""));
        configTables.tables = tables;
        const newContent = `${config.moduleExport} = ${JSON.stringify(configTables, null, 2)};`;
        fs.writeFileSync(configPath, newContent, config.utf);
    } catch (error) {
        console.error("Error in Function: writeTables: ", error.message);
    }
}

function createNewCustomNode(newNodeObject, nodes, dbConfig) {
    try {
        const payload = {
            message: ""
        }
        for (node in nodes) {
            if (node.category == newNodeObject.table && node.name == newNodeObject.name) {
                payload.message = "Error";
                return payload;
            }
        }
        writeInDb(newNodeObject, dbConfig);
        payload.message = "Node Created"
        return payload;
    } catch (error) {
        console.error("Error in function createNewCustomNode: ", error.message);
    }
   
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

async function createNewTable(body, dbConfig) {
    let connection;

    try {
        let tableNodeColor;
        let tableNodeIcon;

        if (body.tableColor === "") {
            tableNodeColor =  '#47919e';
        } else {
            tableNodeColor = body.tableColor;
        }

        if (body.tableIcon === "") {
            tableNodeIcon =  'fa-industry';
        } else {
            tableNodeIcon = body.tableIcon;
        }

        connection = await mysql.createConnection (dbConfig.basic_config);
        const createTableSQL = `CREATE TABLE IF NOT EXISTS \`${body.tableName}\` (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            description TEXT,
            category VARCHAR(50),
            color VARCHAR(50) DEFAULT '${tableNodeColor}',
            icon VARCHAR(50) DEFAULT '${tableNodeIcon}'
        )
        `;

        await connection.execute(createTableSQL);
        return {"starus": 200}
    } catch (error) {
        console.error("error when conecting to db", error.message);
    }
}

module.exports = { createNewTable, writeInDb, createNewCustomNode, writeTables, getAllTables }