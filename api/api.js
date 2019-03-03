'use strict';

const express = require('express');
const date = require('date-and-time');
const {CasparCG} = require("casparcg-connection");

// Load configuration
const configOBJ = require('./config.json');
const defaultConfig = configOBJ.development;
const environment = process.env.NODE_ENV || 'development';
const config = { ...defaultConfig, ...configOBJ[environment] } 

// Constants
const PORT = config.node_port;
const HOST = '0.0.0.0';
const CASPARCG = config.casparcg;

// Server API
const api = express();

// Connect to CasparCG Server and 
// load news clock template
const connection = new CasparCG();
connection
    .cgAdd(1,1,1, 'main/MAIN', true)
    .then(() => {
        connection.disconnect();
    })
    .catch(() => {
        connection.disconnect();
        console.log({ message: "Could not load template" });
    });

// Set up API 
api.get("/:action", (req, res) => {

    const action = req.params.action;  
    const connection = new CasparCG(CASPARCG);
  
    switch (action) {
        // start updating clock
        // TODO: move casparCG related to it's own file
        case "on":
            this.leftTabIntervalID = setInterval( () => {
                const now = date.format(new Date(), 'hh:mm');
                connection
                    .cgInvoke(1,1,1, `"leftTab('on', 'BBC NEWS ${now}')"`)
                    .then(() => {
                        connection.disconnect();
                        res.json({ message: "News Clock updated." });
                    })
                    .catch(() => {
                        connection.disconnect();
                        res.json({ message: "Error sending CasparCG command." });
                    });

            }, 1000);
            break;
        
        case "off":
            clearInterval(this.leftTabIntervalID);
            connection
                .cgInvoke(1,1,1, "leftTab('off')")
                .then(() => {
                    connection.disconnect();
                    res.json({ message: "News Clock animated out." });
                })
                .catch(() => {
                    connection.disconnect();
                    res.json({ message: "Error sending CasparCG command." });
                });
            break;
  
        default:
            connection.disconnect();
            res.json({ message: "Parameter not valid." });
    }
  });


api.get('/', (req, res) => {
    res.send({ "casparcg-connection": connection._connected, config: config });
});

api.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// for supertest
module.exports = api;

