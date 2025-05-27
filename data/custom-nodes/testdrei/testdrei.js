module.exports = function(RED) {
    function testdrei(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "testDrei",
                description: "testDrei: Das ist ein test",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("testdrei", testdrei);
};