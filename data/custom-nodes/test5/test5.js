module.exports = function(RED) {
    function test5(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "test5",
                description: "test5: das ist ein test",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("test5", test5);
};