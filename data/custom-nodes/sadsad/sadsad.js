module.exports = function(RED) {
    function sadsad(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "sadsad",
                description: "sadsad: asdasdasd",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("sadsad", sadsad);
};