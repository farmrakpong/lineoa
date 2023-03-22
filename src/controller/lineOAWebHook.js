const knex = require('../../db/index');
// const sqlrequest = require('../query');
// const bcrypt = require('bcrypt');
const line = require('@line/bot-sdk');
// const line = require('./1000_F_455474747_FMGFEzc9j2Xx4HXF4grnHJ4oS5VDNk3k.jpg');
const https = require("https")
const axios = require('axios');
let carousel = require('../../carousel.json')
let flex = require('../../flex.json')
require('dotenv').config();
// console.log(process.env.TOKEN);
// console.log(flex.footer.contents[0].action.uri);
const TOKEN = process.env.TOKEN
const fs = require("fs");

const lineOAWebHook = async(req, res) => {
    // console.log('req.body =>', JSON.stringify(req.body, null, 2)) //สิ่งที่ Line ส่งมา
    res.send("HTTP POST request sent to the webhook URL!")
        // ============= เพิ่มเข้ามาใหม่
    if (req.body.events[0].type === "message") {
        // Message data, must be stringified
        let dataString

        if (req.body.events[0].message.text == "*service") {
            const config = {
                headers: { Authorization: `Bearer ${TOKEN}` }
            };
            let user = await axios.get(`https://api.line.me/v2/bot/profile/${req.body.events[0].source.userId}`, config)
                .then(function(response) {
                    return response.data
                })
                // !! ---------> Gen URL <--------!! \\
            let urltemp = 'https://0807-2403-6200-8833-cfa7-fc24-2e16-5b41-c672.ngrok.io'
            carousel.contents[0].footer.contents[0].action.uri = `${urltemp}/getpro?userId=${user.userId}&displayName=${user.displayName}`
            carousel.contents[1].footer.contents[0].action.uri = `${urltemp}/getpro?userId=${user.userId}&displayName=${user.displayName}`
            console.log(carousel.contents[1].footer.contents[0].action.uri);
            flex.footer.contents[0].action.uri = `${urltemp}/getpro?userId=${user.userId}&displayName=${user.displayName}`
                // !! ---------> Gen URL <--------!! \\

            dataString = JSON.stringify({
                replyToken: req.body.events[0].replyToken,
                messages: [{
                    "type": "flex",
                    "altText": "This is a Flex Message",
                    "contents": carousel
                }]
            });
        } else if (req.body.events[0].message.text == "*membership") {
            const config = {
                headers: { Authorization: `Bearer ${TOKEN}` }
            };
            let user = await axios.get(`https://api.line.me/v2/bot/profile/${req.body.events[0].source.userId}`, config)
                .then(function(response) {
                    return response
                })

            // !! ---------> Gen URL <--------!! \\
            let urltemp = 'https://0807-2403-6200-8833-cfa7-fc24-2e16-5b41-c672.ngrok.io'
            flex.footer.contents[0].action.uri = `${urltemp}/getpro?userId=${user.userId}&displayName=${user.displayName}`
                // !! ---------> Gen URL <--------!! \\

            dataString = JSON.stringify({
                replyToken: req.body.events[0].replyToken,
                messages: [{
                    "type": "flex",
                    "altText": "This is a Flex Message",
                    "contents": flex
                }]
            })
        } else if (req.body.events[0].message.text == "สวัสดี") {
            dataString = JSON.stringify({
                replyToken: req.body.events[0].replyToken,
                messages: [{
                    "type": "text",
                    "text": "ฉันอ่านภาษาไทยไม่ออก"
                }]
            });
        } else {
            dataString = JSON.stringify({
                replyToken: req.body.events[0].replyToken,
                messages: [{
                    "type": "text",
                    "text": "good"
                }]
            });
        }

        // Request header
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + TOKEN
        }

        // Options to pass into the request
        const webhookOptions = {
            "hostname": "api.line.me",
            "path": "/v2/bot/message/reply",
            "method": "POST",
            "headers": headers,
            "body": dataString
        }

        // Define request
        const request = https.request(webhookOptions, (res) => {
            res.on("data", (d) => {
                process.stdout.write(d)
            })
        })

        // Handle error
        request.on("error", (err) => {
            console.error(err)
        })

        // Send data
        request.write(dataString)
        request.end()
    }
}

module.exports = {
    lineOAWebHook,
}