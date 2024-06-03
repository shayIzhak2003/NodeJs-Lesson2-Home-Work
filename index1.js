const express = require('express');
const server = express();
const port = 5000;
const name = "shay";
const family = " izhak";

server.get('/', (req, res) => {
    res.json("hello world!");
});

server.get('/name/family', (req, res) => {
    res.json(`hello ${family} from ${name}!`);
});

server.listen(port, (res, req) => {
    console.log(`server is running on port ${port}`);
});