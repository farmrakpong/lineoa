const express = require('express');
const line = require('@line/bot-sdk');
// const line = require('./1000_F_455474747_FMGFEzc9j2Xx4HXF4grnHJ4oS5VDNk3k.jpg');
const app = express();
const https = require("https")
const axios = require('axios');
const port = 3000;
let cors = require('cors')
const bodyParser = require('body-parser')
const carousel = require('./carousel.json')
let router = require('./src/router');
const request = require('request')
const TOKEN = 'xR8RCxQ1Udbz3GVkGmeN/Jsg5wYqd/qLggnZvCpSjnyrH+TAJ3s7JTxjRaUt3E8I2v27kwT3i77blvVmrkZNzsGgT3DjDYa8zL8dZBJXPymLrmGie/xWsdxrxFd6IprjOaqwj+sYYHyZ03svIz/lcAdB04t89/1O/w1cDnyilFU='
const fs = require("fs");
app.use(cors())
    // console.log(x);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', router)
app.get('/getpro', async(req, res) => {
    res.send("hi");
})



app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});