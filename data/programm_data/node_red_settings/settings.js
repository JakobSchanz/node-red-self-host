const path = require('path');

module.exports = { 
    httpAdminRoot: "/",       
    httpNodeRoot: "/api",         
    userDir: path.resolve(__dirname, "../../.nodered"),    
    nodesDir: [path.resolve(__dirname, "../../custom-nodes")],  

     functionGlobalContext: {},

  logging: {
    console: {
      level: "info",
      metrics: false,
      audit: false,
    },
  },

  httpNodeCors: {
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
  },
  httpHeaders: {
    "X-Frame-Options": "ALLOWALL",
    "Content-Security-Policy": "frame-ancestors *"
  },

  editorTheme: {
  },
};
