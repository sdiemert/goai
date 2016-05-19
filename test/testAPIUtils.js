/**
 * Create by sdiemert on 2016-05-01
 *
 * Unit tests for: ../lib/APIUtils.js
 */

var assert  = require('assert');
var apiutils = require('../lib/APIUtils.js');

describe("APIUtils", function () {

    var obj = null;

    beforeEach(function (done) {

        obj = {
            board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            size : 3,
            last : {x: 0, y: 0, c: 0, pass: false}
        };

        done();

    });

    afterEach(function (done) {

        obj = null;
        done();

    });

    describe("#isValidBody()", function () {

        it("should return false on falsy object", function () {
            assert.equal(apiutils.isValidBody(null), false);
            assert.equal(apiutils.isValidBody(), false);
        });


        it("should return false on no board", function () {
            delete obj.board;
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false on null board", function () {
            obj.board = null;
            assert.equal(apiutils.isValidBody(obj), false);
        });
        
        it("should return false on non-array board", function () {
            obj.board = 5; //not an array
            assert.equal(apiutils.isValidBody(obj), false);
        });
        
        it("should return false for no size", function () {
            delete obj.size;
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false for non-number size", function () {
            obj.size = "foo"; //NaN
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false for size < 1", function () {
            obj.size = 0;
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false for mismatch board and size", function () {
            obj.board = [];
            obj.size = 1;
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false for mismatch board and size 2", function () {
            delete obj.board[2];
            obj.size = 3; 
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false for mismatch inner board size", function () {
            delete obj.board[2][0];
            obj.size = 3;
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false for invalid board value", function () {
            obj.board[2][0] = 20;
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false for falsy last", function () {
            obj.last = null;
            assert.equal(apiutils.isValidBody(obj), false);
        });
        
        it("should return false for falsy last move x coordinate", function () {
            obj.last.x = null;
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false for x coordinate less than 0", function () {
            obj.last.x = -1;
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false for x coordinate out of bounds", function () {
            obj.last.x = 3;
            obj.size = 3;
            assert.equal(apiutils.isValidBody(obj), false);
        });
        
        it("should return false for falsy last move y coordinate", function () {
            obj.last.y = null;
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false for negative y coordinate", function () {
            obj.last.y = -1;
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false for y out of bounds", function () {
            obj.last.y = 3;
            obj.size = 3;
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false non-boolean pass", function () {
            obj.last.pass = "foo";
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false for falsy colour", function () {
            delete obj.last.c;
            assert.equal(apiutils.isValidBody(obj), false);
        });
        
        it("should return false for invalid colour ", function () {
            obj.last.c = 20;
            assert.equal(apiutils.isValidBody(obj), false);
        });

        it("should return false for invalid board given last move", function() {
            obj.last.c = 1;
            assert.equal(apiutils.isValidBody(obj), false);
        });
        
        it("should return true on OK case", function(){
            assert.equal(apiutils.isValidBody(obj), true);
        });
        
    });
    

});