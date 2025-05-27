const path = require('path');

module.exports = { 
    httpAdminRoot: "/",       
    httpNodeRoot: "/api",         
    userDir: path.resolve(__dirname, "../../.nodered"),    
    nodesDir: [path.resolve(__dirname, "../../custom-nodes")],  
};
