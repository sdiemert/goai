"use strict";
var express = require('express');
var router  = express.Router();
var util = require('util');

var APIUtils = require('../lib/APIUtils.js');
var AIUtils = require('../lib/AIUtils.js');

var AIRandom = require("../lib/AIRandom.js");
var AIMaximizeLiberties = require("../lib/AIMaximizeLiberties.js");
var AIAttackEnemy = require("../lib/AIAttackEnemy.js");
var AIFormEyes = require("../lib/AIFormEyes.js");

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
 * with the opposite colour token.
 */
router.post('/', function (req, res, next) {
    
    var last = APIUtils.lastMoveFromRequest(req.body);
    res.status(200);
    return res.json(last.toObject());
    
});

router.post("/ai/random", function(req, res, next){
    
    var ai = new AIRandom('random');
    var move = ai.move(req.data.board, req.data.last);

    if (move) {
        return res.status(200).json(move.toObject());
    } else {
        return res.status(500).send("Error");
    }

});

router.post("/ai/maxLibs", function(req, res, next){
    
    var ai = new AIMaximizeLiberties('maximizeLiberties');
    var move = ai.move(req.data.board, req.data.last);

    if (move) {
        return res.status(200).json(move.toObject());
    } else {
        return res.status(500).send("Error");
    }

});

router.post("/ai/attackEnemy", function(req, res, next){
    
    var ai = new AIAttackEnemy('attackEnemy');
    var move = ai.move(req.data.board, req.data.last);

    if (move) {
        return res.status(200).json(move.toObject());
    } else {
        return res.status(500).send("Error");
    }

});

router.post("/ai/formEyes", function(req, res, next){
    
    var ai = new AIFormEyes('formEyes');
    var move = ai.move(req.data.board, req.data.last);
    console.log(move);
    if (move) {
        return res.status(200).json(move.toObject());
    } else {
        return res.status(500).send("Error");
    }

});

router.post("/util/findArmies", function(req, res, next){
    
    var armies = AIUtils.findArmies(req.data.board.board);
    var final = { armies : [] };
    
    for (var i = 0; i < armies.length; i++) {
        final.armies.push(armies[i].toObject());
    }
    
    return res.status(200).json(final);

});

module.exports = router;