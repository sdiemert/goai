"use strict";
var express = require('express');
var router  = express.Router();

var AIUtils = require('../lib/AIUtils.js');
var Watson = require("../lib/WatsonAI.js");

/* The structure of request.body is:
 * { board : [[number, ...], ...], size : number, last : { x : number, y : number, c : number, pass : boolean } } }
 *
 * Response payload will be:
 * { x : number, y : number, c: number, pass : Boolean }
 */

router.use(function(err, req, res, next){

    if(err || !AIUtils.isValidBody(req.body)) {
        res.status(400).send("Invalid request format.");
    }

});

/**
 * Route echo's the move that was sent but
 * with the opposite color token.
 */
router.post('/', function (req, res, next) {
    
    var last = AIUtils.lastMoveFromRequest(req.body);
    res.status(200);
    return res.json(last);
    
});

module.exports = router;