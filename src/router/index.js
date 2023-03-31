var express = require('express');
var router = express.Router();
let { lineOAWebHook, lineOAWebHooktest } = require('../controller/lineOAWebHook');
let { registerUser } = require('../controller/registerUser');
let { findUser } = require('../controller/findUser');
let { check } = require('../../middleware/checklLineUID');


router.post('/webhook', lineOAWebHooktest);
router.get('/finduser',check, findUser);
router.post('/registeruser', check,registerUser);

module.exports = router;