'use strict';

const express = require('express');
const {CasparCG} = require('casparcg-connection');

const leftTab = require('./straps/leftTab')

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
const connection = new CasparCG(CASPARCG);

// Load lefTab template
leftTab.load(connection);

// Set up API 
api.get("/:action", (req, res) => {

    const action = req.params.action;    
    switch (action) {
        // start updating clock
        case "on":
            leftTab.on();
            res.json({ message: "News Clock updated." });
            break;
        
        case "off":
            leftTab.off();
            res.json({ message: "News Clock animated out." });
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

