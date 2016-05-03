"use strict";
/**
 * Create by sdiemert on 2016-05-02
 *
 * Unit tests for: AIRandom.
 */

var assert   = require('assert');
var AI       = require('../lib/AI.js');
var Board    = require("../lib/Board.js");

describe("AI", function () {

    var subject;

    beforeEach(function (done) {
        subject = new AI('tester');
        done();
    });

    afterEach(function (done) {
        subject = null;
        done();
    });

    describe("#move()", function () {

        it("should throw an error since it is abstract", function () {
            assert.throws(function(){
                subject.move();
            }, Error);
        });
    });

    describe("#getNextMoveColor()", function(){

        var lastMove = null;

        beforeEach(function(done){
            lastMove = new Board.Move(0, 0, Board.NONE, false);
            done();
        });

        afterEach(function(done){
            lastMove = null;
            done();
        });

        it("should return BLACK on WHITE", function(){
            lastMove.color = Board.WHITE; 
            assert.equal(subject.getNextMoveColor(lastMove), Board.BLACK);
        });

        it("should return WHITE on BLACK", function(){
            lastMove.color = Board.BLACK;
            assert.equal(subject.getNextMoveColor(lastMove), Board.WHITE);
        });
        
        it("should return BLACK on NONE", function(){
            lastMove.color = Board.NONE;
            assert.equal(subject.getNextMoveColor(lastMove), Board.BLACK);
        });

        it("should return BLACK without by default", function(){
            lastMove.color = null;
            assert.equal(subject.getNextMoveColor(lastMove), Board.BLACK);
        });
        
    });

});