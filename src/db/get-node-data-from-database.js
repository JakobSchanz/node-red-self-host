const mysql = require('mysql2/promise');
const dbConfig = require('../../data/programm_data/db/db-config.js');
const path = require('path');
const fs = require("fs");

const config = {
    sqlComands: {
        getTables: "SHOW TABLES",
    },
    utf: "utf8",
    dbConfigPath: "../../data/programm_data/db/db-config.js",
    moduleExport: "module.exports"
}

async function getDataFromDB(tables) {
    console.log(tables);
    let all_results = [];

    const connection = await mysql.createConnection(dbConfig.basic_config);

    for (const table of tables) {
        const [results] = await connection.execute(`SELECT * FROM ${table}`); 
        all_results = all_results.concat(results); 
    }

    await connection.end();

    return all_results;
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

module.exports = { getDataFromDB, getAllTables };
