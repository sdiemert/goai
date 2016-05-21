"use strict";

var util = require('util');
var Board = require("./Board.js");

/**
 * Logic to handle board after a move is played
 * 
 * @param board {Board.Board} object representing board state.
 * @return {Board.Army[]}
 */
function findArmies(board) {

    var complexBoard = [];
    var armies = [];
    
    // Populate complexBoard
    for (var i = 0; i < board.length; i++) {
        complexBoard.push([]);
        for (var j = 0; j < board.length; j++) {
            complexBoard[i].push(new Board.Intersection(i, j, board[i][j]));
        }
    }
    
    /**
     * Recursive function that classifies intersections in armies 
     * based on connectivity
     * 
     * @param current {Board.Intersection}
     * @param army {Board.Army}
     * @returns {boolean} true if a liberty is found, false otherwise
     */
    var _findArmiesRec = function(current, army) {

        if (current == null)
            return false;
        else if (current.checked == true)
            return false;
        else if (current.colour == 0)
            return true;
        else if (current.colour != army.colour)
            return false;
            
        current.checked = true;
        var x = current.pos[0];
        var y = current.pos[1];
       
        var left  = (y == 0) ? null : complexBoard[x][y-1];
        var up    = (x == 0) ? null : complexBoard[x-1][y];
        var right = (y == complexBoard.length-1) ? null : complexBoard[x][y+1];
        var down  = (x == complexBoard.length-1) ? null : complexBoard[x+1][y];
        
        if (_findArmiesRec(left, army))
            current.addToLiberties(left);
        if (_findArmiesRec(up, army))
            current.addToLiberties(up);
        if (_findArmiesRec(right, army))
            current.addToLiberties(right);
        if (_findArmiesRec(down, army))
            current.addToLiberties(down);
        
        army.addToken(current);
        
        return false;

   }

    var current = null;
    for (var i = 0; i < complexBoard.length; i++) {
        for (var j = 0; j < complexBoard.length; j++) {
            current = complexBoard[i][j];
            
            if (current.colour == 0)
                continue;
            
            if (current.checked == false) {
                armies.push(new Board.Army(current.colour));
                _findArmiesRec(current, armies[armies.length-1]);
            }
        }
    }
    
    return armies;

}

module.exports = {
    findArmies : findArmies
};