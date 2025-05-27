module.exports = function(RED) {
    function sdfsd(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "sdfsd",
                description: "sdfsd: sdfsd",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("sdfsd", sdfsd);
};