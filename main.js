const startNodeRed = require('./src/nodered/nodered');
const getDataFromDB = require('./src/db/get-node-data-from-database');
const { createCustomNodesFromDB } = require('./src/write-nodes/write-custom-nodes');
const dbConfig = require('./data/programm_data/db/db-config.js');
const expressServer = require ('./src/server/server.js')
const editDb = require ('./src/db/editDb.js')

async function main() {
    try {
        await editDb.getAllTables(dbConfig);
        const nodes = await getDataFromDB(dbConfig.tables);
        await createCustomNodesFromDB(nodes);
        await expressServer(nodes, dbConfig);
        await startNodeRed();
    } catch (err) {
        console.error('Error in function main: ', err);
        process.exit(1);
    }
}

main();

module.exports = main;
