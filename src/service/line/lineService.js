// const sqlrequest = require('../query');
const knex = require('../../../db/index');
const line = require('@line/bot-sdk');
// const line = require('./1000_F_455474747_FMGFEzc9j2Xx4HXF4grnHJ4oS5VDNk3k.jpg');
const https = require("https")
const axios = require('axios');
let flexC = require('../../../flexC.json')
let flexOne = require('../../../flexOne.json')
require('dotenv').config();
// console.log(process.env.TOKEN);
// console.log(flex.footer.contents[0].action.uri);
const TOKEN = process.env.TOKEN
const fs = require("fs");
const config = {
    channelAccessToken: "xR8RCxQ1Udbz3GVkGmeN/Jsg5wYqd/qLggnZvCpSjnyrH+TAJ3s7JTxjRaUt3E8I2v27kwT3i77blvVmrkZNzsGgT3DjDYa8zL8dZBJXPymLrmGie/xWsdxrxFd6IprjOaqwj+sYYHyZ03svIz/lcAdB04t89/1O/w1cDnyilFU=",
    channelSecret: "ae09d342ea504908830d4ae514023430"
};
const client = new line.Client(config);

function handleEvent(event) {


    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

async function  handleMessageEvent  (event) {
    const {userId} =  event.source
    console.log(event);
    const config = {
        headers: { Authorization: `Bearer ${TOKEN}` }
    };
    let valuser = await axios.get(`https://api.line.me/v2/bot/profile/${userId}`, config)
        .then(function(response) {
            return response.data
        })
        // console.log(valuser);
        var msg = {
            type: 'text',
            text: 'สวัสดีครัช'
        };
   
     let val = await knex.select().table('User').where('useId', userId).first()
    //  console.log(!val);
     if (!val) {
        flexOne.contents.contents[0].footer.contents[0].action.uri = `https://9611-2403-6200-8860-e786-3de1-97c-b544-f05f.ap.ngrok.io/register/${valuser.userId}`
        flexC.contents.contents[0].footer.contents[0].action.uri = `https://9611-2403-6200-8860-e786-3de1-97c-b544-f05f.ap.ngrok.io/register/${valuser.userId}`
        flexC.contents.contents[1].footer.contents[0].action.uri = `https://9611-2403-6200-8860-e786-3de1-97c-b544-f05f.ap.ngrok.io/register/${valuser.userId}`
     }else{
        flexOne.contents.contents[0].footer.contents[0].action.uri = `https://9611-2403-6200-8860-e786-3de1-97c-b544-f05f.ap.ngrok.io/${valuser.userId}`
        flexC.contents.contents[0].footer.contents[0].action.uri = `https://9611-2403-6200-8860-e786-3de1-97c-b544-f05f.ap.ngrok.io/user/${valuser.userId}`
        flexC.contents.contents[1].footer.contents[0].action.uri = `https://9611-2403-6200-8860-e786-3de1-97c-b544-f05f.ap.ngrok.io/user/${valuser.userId}`
     }
    
        var eventText = event.message.text.toLowerCase();

        if (eventText === '*membership') {
            msg = flexOne
        }  else if (eventText === '*service') {
            msg = flexC
        } else {
        msg = {
            type: 'text',
            text: 'สวัสดีครัช',
            "sender": {
            "iconUrl": "https://obs.line-scdn.net/0h0SPtfh7_b3xtDX05CSkQKz9QZB5eb3F3Tzl7GwNxRyxFbl1VFTl7aRFybTcIRndWWTt_akl2bixIb2BBUQpFbkxzSCcFbipdGhRVZQtxRDwcbU0rGTtm/f256x256"
            }
        }
        }

        return client.replyMessage(event.replyToken, msg);
    }


module.exports = {
    handleEvent
}