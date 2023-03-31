const knex = require('../../db/index');
// const line = require('@line/bot-sdk');

const findUser = async(req, res) => {
let item = req.headers.userid
let val  = await  knex('User').where({
          useId : item,
      }).select().first()
   val.pictureUrl = req.headers.pictureUrl
    res.status(200).send(val)
}
module.exports = {findUser}