"use strict";

var BLACK = 1;
var WHITE = 2;
var NONE = 0;

class Move {

    /**
     * @param x {number}
     * @param y {number}
     * @param c {NONE|BLACK|WHITE}
     * @param p {boolean}
     */
    constructor(x, y, c, p) {
        this._x = x;
        this._y = y;
        this._c = c || 1;
        this._pass = p || false;
    }

    toObject() {
        return {x: this.x, y: this.y, c: this.color, pass : this.pass};
    }

    /**
     * @returns {NONE|BLACK|WHITE}
     */
    get color(){
        return this._c; 
    }

    /**
     * @param c {NONE|BLACK|WHITE}
     */
    set color(c){
        this._c = c; 
    }

    /**
     * @returns {number}
     */
    get x(){
        return this._x;
    }

    /**
     * @param x {number}
     */
    set x(x){
        this._x = x; 
    }

    /**
     * @returns {number}
     */
    get y(){
        return this._y;
    }

    /**
     * @param y {number}
     */
    set y(y){
       this._y = y;
    }

    /**
     * @returns {boolean}
     */
    get pass(){
        return this._pass;
    }

    /**
     * @param p {boolean}
     */
    set pass(p){
        this._pass = p;
    }

}

/**
 * Represents a board state as an array.
 *
 * Each spot is one of: 0, 1, 2 where:
 *  - 0 indicates no token
 *  - 1 indicates a "black" token
 *  - 2 indicates a "white" token
 */
class Board {

    /**
     * @param A {Array} 2d array of numbers representing the board state.
     * @param n {number} the size of the board: n x n.
     */
    constructor(A, n) {

        this._B    = [];
        this._size = n;

        for (var i = 0; i < this.size; i++) {
            this.board.push([]);
            for (var j = 0; j < this.size; j++) {
                this.board[i].push(A[i][j]);
            }
        }

    }

    toObject() {
        return this.board;
    }
    
    get board(){
        return this._B; 
    } 
    
    set board(b){
        this._B = b;  
    }
    
    get size(){
        return this._size; 
    }
    
    set size(s){
        this._size = s; 
    }

}

module.exports = {
    Move : Move,
    Board: Board,
    BLACK: BLACK,
    WHITE: WHITE,
    NONE : NONE
};