"use strict";

var Board = require("./Board.js");

/**
 *
 * @param obj {Object}
 * @param obj.board {Array} a 2d array that represents the boards state.
 * @param obj.size {Number} the size of the board ( n x n )
 * @returns {Board.Board}
 */
function boardFromRequest(obj){

    return new Board.Board(obj.board, obj.size);

}

/**
 *
 * @param obj {Object}
 * @param obj.last {Object} represents the last move that was made
 * @param obj.last.x {Number}
 * @param obj.last.y {Number}
 * @returns {Board.Move}
 */
function lastMoveFromRequest(obj) {

    // TODO: infer color from previous move.

    return new Board.Move(obj.last.x, obj.last.y, Board.BLACK);

}

module.exports = {
    lastMoveFromRequest : lastMoveFromRequest,
    boardFromRequest : boardFromRequest
};