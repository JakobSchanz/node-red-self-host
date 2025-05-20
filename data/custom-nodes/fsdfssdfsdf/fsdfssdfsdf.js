module.exports = function(RED) {
    function fsdfssdfsdf(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "fsdfssdfsdf",
                description: "fsdfssdfsdf: sdfsdfsdf",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("fsdfssdfsdf", fsdfssdfsdf);
};