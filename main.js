const startNodeRed = require('./src/nodered/nodered');
const getDataFromDB = require('./src/db/get-node-data-from-database');
const { createCustomNodesFromDB } = require('./src/write-nodes/write-custom-nodes');
const dbConfig = require('./data/programm_data/db/db-config.js');

async function main() {
    try {
        await startNodeRed.getAllTables(dbConfig);
        const nodes = await getDataFromDB(dbConfig.tables);
        await createCustomNodesFromDB(nodes);
        await startNodeRed.startNodeRed(nodes, dbConfig);
    } catch (err) {
        console.error('start error:', err);
        process.exit(1);
    }
}

main();

module.exports = main;
