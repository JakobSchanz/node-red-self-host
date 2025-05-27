module.exports = function(RED) {
    function testsdfsd(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "testsdfsd",
                description: "testsdfsd: tesdfsdfsd",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("testsdfsd", testsdfsd);
};