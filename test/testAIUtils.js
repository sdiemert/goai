"use strict";
/**
 * Create by lloydmontgomery on 2016-05-18
 * 
 * Unit tests for: ../lib/AIUtils.js
 */

var assert = require('assert');
var st  = require("supertest");

var AIUtils = require('../lib/AIUtils.js');
var util = require('util');

describe("AIUtils", function () {
    
    var board = null;
    var armies = null;
    
    beforeEach(function (done) {
        board = [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
        ];
        done();
    });
    
    afterEach(function (done) {
        board = null;
        armies = null;
        done();
    });
    
    describe("#findArmies", function () {
        
        it("should return no armies on a board with no armies", function () {
            assert.equal(AIUtils.findArmies(board), false);
        });
        
        it("should return the only army on the board, at the right position", function () {
            
            board[0][0] = 1;
            armies = AIUtils.findArmies(board);
            console.log(armies);
            assert.equal(armies.length, 1);
            assert.deepEqual(armies[0].tokens[0].pos, [0,0]);
        });
        
        it("should return an army with 4 liberties", function () {
            board[1][1] = 1;
            armies = AIUtils.findArmies(board);
            
            assert.equal(armies[0].liberties.length, 4);
        });
        
        it("should return an army with 3 liberties, not 4", function () {
            board[0][0] = 1;
            board[0][1] = 1;
            board[1][0] = 1;
            armies = AIUtils.findArmies(board);

            assert.equal(armies[0].liberties.length, 3);
        });
        
        it("should return 2 armies, each length 1", function () {
            board[0][1] = 1;
            board[1][0] = 1;
            armies = AIUtils.findArmies(board);

            assert.equal(armies.length, 2);
            assert.equal(armies[0].size, 1);
            assert.equal(armies[1].size, 1);
        });
        
        it("should return 2 armies, one of each colour, even though they are next to each other", function () {
            board[0][0] = 1;
            board[1][0] = 1;
            board[2][0] = 1;
            board[0][1] = 2;
            board[1][1] = 2;
            board[2][1] = 2;
            armies = AIUtils.findArmies(board);
            
            assert(armies.length, 2);
        });
        
        it("should return an army of size 40, despite it's complex structure", function () {
            board = [
                [0,0,2,2,2,2,2,0,0],
                [0,0,2,0,0,0,2,2,2],
                [2,2,2,0,2,0,0,0,2],
                [0,0,2,0,2,2,2,0,2],
                [0,2,2,2,2,0,2,0,2],
                [0,2,0,2,0,0,2,2,2],
                [0,2,0,2,2,2,2,0,0],
                [0,2,0,2,0,0,0,0,0],
                [0,2,2,2,0,0,0,0,0]
            ];
            armies = AIUtils.findArmies(board);
            
            assert(armies.length, 1);
            assert(armies[0].size, 40);
            assert(armies[0].liberties.length, 38);
        });
    });
});