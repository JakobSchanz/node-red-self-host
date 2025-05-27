module.exports = function(RED) {
    function test(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "test",
                description: "test: test",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("test", test);
};