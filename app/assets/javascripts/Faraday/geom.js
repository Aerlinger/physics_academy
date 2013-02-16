////////////////////////////////////////////////////////////////
// Point
function Point(x, y) {

    if (!x)
        x = 0;
    if (!y)
        y = 0;

    this.x1 = x;
    this.y = y;
}
;

Point.prototype.x1 = 0;
Point.prototype.y = 0;

////////////////////////////////////////////////////////////////
// Rectangle
function Rectangle(x, y, width, height) {
    this.x1 = x;
    this.y = y
    this.width = width;
    this.height = height;
}
;

Rectangle.prototype.contains = function (x, y) {
    if (x > this.x1 && x < this.x1 + this.width &&
        y > this.y && y < this.y + this.height) {
        return true;
    }

    return false;
};

Rectangle.prototype.equals = function (otherRect) {
    if (!otherRect) return false;
    return ( otherRect.x1 === this.x1 && otherRect.y === this.y &&
        otherRect.width === this.width && otherRect.height === this.height );
};

// TODO: Test
Rectangle.prototype.intersects = function (otherRect) {
//    if (this.x >= (otherRect.x+otherRect.width)
//        || (this.x+this.width) <= otherRect.x
//        || this.y <= (otherRect.y + otherRect.height)
//        || (this.y + this.height) >= otherRect.y) {
//        return false;
//    } else {
//        return true;
//    }

    return !( otherRect.x1 > this.x1 + this.width
        || otherRect.x1 + otherRect.width < this.x1
        || otherRect.y > this.y + this.height
        || otherRect.y + otherRect.height < this.y
        );

};

////////////////////////////////////////////////////////////////
// Polygon
// Vertices are taken in x, y pairs:
function Polygon(vertices) {

    this.vertices = new Array();

    if (vertices && vertices.length % 2 == 0) {
        for (var i = 0; i < vertices.length; i += 2)
            this.addVertex(vertices[i], vertices[i + 1]);
    }


    this.addVertex = function (x, y) {
        this.vertices.push(new Point(x, y));
    };

    this.getX = function (n) {
        return this.vertices[n].x1;
    };

    this.getY = function (n) {
        return this.vertices[n].y;
    };

    this.numPoints = function () {
        return this.vertices.length;
    };
}
;



