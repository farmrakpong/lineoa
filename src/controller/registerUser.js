const knex = require('../../db/index');
const line = require('@line/bot-sdk');

const registerUser = async(req, res) => {
    let status = await knex('User').insert(req.body).then((result) => {
        return 200
    }).catch((err) => {
        console.log(err);
        return 400
    });
    res.status(status).send(status)
}
module.exports = {
    registerUser,
}