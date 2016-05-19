"use strict";
var express = require('express');
var router  = express.Router();
var util = require('util');

var APIUtils = require('../lib/APIUtils.js');

var AIRandom = require("../lib/AIRandom.js");
var AIMaximizeLiberties = require("../lib/AIMaximizeLiberties.js");

router.use(function(req, res, next){

    if(!APIUtils.isValidBody(req.body)) {
        return res.status(400).send("Invalid request format.");
    }
    
    req.data = {};
    req.data.last  = APIUtils.lastMoveFromRequest(req.body);
    req.data.board = APIUtils.boardFromRequest(req.body);

    next();
    
});

/**
 * Route echo's the move that was sent but
 * with the opposite color token.
 */
router.post('/', function (req, res, next) {
    
    var last = APIUtils.lastMoveFromRequest(req.body);
    res.status(200);
    return res.json(last.toObject());
    
});

router.post("/random", function(req, res, next){
    
    var ai = new AIRandom('random');
    var move = ai.move(req.data.board, req.data.last);

    if (move) {
        return res.status(200).json(move.toObject());
    } else {
        return res.status(500).send("Error");
    }

});

router.post("/maxLibs", function(req, res, next){
    
    var ai = new AIMaximizeLiberties('maximizeLiberties');
    var move = ai.move(req.data.board, req.data.last);

    if (move) {
        return res.status(200).json(move.toObject());
    } else {
        return res.status(500).send("Error");
    }

});

module.exports = router;