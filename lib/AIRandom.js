"use strict";

var Board = require("./Board.js");
var AI = require("./AI.js");

class AIRandom extends AI {

    constructor(name) {
        super(name);
    }

    /**
     * Randomly selects a cell on the board to place a new token.
     * Infers the colour of the token based on the last move.
     * If the last move was a pass, the AI will pass.
     *
     * @param board {Board.Board} the current board state
     * @param lastMove {Board.Move} the previous move that was made.
     * @returns {Board.Move} the move the AI chose to make, null if error.
     */
    move(board, lastMove){

        if (!board || !lastMove) return null;

        var newMove = new Board.Move();

        newMove.colour = this.getNextMovecolour(lastMove);

        if (lastMove.pass) {

            newMove.pass = true;

        } else {
            
            var tmpX = this._getRandomNumber(board.size);
            var tmpY = this._getRandomNumber(board.size);

            var counter = 0;

            while (
                board.board[tmpX][tmpY] !== Board.NONE &&
                counter <= board.size * board.size
            ) {
                tmpX = this._getRandomNumber(board.size);
                tmpY = this._getRandomNumber(board.size);
                counter++;
            }

            newMove.x = tmpX;
            newMove.y = tmpY;

            newMove.pass = counter > board.size * board.size;

        }

        return newMove;
        
    }

    get name() {
        return this._name;
    }

    set name(n){
        this._name = n;
    }

    _getRandomNumber(n){
        return Math.floor(Math.random() * n);
    }

}

module.exports = AIRandom;