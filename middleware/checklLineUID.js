
const TOKEN = process.env.TOKEN
const axios = require('axios');
const check = async (req, res, next) => {
    const {userid} = req.headers
    // console.log(req.headers);
    const config = {
        headers: { Authorization: `Bearer ${TOKEN}` }
    };

        let valuser = await axios.get(`https://api.line.me/v2/bot/profile/${userid}`, config)
        .then((response) => {
            return response.data
        }).catch((err)=>{
            // console.log("Asd");
            return 417
        })
        req.headers.pictureUrl = valuser.pictureUrl
        // console.log(valuser);
        if (valuser == 417) {
            return res.status(417).send("Header Bad")
        }
        next()
}
module.exports = {check}