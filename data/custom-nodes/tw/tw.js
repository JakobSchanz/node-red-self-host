module.exports = function(RED) {
    function tw(config) {
        RED.nodes.createNode(this, config);
        this.on('input', msg => {
            msg.payload = {
                nodeName: "tw",
                description: "tw: test",
                data: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType("tw", tw);
};