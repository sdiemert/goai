"use strict";

var Board = require("./Board.js");
var AI = require("./AI.js");
var AIUtils = require('../lib/AIUtils.js');

class AIAttackEnemy extends AI {

    constructor(name) {
        super(name);
    }

    /**
     * Places a token such that an enemy liberty is taken away.
     * Prioritizes armies with less liberties, does not bother
     * with armies that are classified as "alive"
     *
     * @param board {Board.Board} the current board state
     * @param lastMove {Board.Move} the previous move that was made.
     * @returns {Board.Move} the move the AI chose to make, null if error.
     */
    move(board, lastMove){

        const findMove = function(armies) {
            for (let army of armies) {
                console.log(army);
                for (let lib of army.liberties) {

                    // Check if it is legal to place a piece here
                    if(board.isLegalPlay(lib[0], lib[1])) {
                        newMove.x = lib[0];
                        newMove.y = lib[1];
                        return;
                    }
                }
            }
        }

        if (!board || !lastMove) return null;

        var newMove = new Board.Move();
        newMove.colour = this.getNextMovecolour(lastMove);
        var armies = AIUtils.findArmies(board.board);

        // Fiter out the armies that belong to the current player
        armies = armies.filter(function(army){return army.colour !== newMove.colour});

        // Sort the armies by number of free liberties, ascending
        armies.sort(function(a, b) {return a.liberties.length > b.liberties.length});
        // console.log(armies);
        if (armies.length == 0) {
            // Board is empty
            newMove.x = Math.floor(Math.random() * board.size);
            newMove.y = Math.floor(Math.random() * board.size);
        } else if (armies[0].liberties.length == 1) {
            // Then a capture can be performed, play is automatically legal
            newMove.x = armies[0].liberties[0][0];
            newMove.y = armies[0].liberties[0][1];
        } else {
            // We need to check for at least one liberty where we want to play
            findMove(armies);
        }

        if (newMove.x === undefined)
            newMove.pass = true;

        if (newMove.x !== undefined && newMove.y !== undefined && board.isLegalPlay(newMove.x, newMove.y)) ;
        else newMove.pass = true;
        
        return newMove;
    }


}

module.exports = AIAttackEnemy;