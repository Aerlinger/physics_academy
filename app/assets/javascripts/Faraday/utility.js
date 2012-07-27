// Utility/helper objects to be used throughout
function Color(r, g, b) {

    this.checkByte = function (val) {
        if (val < 0 || val > 255)
            console.log("Input: " + val + " is outsize the allowable range (0-255)");
    };

    this.checkByte(r);
    this.checkByte(g);
    this.checkByte(b);

    this.color = 0;
    this.color += r * Math.pow(2, 16);//(r << 16);
    this.color += g * Math.pow(2, 8);//(g << 8);
    this.color += b;

    this.color = Math.floor(this.color);

    this.color16 = Color.color2HexString(this.color);

    this.R_MASK = 0xFF0000;
    this.G_MASK = 0x00FF00;
    this.B_MASK = 0x0000FF;

}
;

Color.WHITE = 0xFFFFFF;
Color.BLACK = 0x000000;
Color.GREY = 0xAAAAAA;
Color.LIGHT_GREY = 0x666666;
Color.CYAN = 0x00FFFF;
Color.MAGENTA = 0xFF00FF;
Color.YELLOW = 0xFFFF00;
Color.ORANGE = 0xd87f00;
Color.PURPLE = 0x7500d8;
Color.SKY = 0x6eb1d8;
Color.PINK = 0xee7ff2;
Color.BROWN = 0x521900;
Color.DEEP_YELLOW = 0xffb11b;

Color.RED = 0xFF0000;
Color.GREEN = 0x00FF00;
Color.BLUE = 0x0000FF;

Color.makeColor = function (r, g, b) {
    return new Color(r, g, b);
};

/** Todo: implement */
Color.checkColorString = function (colorHexString) {
    return true;
};

/** Converts an unsigned-integer representation of a string to a hexadecimal representation of the same color
 *
 * */
Color.color2HexString = function (color_uint) {
    if (typeof(color_uint) == 'string') {
        // run color check here:
        return checkColorString(color_uint);
    }

    var strVal = Math.floor(color_uint).toString(16).toUpperCase();

    // make sure the hexadecimal color has 6 hex digits (i.e. return 000f0f instead of f0f).
    var strlen = strVal.length;
    if (strlen < 6) {
        for (var i = 0; i < 6 - strlen; ++i)
            strVal = "0" + strVal;
    }
    return '#' + strVal;
};

Color.prototype.toString = function () {
    var val = Color.color2HexString(this.color);
    return val;
};

Color.prototype.getColor = function () {
    return this.color;
};

Color.prototype.getRed = function () {
    return (this.color >> 16) & this.R_MASK;
};

Color.prototype.getGreen = function () {
    return (this.color >> 8) & this.G_MASK;
};

Color.prototype.getBlue = function () {
    return this.color & this.B_MASK;
};


isInfinite = function (num) {
    return ( num > 1e18 );
};

function sign(x) {
    return (x < 0) ? -1 : (x == 0) ? 0 : 1;
}
;

function getRand(x) {
    Math.floor(Math.random() * (x + 1));
}
;

function zeroArray(Arr) {
    for (var i = 0; i < Arr.length; ++i)
        Arr[i] = 0;

    return Arr;
}
;

function checkST(st) {
    if (st && st.length > 0) {
        if (typeof st == 'string')
            st = st.split(' ');

        return st;
    }
    return null;
}

function setParams(args) {
    var st = arguments[0]; // List of parameters is the first object.
    if (st && st.length > 0) {
        if (typeof(st) == 'string')
            st = st.split(' ');

        for (var i = 1; i < arguments.length; ++i) {
            arguments[i] = eval(st[i - 1]);
        }
    }
}
;

initializeTwoDArray = function (numRows, numCols) {
    var TwoDArray = new Array(numCols);
    //TwoDArray.length
    for (var i = 0; i < numCols; ++i) {
        var thisRow = new Array(numRows);
        TwoDArray[i] = zeroArray(thisRow);
    }

    return TwoDArray;
};

function printWarning(message) {
    var CanvasArea = getCanvasBounds();
    var xPos = CanvasArea.width / 2;
    var yPos = CanvasArea.height - 100;
    paper.text(xPos, yPos, message).attr('fill', Color.color2HexString(Settings.TEXT_WARNING_COLOR));
}
;

