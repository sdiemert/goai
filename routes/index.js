"use strict";
var express = require('express');
var router  = express.Router();

var AIUtils = require('../lib/AIUtils.js');

var AIRandom = require("../lib/AIRandom.js");

/* The structure of request.body is:
 * { board : [[number, ...], ...], size : number, last : { x : number, y : number, c : number, pass : boolean } } }
 *
 * Response payload will be:
 * { x : number, y : number, c: number, pass : Boolean }
 */

router.use(function(req, res, next){

    if(!AIUtils.isValidBody(req.body)) {
        return res.status(400).send("Invalid request format.");
    }else{
        next(); 
    }

});

/**
 * Route echo's the move that was sent but
 * with the opposite color token.
 */
router.post('/', function (req, res, next) {
    
    var last = AIUtils.lastMoveFromRequest(req.body);
    res.status(200);
    return res.json(last.toObject());
    
});

router.post("/random", function(req, res, next){

    var last  = AIUtils.lastMoveFromRequest(req.body);
    var board = AIUtils.boardFromRequest(req.body);
    
    var ai = new AIRandom('random');

    var move = ai.move(board, last);

    if (move) {
        return res.status(200).json(move.toObject());
    } else {
        return res.status(500).send("Error");
    }

});

module.exports = router;