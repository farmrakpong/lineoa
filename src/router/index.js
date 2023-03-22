var express = require('express');
var router = express.Router();

let {lineOAWebHook} = require('../controller/lineOAWebHook');
let {registerUser} = require('../controller/registerUser');


router.post('/webhook',lineOAWebHook);
router.post('/registeruser',registerUser);

module.exports = router;