module.exports = function(RED) {
    function test3(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "test3",
                description: "test3: test",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("test3", test3);
};