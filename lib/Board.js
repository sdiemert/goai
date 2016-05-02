"use strict";

class Move {

    constructor(x, y, c, p) {
        this.x = x;
        this.y = y;
        this.c = c || 1;
        this.pass = p || false;
    }

    toObject() {
        return {x: this.x, y: this.y, color: this.c, pass : this.pass};
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

        this.B    = [];
        this.size = n;

        for (var i = 0; i < this.size; i++) {
            this.B.push([]);
            for (var j = 0; j < this.size; j++) {
                this.B[i].push(A[i][j]);
            }
        }

    }

    toObject() {
        return this.B;
    }

}

module.exports = {
    Move : Move,
    Board: Board,
    BLACK: 1,
    WHITE: 2,
    NONE : 0
};