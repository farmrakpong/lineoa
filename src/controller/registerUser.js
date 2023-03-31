const knex = require('../../db/index');
const line = require('@line/bot-sdk');

const registerUser = async(req, res) => {
    let item = req.body
    item.useId  = req.headers.userid
    let status = await knex('User').insert(item).then((result) => {
        return 200
    }).catch((err) => {
        console.log(err);
        return 400
    });
    res.status(status).send(status)
}
module.exports = {registerUser}