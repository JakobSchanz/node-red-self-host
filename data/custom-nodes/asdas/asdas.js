module.exports = function(RED) {
    function asdas(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "asdas",
                description: "asdas: asdasd",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("asdas", asdas);
};