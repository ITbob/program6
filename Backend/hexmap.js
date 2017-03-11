    
/* See http://www.redblobgames.com/grids/hexagons/ */

/* Using flat-topped hexagons, "odd-q" vertical layout
 *    __    __
 *   /  \__/  \__/  \
 *   \__/  \__/  \__/
 *   /  \__/  \__/  \
 *   \__/  \__/  \__/
 *   /  \__/  \__/  \
 *   \__/  \__/  \__/
 */

"use strict";


var HexCube = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};


var HexAxial = function (q, r) {
    this.q = q;
    this.r = r;
};


var HexOffset = function (m, n) {
    // not following the website convention, but the mathematical matrix notation
    // ie. m = row, n = column
    this.m = m;  // row
    this.n = n;  // column
};


HexCube.prototype.toString = function () {
    return "HexCube(" + [this.x, this.y, this.z].toString() + ")";
};

HexCube.prototype.toCube = function () {
    return new HexCube(this.x, this.y, this.z);
};

HexCube.prototype.toAxial = function () {
    return new HexAxial(this.x, this.y);
};

HexCube.prototype.toOffset = function () {
    var m = this.z + (this.x - (Math.abs(this.x) % 2)) / 2;
    var n = this.x;
    return new HexOffset(m, n);
};

HexCube.prototype.isLegal = function () {  // better name?
    // the sum of the coordinates must be zero
    return this.x + this.y + this.z === 0 ? true : false;
};

HexCube.prototype.getNeighbour = function (direction) {
    var deltas = [[+1, -1,  0], [+1,  0, -1], [0, +1, -1],
                  [-1, +1,  0], [-1,  0, +1], [0, -1, +1]];
    return new HexCube(this.x + (deltas[direction][0]),
                       this.y + (deltas[direction][1]),
                       this.z + (deltas[direction][2]));
};


HexAxial.prototype.toString = function () {
    return "HexAxial(" + [this.q, this.r].toString() + ")";
};

HexAxial.prototype.toCube = function () {
    return new HexCube(this.q, this.r, -this.q - this.r);
};

HexAxial.prototype.toAxial = function () {
    return new HexAxial(this.q, this.r);
};

HexAxial.prototype.toOffset = function () {
    return this.toCube().toOffset();
};

HexAxial.prototype.getNeighbour = function (direction) {
    var deltas = [[+1,  0], [+1, -1], [ 0, -1],
                  [-1,  0], [-1, +1], [ 0, +1]];
    return new HexAxial(this.q + (deltas[direction][0]),
                        this.r + (deltas[direction][1]));
};

HexOffset.prototype.toString = function () {
    return "HexOffset(" + [this.m, this.n].toString() + ")";
};

HexOffset.prototype.toCube = function () {
    var x = this.n;
    var z = this.m - (this.n - (Math.abs(this.n) % 2)) / 2;
    var y = -x - z;
    return new HexCube(x, y, z);
};

HexOffset.prototype.toAxial = function () {
    return this.toCube().toAxial();
};

HexOffset.prototype.toOffset = function () {
    return new HexOffset(this.m, this.n);
};

HexOffset.prototype.getNeighbour = function (direction) {
    // Offset coordinates has different sub type, convert to cube for agnostic method
    return new this.toCube().getNeighbour(direction).toOffset();
};


var hexEquals = function (a, b) {
    a = a.toCube();
    b = b.toCube();
    return a.x === b.x && a.y === b.y && a.z === b.z;
};


var hexDistance = function (a, b) {
    var max = Math.max;
    var abs = Math.abs;
    
    a = a.toCube();
    b = b.toCube();
    
    return max(abs(a.x - b.x), abs(a.y - b.y), abs(a.z - b.z));
};


