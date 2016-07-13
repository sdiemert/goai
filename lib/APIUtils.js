"use strict";

var Board = require("./Board.js");
var AIUtils = require("./AIUtils.js");

/**
 *
 * @param obj {Object}
 * @param obj.board {Array} a 2d array that represents the boards state.
 * @param obj.size {Number} the size of the board ( n x n )
 * @returns {Board.Board}
 */
function boardFromRequest(obj) {

    return new Board.Board(obj.board, obj.size);

}

/**
 * Unpacks the last move from a request body into a Board.Move 
 * object.
 * @param obj {Object}
 * @param obj.last {Object} represents the last move that was made
 * @param obj.last.x {Number}
 * @param obj.last.y {Number}
 * @param obj.last.c {Board.BLACK|Board.WHITE|Board.NONE}
 * @param obj.last.pass {boolean}
 * @returns {Board.Move}
 */
function lastMoveFromRequest(obj) {

    return new Board.Move(obj.last.x, obj.last.y, obj.last.c, obj.last.pass);

}

/**
 * Integrity check for incoming API objects.
 *
 * @param obj {object}
 * @param obj.board {array} 2d array representing board state.
 * @param obj.size {number} size of board (n x n)
 * @param obj.last {object} represents the last move made
 * @param obj.last.x {number} x coordinate of last move
 * @param obj.last.y {number} y coordinate of last move
 * @param obj.last.c {Board.BLACK | Board.WHITE} colour of last move
 * @param obj.last.pass {boolean} if the last move was a pass.
 * @return {boolean} true if the obj is a valid input, false otherwise.
 */
function isValidBody(obj) {

    if (!obj) return false;

    if (!obj.board || !(obj.board instanceof Array)) return false;
    if (!obj.size || isNaN(obj.size) || obj.size < 1 || obj.board.length !== obj.size) return false;
    else {

        for (var i = 0; i < obj.size; i++) {

            if (!obj.board[i] || obj.board[i].length !== obj.size) return false;

            for (var j = 0; j < obj.size; j++) {

                if (
                    obj.board[i][j] !== Board.NONE &&
                    obj.board[i][j] !== Board.BLACK &&
                    obj.board[i][j] !== Board.WHITE
                ) {
                    return false;
                }

            }
        }

    }

    if (!obj.last) return false;
    if (
        obj.last.x === undefined ||
        obj.last.x === null ||
        isNaN(obj.last.x) ||
        obj.last.x < 0 ||
        obj.last.x >= obj.size) {
        return false;
    }
    if (
        obj.last.y === undefined ||
        obj.last.y === null ||
        isNaN(obj.last.y) ||
        obj.last.y < 0 ||
        obj.last.y >= obj.size
    ) {
        return false;
    }
    if (isNaN(obj.last.c) || (obj.last.c !== Board.NONE && obj.last.c !== Board.BLACK && obj.last.c !== Board.WHITE )) return false;

    if (typeof obj.last.pass !== 'boolean') return false;

    if(obj.last.pass === false){
        if (obj.board[obj.last.x][obj.last.y] !== obj.last.c) return false
    }
    
    var armies = AIUtils.findArmies(obj.board);
    for (var i = 0; i < armies.length; i++) {
        if (armies[i].liberties.length == 0)
            return false;
    }

    return true;

}

module.exports = {
    lastMoveFromRequest : lastMoveFromRequest,
    boardFromRequest    : boardFromRequest,
    isValidBody         : isValidBody
};