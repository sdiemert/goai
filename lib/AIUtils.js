"use strict";

var util = require('util');
var Board = require("./Board.js");

/**
 * Logic to handle board after a move is played
 * 
 * @param board {Board.Board} object representing board state.
 * @return {Board.Board|boolean} if board was in a proper state, false otherwise
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
    var findArmiesRec = function(current, army) {

        if (current == null)
            return false;
        else if (current.checked == true)
            return false;
        else if (current.token == 0)
            return true;
        else if (current.token != army.color)
            return false;
            
        current.checked = true;
        var x = current.pos[0];
        var y = current.pos[1];
       
        var left  = (y == 0) ? null : complexBoard[x][y-1];
        var up    = (x == 0) ? null : complexBoard[x-1][y];
        var right = (y == complexBoard.length-1) ? null : complexBoard[x][y+1];
        var down  = (x == complexBoard.length-1) ? null : complexBoard[x+1][y];
        
        if (findArmiesRec(left, army))
            current.addToLiberties(left);
        if (findArmiesRec(up, army))
            current.addToLiberties(up);
        if (findArmiesRec(right, army))
            current.addToLiberties(right);
        if (findArmiesRec(down, army))
            current.addToLiberties(down);
        
        army.addToken(current);
        
        return false;

   }

    var current = null;
    for (var i = 0; i < complexBoard.length; i++) {
        for (var j = 0; j < complexBoard.length; j++) {
            current = complexBoard[i][j];
            
            if (current.token == 0)
                continue;
            
            if (current.checked == false) {
                armies.push(new Board.Army(current.token));
                findArmiesRec(current, armies[armies.length-1]);
            }
        }
    }
    
    return armies;

}


module.exports = {
    findArmies : findArmies
};