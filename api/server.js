// BUILD YOUR SERVER HERE

const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.status(200).json({ message: 'hello world' });
    
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
