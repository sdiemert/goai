"use strict";

var Board = require("./Board.js");
var AI = require("./AI.js");
var AIUtils = require('../lib/AIUtils.js');
var util = require('util');

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

        if (!board || !lastMove) return null;

        const b = board.board;
        const newMove = new Board.Move();
        newMove.colour = this.getNextMovecolour(lastMove);
        let armies = AIUtils.findArmies(board.board);

        // Remove armies of the opponent, they are not important to our decision,
        // also sort by army size to make it easier to prioritize larger armies
        armies = armies
            .filter((army) => {return army.colour == newMove.colour})
            .sort((army1, army2) => {return army2.liberties.length-army1.liberties.length});

        // Find the liberties and counts, they are telling of eyes
        const liberties = this._identifyUniqueLiberties(armies);

        // Identify the liberties that can be made into eyes, and count how close they are
        const remToks = this._countRemainingTokensTillEye(b, lastMove.colour, liberties);

        // Pick the liberty that should be made into an eye, or, 
        // work towards turning fake eyes into real eyes
        const moveCoords = this._pickMove(b, newMove.colour, remToks);
        
        if (moveCoords === false)
            newMove.pass = true;
        else
            newMove.setXY(moveCoords[0], moveCoords[1]);

        return newMove;   
    }

    _pickMove(b, colour, remToks) {

        function cornerObj(x, y) {
            return {
                token: b[x] !== undefined ? b[x][y] : undefined,
                pos: [x, y]
            }
        }

        function isAgainstEdge(corners) {
            let undefCount = 0;
            for(let corner of corners) {
                if (corner.token === undefined)
                    undefCount += 1
            }
            return (undefCount > 0);
        }

        // Check all of the existing eyes, and if any of them are fake 
        // they need to be solidified to be alive
        let corners = [], maxFree = -1;
        for(let eye of remToks[0]) {

            // Check diagonals from eye. There can only be one free spot
            // (Unless the eye is against the wall, then there cannot be any)
            corners = []  // Clear Array
            corners.push(cornerObj(eye[0]-1, eye[1]-1));
            corners.push(cornerObj(eye[0]-1, eye[1]+1));
            corners.push(cornerObj(eye[0]+1, eye[1]+1));
            corners.push(cornerObj(eye[0]+1, eye[1]-1));

            // If the eye is against the edge, there can be no free corners, otherwise 1
            maxFree = isAgainstEdge(corners) ? 0 : 1;

            // Loop over corners, pick one of them to be the move of choice
            for(let corner of corners) {
                if (corner.token === 0) {
                    if (maxFree == 1) {
                        maxFree -= 1;  // Reduce so next time it hits (This allows one free corner)
                    } else {  // Max Free is 0, we need to fill in this corner
                        return corner.pos
                    }
                }
            }
        }

        // If none of the above needed to be filled in, work towards building an eye from the remaining choices
        for(let i = 1; i < remToks.length; i++) {  // Loop over all categories of eyes, starting at most complete
            for(let eye of remToks[i]) {  // Loop through eyes, looking for valid moves
                // Figure out which spot needs to be played in to complete the eye
                // b[eye[0]][eye[1]]  // Eye we are currently investigating
                if(b[eye[0]-1] && b[eye[0]-1][eye[1]] == 0)  // Top
                    return [eye[0]-1, eye[1]];
                else if(b[eye[0]][eye[1]+1] == 0)  // Right
                    return [eye[0], eye[1]+1];
                else if(b[eye[0]+1] && b[eye[0]+1][eye[1]] == 0)  // Bottom
                    return [eye[0]+1, eye[1]];
                else if(b[eye[0]][eye[1]-1] == 0)  // Left
                    return [eye[0], eye[1]-1];
            }
        }

        // If none of the above end up working, return false so the parent function knows
        return false;
    }

    // Create an array exactly 4 long where the index corresponds to the remaining
    // adjacent tokens required to form an eye. Index 0 means the eye already exists,
    // Index 1 means this spot is one token short of being an eye
    _countRemainingTokensTillEye(b, opColour, libs) {  
        const remToks = [[],[],[],[]];
        let surroundingSpaces = [];

        for(let lib of libs) {
            
            surroundingSpaces = []  // Clear array
            surroundingSpaces.push(b[lib[0]-1] !== undefined ? b[lib[0]-1][lib[1]] : undefined);
            surroundingSpaces.push(b[lib[0]][lib[1]+1]);
            surroundingSpaces.push(b[lib[0]+1] !== undefined ? b[lib[0]+1][lib[1]] : undefined);
            surroundingSpaces.push(b[lib[0]][lib[1]-1]);

            let freeSpaces = 0
            for(let space of surroundingSpaces) {
                if(space == 0)
                    freeSpaces += 1;
                else if(space == opColour)
                    freeSpaces = -100;  // We don't want to report liberties that can not become eyes
            }

            if(freeSpaces >= 0)
                remToks[freeSpaces].push(lib);

        }

        return remToks;
    }

    // Looks for shared liberties, which are potential eyes
    _identifyUniqueLiberties(armies) {

        const liberties = [];
        for(let army of armies) {
            for(let lib of army.liberties) {
                if (!liberties.some((elem, i, arr) => {return elem[0] == lib[0] && elem[1] == lib[1]}))
                    liberties.push(lib);
            }
        }

        return liberties;
    }



}

module.exports = AIFormEyes;