function printError(message) {
    var CanvasArea = getCanvasBounds();
    var xPos = CanvasArea.width / 2;
    var yPos = CanvasArea.height - 85;
    //paper.text(xPos, yPos, message).attr('fill', Color.color2HexString(Settings.TEXT_ERROR_COLOR));
}
;

function showFormat(n) {
    return n.toFixed(2);
}
;

function shortFormat(n) {
    return n.toFixed(1);
}
;

function noCommaFormat(n) {
    //n.replace(',', '');
    return n;
}
;

/** Adds commas to a number
 * e.g. 5432886.99 -> 5,432,886.99
 * */
function addCommas(nStr) {
    // Simple method of converting a parameter to a string
    nStr += '';

    // Ignore any numbers after a '.'
    var x = nStr.split('.');

    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';

    var rgx = /(\d+)(\d{3})/;

    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }


    return x1 + x2;
}
;


var Settings = {

    POST_RADIUS:3,
    CURRENT_RADIUS:3,
    LINE_WIDTH:2,

    // Colors:
    SELECT_COLOR:Color.ORANGE,
    POST_COLOR_SELECTED:Color.ORANGE,
    POST_COLOR:Color.BLACK,
    DOTS_COLOR:Color.YELLOW,
    DOTS_OUTLINE:Color.ORANGE,

    TEXT_COLOR:Color.BLACK,
    TEXT_ERROR_COLOR:Color.RED,
    TEXT_WARNING_COLOR:Color.YELLOW,

    SELECTION_MARQUEE_COLOR:Color.ORANGE,

    GRID_COLOR:Color.DEEP_YELLOW,
    BG_COLOR:new Color(245, 245, 245).getColor(),
    FG_COLOR:new Color(50, 50, 50).getColor(),
    ERROR_COLOR:new Color(200, 0, 0).getColor(),
    WARNING_COLOR:Color.ORANGE

};

// Stores position of the div canvas on the main page:



//function extend(sub){
//    var supers = [];
//    var single = function(sub,super){
//        var thinF = function(){};
//        thinF.prototype = super.prototype;
//        sub.prototype = new thinF();
//        sub.prototype.constructor = sub;
//        sub.super = super.prototype;
//        if( super.prototype.constructor == Object.prototype.constructor ){
//            super.prototype.constructor = super;
//        }
//    }
//
//    var multi = function(sub,super){
//        var proto = super.prototype;
//        for( var f in proto ){
//            if( f != "constructor" && typeof proto[f] == "function" ){
//                    if( sub.prototype[f] == undefined ){
//                        sub.prototype[f] = function(){
//                            return proto[f].apply(this,arguments);
//                        }
//                    }
//            }
//        }
//    }
//
//    if( arguments.length < 2 )
//        return;
//
//    single(sub,arguments[1]);
//    supers.push(arguments[1]);
//
//    for( var i=2; i<arguments.length;i++){
//        multi(sub,arguments[i]);
//        supers.push(arguments[i]);
//    }
//
//    sub.prototype.callSuper = function(fnc){
//        var len = supers.length;
//        for( var i=0;i<len;i++){
//            var super = supers[i];
//            if( (fnc in  super.prototype) && (typeof super.prototype[fnc] == "function") ){
//                return super.prototype[fnc].apply(this,[].splice.call(arguments, 1));
//            }
//        }
//        return null;
//    }
//};
//
//
//function getRand(n) {
//    return Math.floor(Math.random()*n);
//};

// Example of using extend function
//function P1(){}
//P1.prototype.p1_talk = function(){
//    return "P1 talking ";
//}
//
//function P2(){}
//P2.prototype.p2_talk = function(){
//    return "P2 talking ";
//}
//
//function SP(){}
//SP.prototype.sp_talk = function(a,b){
//    return "sp talking with "+a+" and "+b;
//}
//
//function P3(){}
//extend(P3,SP);
//
//P3.prototype.p3_talk = function(){
//    return "p3_talk";
//}
//
//function P4(){}
//extend(P4,P3);
//
//var p4 = new P4();
//
//function Son(){}
//
//extend(Son,P1,P2,P3);
//
//Son.prototype.sp_talk = function(){
//    return "Son override SP talk ";
//}
//
//var s = new Son();
////text = "P1 talking P2 talking Son override SP talk sp talking with a and b"
//var text = s.p1_talk() + s.p2_talk() + s.sp_talk()+ s.callSuper("sp_talk","a","b");


