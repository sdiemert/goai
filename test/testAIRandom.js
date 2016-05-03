"use strict";
/**
 * Create by sdiemert on 2016-05-02
 *
 * Unit tests for: AIRandom.
 */

var assert   = require('assert');
var AIRandom = require('../lib/AIRandom.js');
var Board    = require('../lib/Board.js');

describe("AIRandom", function () {

    var AI = null;

    beforeEach(function (done) {
        AI = new AIRandom('random');
        done();
    });

    afterEach(function (done) {
        AI = null;
        done();
    });

    /**
     * Testing this method is difficult b/c the method
     * relies on randomly selected numbers.
     */
    describe("#move()", function () {

        var lastMove = null;
        var board    = null;

        beforeEach(function (done) {
            lastMove = new Board.Move(0, 0, Board.NONE, false);
            board = new Board.Board(
                [[0,0,0],[0,0,0],[0,0,0]],
                3
            );
            done();
        });

        afterEach(function (done) {
            lastMove = null;
            board = null; 
            done();
        });

        it("it should pass if last move was pass", function (done) {

            lastMove.pass = true; 
            lastMove.color = Board.WHITE; 
            
            var m = AI.move(board, lastMove);
            
            assert.equal(m.color, Board.BLACK);
            assert.equal(m.pass, true);

            done();

        });
        
        it("it should pass if the board is full", function (done) {

            lastMove.pass = false; 
            lastMove.color = Board.WHITE;

            board.board = [[1,1,1], [2,2,2], [1,1,1]];

            var m = AI.move(board, lastMove);
            
            assert.equal(m.color, Board.BLACK);
            assert.equal(m.pass, true);

            done();

        });
        
        it("should pick a spot on the board", function (done) {

            lastMove.pass = false; 
            lastMove.color = Board.WHITE;

            var m = AI.move(board, lastMove);
            
            assert.equal(m.color, Board.BLACK);
            assert.equal(m.pass, false);
            assert(m.x < board.size);
            assert(m.y < board.size);
            assert(m.x >= 0);
            assert(m.y >= 0);

            done();

        });

        it("should default to BLACK token if no last move color provided", function(){
            
            lastMove.pass = false;
            lastMove.color = Board.NONE; 
            var m = AI.move(board, lastMove);
            
            assert.equal(m.color, Board.BLACK);
            assert.equal(m.pass, false);
            assert(m.x < board.size);
            assert(m.y < board.size);
            assert(m.x >= 0);
            assert(m.y >= 0);

        });
        
        it("should return null if invalid board parameter", function(){
            var m = AI.move(null, lastMove);
            assert.equal(m, null);
        });

        it("should return null if invalid lastMove", function(){
            var m = AI.move(board, null);
            assert.equal(m, null);
        });
        
    });

});