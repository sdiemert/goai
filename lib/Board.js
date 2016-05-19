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
        this._c = c || 2;
        this._pass = p || false;
    }

    toObject() {
        return {x: this.x, y: this.y, c: this.colour, pass : this.pass};
    }

    /**
     * @returns {NONE|BLACK|WHITE}
     */
    get colour(){
        return this._c; 
    }

    /**
     * @param c {NONE|BLACK|WHITE}
     */
    set colour(c){
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

class Intersection {
    
    /**
     * @param x {number}
     * @param y {number}
     * @param c {NONE|BLACK|WHITE}
     */
    constructor(x, y, c) {
        this._pos = [x, y];
        this._c = c || 0;
        this._l = [];
        this.checked = false;
    }
    
    get pos() {
        return this._pos;
    }
    
    get colour() {
        return this._c;
    }
    
    /**
     * @param c {NONE|BLACK|WHITE}
     */
    set colour(c) {
        this._c = c;
    }
    
    get liberties() {
        return this._l;
    }
       
    /**
     * @param intsec {Board.Intersection}
     */
    addToLiberties(intsec) {
        this._l.push(intsec.pos);
    }
    
    /**
     * 
     */
    equal(other) {
        return (this.pos == other.pos)
    }
}

class Army {
    
    /**
     * @param c {number}
     */
    constructor(c) {
        this._c = c;
        this._t = [];
        this._l = [];
        this._s = 0;
    }
    
    get colour() {
        return this._c;
    }
    
    get tokens() {
        return this._t;
    }
    
    /**
     * Adds a new token and liberties to the army
     * 
     * @param intsec {Board.Intersection}
     */
    addToken(intsec) {
        this._t.push(intsec);
        this._s += 1;
        
        for (var i = 0; i < intsec.liberties.length; i++) {
            var dup = false;
            for (var j = 0; j < this._l.length; j++) {
                if (intsec.liberties[i] == this._l[j])
                    dup = true;
            }
            if (dup == false)
                this._l.push(intsec.liberties[i]);
        }
    }
    
    get liberties() {
        return this._l;
    }
    
    get size() {
        return this._s;
    }
    
    toObject() {
        var obj = {
            colour: this._c,
            tokens: [],
            liberties: this._l,
            size: this._s
        }
        var token = null;
        for (var i = 0; i < this._s; i++) {
            token = this._t[i];
            obj.tokens.push({
                colour: token.colour,
                position: token.pos,
                liberties: token.liberties
            });
        }
        return obj;
    }
}

module.exports = {
    Move : Move,
    Board: Board,
    Intersection: Intersection,
    Army: Army,
    BLACK: BLACK,
    WHITE: WHITE,
    NONE : NONE
};