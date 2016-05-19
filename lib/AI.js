"use strict";

var Board = require("./Board.js");

class AI {

    constructor(name) {
        this._name = name;
    }

    /**
     * Calculates the next move given a board state and
     * the previous move.
     *
     * Must infer which "colour" the AI is meant to be playing
     * by looking at the previous move's colour. if no previous
     * move is provided then the colour black (1) is chosen.
     *
     * @param board {Board.Board} the current board state
     * @param lastMove {Board.Move} the previous move that was made.
     * @returns {Board.Move} the move the AI chose to make.
     */
    move(board, lastMove){
        
        throw new Error("Unimplemented method!");
        
    }

    /**
     * Calculates the colour for the next move based on the previous move.
     * @param m {Board.Move} the previous move.
     *
     * @return {Board.WHITE|Board.BLACK|Board.NONE} the colour for the next move.
     */
    getNextMovecolour(m) {

        switch(m.colour){
            
            case Board.BLACK:
                return Board.WHITE; 
                break;
            case Board.WHITE:
                return Board.BLACK; 
                break; 
            case Board.NONE:
                return Board.BLACK; 
                break;
            default:
                return Board.BLACK;
                break; 
        }

    }

    get name() {
        return this._name;
    }

    set name(n){
        this._name = n;
    }

}

module.exports = AI;