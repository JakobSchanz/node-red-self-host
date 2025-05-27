module.exports = function(RED) {
    function testsdfsdf(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "testsdfsdf",
                description: "testsdfsdf: testsdf",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("testsdfsdf", testsdfsdf);
};