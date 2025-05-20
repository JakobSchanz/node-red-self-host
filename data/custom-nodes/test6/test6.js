module.exports = function(RED) {
    function test6(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "test6",
                description: "test6: Das ist ein weiterer Test",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("test6", test6);
};