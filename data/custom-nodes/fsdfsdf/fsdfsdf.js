module.exports = function(RED) {
    function fsdfsdf(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "fsdfsdf",
                description: "fsdfsdf: dfsdfsfd",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("fsdfsdf", fsdfsdf);
};