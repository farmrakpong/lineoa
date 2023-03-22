const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        port : 3306,
        user : 'root',
        password : '1234',
        database : 'lineOA'
    },
    acquireConnectionTimeout: 10000
  });

  module.exports = knex
  
  