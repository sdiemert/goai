"use strict";
/**
 * Create by sdiemert on 2016-05-02
 *
 * Unit tests for: AIMaximizeLiberties.
 */

var assert   = require('assert');
var Board    = require('../lib/Board.js');
var AIMaximizeLiberties = require('../lib/AIMaximizeLiberties.js');

describe("AIMaximizeLiberties", function () {

    var AI = null;

    beforeEach(function (done) {
        AI = new AIMaximizeLiberties('MaximizeLiberties');
        done();
    });

    afterEach(function (done) {
        AI = null;
        done();
    });

    /**
     * Testing this method is difficult b/c the method
     * relies on randomly selected numbers, even though
     * it is selected random.
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

        it("should pass if last move was pass", function (done) {

            lastMove.pass = true; 
            lastMove.colour = Board.WHITE; 
            
            var m = AI.move(board, lastMove);
            
            assert.equal(m.colour, Board.BLACK);
            assert.equal(m.pass, true);

            done();

        });
        
        it("should pass if the board is full", function (done) {

            lastMove.pass = false; 
            lastMove.colour = Board.WHITE;

            board.board = [[1,1,1], [2,2,2], [1,1,1]];

            var m = AI.move(board, lastMove);
            
            assert.equal(m.colour, Board.BLACK);
            assert.equal(m.pass, true);

            done();

        });
        
        it("should pick a spot on the board", function (done) {

            lastMove.pass = false;
            lastMove.colour = Board.WHITE;

            var m = AI.move(board, lastMove);
            
            assert.equal(m.colour, Board.BLACK);
            assert.equal(m.pass, false);
            assert(m.x < board.size);
            assert(m.y < board.size);
            assert(m.x >= 0);
            assert(m.y >= 0);

            done();

        });

        it("should default to BLACK token if no last move colour provided", function(){
            
            lastMove.pass = false;
            lastMove.colour = Board.NONE; 
            var m = AI.move(board, lastMove);
            
            assert.equal(m.colour, Board.BLACK);
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

        it("should return the only move with 4 liberties", function(){
            var m = AI.move(board, lastMove);
            assert.deepEqual(m, new Board.Move(1, 1, 1, false));
        });

        it("should return the only move with 3 liberties", function(){
            lastMove = new Board.Move(2, 2, Board.BLACK, false);
            board = new Board.Board(
                [[0,0,0],[1,0,1],[1,1,1]],
                3
            );

            var m = AI.move(board, lastMove);
            assert.deepEqual(m, new Board.Move(0, 1, 2, false));
        });

        it("should return the only move with 2 liberties", function(){
            lastMove = new Board.Move(2, 2, Board.BLACK, false);
            board = new Board.Board(
                [[0,0,1],[0,1,1],[1,1,1]],
                3
            );

            var m = AI.move(board, lastMove);
            assert.deepEqual(m, new Board.Move(0, 0, 2, false));
        });
        
    });

});