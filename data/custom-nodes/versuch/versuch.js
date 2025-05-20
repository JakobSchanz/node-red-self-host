module.exports = function(RED) {
    function versuch(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "versuch",
                description: "versuch: 2",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("versuch", versuch);
};