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
     * Must infer which "color" the AI is meant to be playing
     * by looking at the previous move's color. if no previous
     * move is provided then the color black (1) is chosen.
     *
     * @param board {Board.Board} the current board state
     * @param lastMove {Board.Move} the previous move that was made.
     * @returns {Board.Move} the move the AI chose to make.
     */
    move(board, lastMove){
        
        throw new Error("Unimplemented method!");
        
    }

    get name() {
        return this._name + "from getter";
    }

    set name(n){
        this._name = n;
    }

}

module.exports = AI;