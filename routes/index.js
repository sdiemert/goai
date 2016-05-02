"use strict";
var express = require('express');
var router  = express.Router();

var AIUtils = require('../lib/AIUtils.js');
var Watson = require("../lib/WatsonAI.js");

/* The structure of request.body is:
 * { board : [[number, ...], ...], size : number, last : { x : number, y : number } } }
 *
 * Response payload will be:
 * { x : number, y : number, color: number, pass : Boolean }
 */

/**
 * Route echo's the move that was sent. 
 */
router.post('/', function (req, res, next) {
    var last = AIUtils.lastMoveFromRequest(req.body);
    res.json(last);

});

module.exports = router;