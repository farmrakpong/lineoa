const knex = require('../../db/index');


const registerUserService = async (item)  => {
 let status  =  await  knex('User').insert(item).then((result) => {
        return 200
        }).catch((err) => {
            console.log(err);
            return 400
        });
        
        return status
    // res.status(status).send(status)
}
module.exports = {
    registerUserService,
}
