const express = require('express');
const line = require('@line/bot-sdk');
// const line = require('./1000_F_455474747_FMGFEzc9j2Xx4HXF4grnHJ4oS5VDNk3k.jpg');
const app = express();
const https = require("https")
const axios = require('axios');
const port = 3000;
let cors = require('cors')
const bodyParser = require('body-parser')
const request = require('request')
const TOKEN = 'xR8RCxQ1Udbz3GVkGmeN/Jsg5wYqd/qLggnZvCpSjnyrH+TAJ3s7JTxjRaUt3E8I2v27kwT3i77blvVmrkZNzsGgT3DjDYa8zL8dZBJXPymLrmGie/xWsdxrxFd6IprjOaqwj+sYYHyZ03svIz/lcAdB04t89/1O/w1cDnyilFU='
const fs = require("fs");
app.use(cors())
const config = {
    channelAccessToken: TOKEN,
    channelSecret: 'ae09d342ea504908830d4ae514023430',
  };

  
  const bot = new line.Client(config);

  const richMenu = {
    "size":{
        "width":2500,
        "height":1686
    },
    "selected": false,
    "name": "LINE Developers Info",
    "chatBarText": "Menua",
    "areas": [
        {
            "bounds": {
                "x": 34,
                "y": 24,
                "width": 169,
                "height": 193
            },
            "action": {
                "type": "uri",
                "uri": "https://developers.line.biz/en/news/"
            }
        },
        {
            "bounds": {
                "x": 229,
                "y": 24,
                "width": 207,
                "height": 193
            },
            "action": {
                "type": "uri",
                "uri": "https://www.line-community.me/en/"
            }
        },
        {
            "bounds": {
                "x": 461,
                "y": 24,
                "width": 173,
                "height": 193
            },
            "action": {
                "type": "uri",
                "uri": "https://engineering.linecorp.com/en/blog/"
            }
        }
    ]
  };
  async function createRichMenu() {
    const richMenuId = await bot.createRichMenu(richMenu);
    console.log(`Rich menu created with ID: ${richMenuId}`);
  
    await bot.setRichMenuImage(richMenuId, fs.createReadStream('./1000_F_455474747_FMGFEzc9j2Xx4HXF4grnHJ4oS5VDNk3k.jpg'));
    console.log('Rich menu image uploaded successfully!');
  
    await bot.setDefaultRichMenu(richMenuId);
    console.log('Default rich menu set successfully!');
  }
  // createRichMenu();
// app.post('/api/v1/link-richmenu', (req, res) => {
//   // const userId = req.body.userId
//   // console.log(req.body);
//   bot.linkRichMenuToUser('ae09d342ea504908830d4ae514023430' , "richmenu-32e21f4d3915f0f623341c6a91918006")
//   console.log(req.body);
//     res.send('Hello Worldza!');
// });
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/a', (req, res) => {
  res.send('Hello Worldza!');
})

