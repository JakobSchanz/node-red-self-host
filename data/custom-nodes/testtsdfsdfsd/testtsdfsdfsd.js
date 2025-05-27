module.exports = function(RED) {
    function testtsdfsdfsd(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "testtsdfsdfsd",
                description: "testtsdfsdfsd: testsest",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("testtsdfsdfsd", testtsdfsdfsd);
};