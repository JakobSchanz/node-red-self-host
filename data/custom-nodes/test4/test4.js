module.exports = function(RED) {
    function test4(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "test4",
                description: "test4: das ist ein test",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("test4", test4);
};