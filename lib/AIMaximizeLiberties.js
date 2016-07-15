"use strict";

var Board = require("./Board.js");
var AI = require("./AI.js");

class AIMaximizeLiberties extends AI {

    constructor(name) {
        super(name);
    }

    /**
     * Categorizes all available intersections on the board as having
     * 1, 2, 3, or 4 liberties, then randomly places a token on an 
     * intersection with the highest possible liberties.
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
            
            var liberties = [[], [], [], [], []];

            for (var i = 0; i < board.size; i++) {
                for (var j = 0; j < board.size; j++) {
                    if (board.board[i][j] == 0) {
                        switch(this._countLiberties(board, i, j)) {
                            case 0:
                                liberties[0].push([i, j]);
                                break;
                            case 1:
                                liberties[1].push([i, j]);
                                break;
                            case 2:
                                liberties[2].push([i, j]);
                                break;
                            case 3:
                                liberties[3].push([i, j]);
                                break;
                            case 4:
                                liberties[4].push([i, j]);
                                break;
                        }
                    }
                }
            }

            var maxFreeLibs;
            for (maxFreeLibs = 4; maxFreeLibs >= 0; maxFreeLibs--) {
                if (liberties[maxFreeLibs].length != 0)
                    break
            }

            if (maxFreeLibs == -1) {
                newMove.pass = true;
            } else {
                var indexes = this._pickRandomMoveFromSet(liberties[maxFreeLibs]);
                newMove.x = indexes[0];
                newMove.y = indexes[1];
            }
        }

        if (newMove.x !== undefined && newMove.y !== undefined && board.isLegalPlay(newMove.x, newMove.y)) ;
        else newMove.pass = true;

        return newMove;
        
    }

    _countLiberties(board, x, y) {
        var freeLiberties = 0

        if (y+1 < board.size && board.board[x][y+1] == 0)
            freeLiberties += 1;
        if (y-1 >= 0 && board.board[x][y-1] == 0)
            freeLiberties += 1;
        if (x+1 < board.size && board.board[x+1][y] == 0)
            freeLiberties += 1;
        if (x-1 >= 0 && board.board[x-1][y] == 0)
            freeLiberties += 1;

        return freeLiberties;
    }

    _pickRandomMoveFromSet(possibilities) {
        var numMoves = possibilities.length;
        var randomChoice = this._getRandomNumber(numMoves);
        return possibilities[randomChoice];
    }

    _getRandomNumber(n){
        return Math.floor(Math.random() * n);
    }

    get name() {
        return this._name;
    }

    set name(n){
        this._name = n;
    }

}

module.exports = AIMaximizeLiberties;