app.get('/getpro', (req, res) => {
  
  res.send({userId:req.query.userId , displayName:req.query.displayName})
});
app.post("/webhook", async (req, res) => {
    console.log('req.body =>', JSON.stringify(req.body,null,2)) //สิ่งที่ Line ส่งมา
    res.send("HTTP POST request sent to the webhook URL!")
    // U250cb50dc308f4daf5420b5795243e57
    // U250cb50dc308f4daf5420b5795243e57
     // ============= เพิ่มเข้ามาใหม่
    if (req.body.events[0].type === "message") {
      // Message data, must be stringified
      let dataString
   
        if (req.body.events[0].message.text == "*service") {

            const config = {
                 headers: { Authorization: `Bearer ${TOKEN}` }
              };
              let user  = await  axios.get(`https://api.line.me/v2/bot/profile/${req.body.events[0].source.userId}`
              ,config)
                  .then(function (response) {
                      // handle success
                      // console.log(response);
                      // resolve(response)
                      return response
                  })
            // console.log(user.data);
                dataString = JSON.stringify({
                  replyToken: req.body.events[0].replyToken,
                  messages: [
                    {
                      "type": "flex",
                      "altText": "This is a Flex Message",
                      "contents": {
                        "type": "carousel",
                        "contents": [
                          {
                            "type": "bubble",
                            "direction": "ltr",
                            "header": {
                              "type": "box",
                              "layout": "vertical",
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "Register",
                                  "align": "center",
                                  "contents": []
                                }
                              ]
                            },
                            "hero": {
                              "type": "image",
                              "url": "https://vos.line-scdn.net/bot-designer-template-images/bot-designer-icon.png",
                              "size": "full",
                              "aspectRatio": "1.51:1",
                              "aspectMode": "fit"
                            },
                            "footer": {
                              "type": "box",
                              "layout": "horizontal",
                              "contents": [
                                {
                                  "type": "button",
                                  "action": {
                                    "type": "uri",
                                    "label": "Register",
                                    "uri": `https://e0d1-2403-6200-8833-cfa7-61e3-c52c-ce12-76de.ngrok.io/getpro?userId=${user.data.userId}&displayName=${user.data.displayName}`
                                  },
                                  "color": "#37C84AFF",
                                  "style": "primary"
                                }
                              ]
                            }
                          },
                          {
                            "type": "bubble",
                            "direction": "ltr",
                            "header": {
                              "type": "box",
                              "layout": "vertical",
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "Member",
                                  "align": "center",
                                  "contents": []
                                }
                              ]
                            },
                            "hero": {
                              "type": "image",
                              "url": "https://vos.line-scdn.net/bot-designer-template-images/bot-designer-icon.png",
                              "size": "full",
                              "aspectRatio": "1.51:1",
                              "aspectMode": "fit",
                              "backgroundColor": "#FFFFFFFF"
                            },
                            "footer": {
                              "type": "box",
                              "layout": "horizontal",
                              "contents": [
                                {
                                  "type": "button",
                                  "action": {
                                    "type": "uri",
                                    "label": "MemberCard",
                                    "uri": `https://e0d1-2403-6200-8833-cfa7-61e3-c52c-ce12-76de.ngrok.io/getpro?userId=${user.data.userId}&displayName=${user.data.displayName}`
                                  },
                                  "color": "#37C84AFF",
                                  "style": "primary"
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
          });
        }else if (req.body.events[0].message.text == "*membership") {
          const config = {
            headers: { Authorization: `Bearer ${TOKEN}` }
         };
         let user  = await  axios.get(`https://api.line.me/v2/bot/profile/${req.body.events[0].source.userId}`
         ,config)
             .then(function (response) {
                 // handle success
                 // console.log(response);
                 // resolve(response)
                 return response
             })
      //  console.log(user.data);
            dataString   = JSON.stringify({
                replyToken: req.body.events[0].replyToken,
                messages: [
                  {
                    "type": "flex",
                    "altText": "This is a Flex Message",
                    "contents": {
                      "type": "bubble",
                      "direction": "ltr",
                      "header": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "text",
                            "text": "Member",
                            "align": "center",
                            "contents": []
                          }
                        ]
                      },
                      "hero": {
                        "type": "image",
                        "url": "https://vos.line-scdn.net/bot-designer-template-images/bot-designer-icon.png",
                        "size": "full",
                        "aspectRatio": "1.51:1",
                        "aspectMode": "fit",
                        "backgroundColor": "#FFFFFFFF"
                      },
                      "footer": {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                          {
                            "type": "button",
                            "action": {
                              "type": "uri",
                              "label": "MemberCard",
                              "uri": `https://e0d1-2403-6200-8833-cfa7-61e3-c52c-ce12-76de.ngrok.io/getpro?userId=${user.data.userId}&displayName=${user.data.displayName}`
                            },
                            "color": "#37C84AFF",
                            "style": "primary"
                          }
                        ]
                      }
                    }
                  }
                ]
              })
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
  })
  
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});