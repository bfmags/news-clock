'use strict';

const date = require('date-and-time');

this.leftTabIntervalID = null;
this.connection = null;

module.exports.load = (connection) => {
    this.connection = connection;
    connection
        .cgAdd(1,1,1, 'template/index', true)
        .then(() => {
            connection.disconnect();
        })
        .catch(() => {
            connection.disconnect();
            console.log({ message: "Could not load template" });
        });
};

module.exports.on = () => {
    if (this.leftTabIntervalID) {
        clearInterval(this.leftTabIntervalID);
    }
    this.leftTabIntervalID = setInterval( () => {
        const now = date.format(new Date(), 'hh:mm');
        this.connection
            .cgInvoke(1,1,1, `"leftTab('on', 'BBC NEWS ${now}')"`)
            .then(() => {
                connection.disconnect();
                console.log({ message: "News Clock updated." });
            })
            .catch(() => {
                connection.disconnect();
                console.log({ message: "Error sending CasparCG command." });
            });
    
    }, 1000);
};

module.exports.off = () => {
    clearInterval(this.leftTabIntervalID);
    this.leftTabIntervalID = null;
    this.connection
        .cgInvoke(1,1,1, "leftTab('off')")
        .then(() => {
            connection.disconnect();
            console.log({ message: "News Clock animated out." });
        })
        .catch(() => {
            connection.disconnect();
            console.log({ message: "Error sending CasparCG command." });
        });
};

