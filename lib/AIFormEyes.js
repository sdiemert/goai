"use strict";

var Board = require("./Board.js");
var AI = require("./AI.js");
var AIUtils = require('../lib/AIUtils.js');

class AIFormEyes extends AI {

    constructor(name) {
        super(name);
    }

    /**
     * Attempts to form eyes to keep armies alive.
     * 
     * Classifies armies as being alive or not, then attempts to create new
     * eyes in the largest armies that are most likely to have an eye-creation
     * attempt succeed.
     * 
     * The logic going into this is actually not that complex, just a
     * calculation based on army size, and some quick checks against 
     * positions in the army that are easier to form eyes in.
     * 
     */
    move(board, lastMove){

        // Looks for shared liberties, which are potential eyes
        function identifySharedLiberties(armies) {
            const liberties = {};
            for(let army of armies) {
                for(let token of army.tokens) {
                    for(let lib of token.liberties) {
                        if (lib in liberties)
                            liberties[lib].count += 1;
                        else
                            liberties[lib] = {
                                pos: lib,
                                count: 1
                            };
                    }
                }
            }
            return liberties;
        }

        function separateLiberties(libs) {
            const lib_counts = [[],[],[],[]];

            for(let key in libs) {
                const index = 4 - libs[key].count;
                lib_counts[index].push(libs[key].pos)
            }

            return lib_counts;
        }

        if (!board || !lastMove) return null;

        var newMove = new Board.Move();
        newMove.colour = this.getNextMovecolour(lastMove);
        var armies = AIUtils.findArmies(board.board);

        // Remove armies of the opponent, they are not important to our decision,
        // also sort by army size to make it easier to prioritize larger armies
        armies = armies
            .filter((army) => {return army.colour == newMove.colour})
            .sort((army1, army2) => {return army2.liberties.length-army1.liberties.length});

        // Find the liberties and counts, they are telling of eyes
        const liberties = identifySharedLiberties(armies);
        console.log(liberties);

        // Sort the liberties based on number of pieces perpendicular to it
        // The first index is all liberties with 4 shared references (real & false eyes),
        // Followed by all 3 shared references, 2, etc.
        const lib_counts = separateLiberties(liberties)
        // const lib_counts = [
        //     liberties.filter((lib) => {return lib.count == 4})
        // ]


        console.log(lib_counts);

        
        // console.log(armies);
        return;
    }



}

module.exports = AIFormEyes;