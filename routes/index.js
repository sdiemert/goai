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

router.post('/watson', function (req, res, next) {

    var B = AIUtils.boardFromRequest(req.body);
    var last = AIUtils.lastMoveFromRequest(req.body);

    var W = new Watson();
    
    res.json(W.move(B, last));

});

module.exports = router;