// jQuery element of the 'live' canvas
var CANVAS;
var paper;

function buildUI() {
    var items = [];

    //$('#toolbar_buttons').append( items.join('') );

    for (var element in CirSim.elementMap) {
        var classname = "";
        var buttonName = CirSim.elementMap[element];
        if (buttonName[0] === '+') {
            classname = 'class="testedworking"';
            buttonName[0] = '';
        } else if (buttonName[0] === '/') {
            classname = 'class="notyettested"';
            buttonName[0] = '';
        } else if (buttonName[0] === '-') {
            classname = 'class="notyetimplemented"';
            buttonName[0] = '';
        }

        buttonName = buttonName.replace('-', '');
        buttonName = buttonName.replace('+', '');
        buttonName = buttonName.replace('#', '');

        var elmHTML = '<li ' + classname + '><a href="#" onclick="CirSim.addElm(\'' + element.toString() + '\');">' + buttonName + '</a></li>';
        items.push(elmHTML);
    }

    $('#toolbar_buttons').append(items.join(''));

};

function getCanvasBounds() {
    return new Rectangle(CANVAS.offset().left, CANVAS.offset().top, CANVAS.width(), CANVAS.height());
};


$(document).ready(function (e) {

    console.log("Started!");

    CANVAS = $('#canvas_container');

    // Create the context for rendering:
    var className = document.getElementById('canvas_container');
    paper = className.getContext("2d");
    paper.lineWidth = Settings.LINE_WIDTH;
    paper.lineCap   = "round";
    paper.lineJoin = "round";

    //paper = new Raphael(CANVAS.get(0), CANVAS.width(), CANVAS.height());


    $("#canvas_container").css({
        'background-color':Color.color2HexString(Settings.BG_COLOR), 'border-width':'2px'
    });

    $("#canvas_container").click(function (event) {
        event.preventDefault();
        CirSim.onMouseClicked(event);
    });

    $("#canvas_container").mouseenter(function (event) {
        CirSim.onMouseEntered(event);
    });

    $("#canvas_container").mouseleave(function (event) {
        event.preventDefault();
        CirSim.onMouseReleased(event);
        CirSim.onMouseExited(event);
    });

    $("#canvas_container").mousemove(function (event) {
        event.preventDefault();
        CirSim.onMouseMove(event);
    });

    $("#canvas_container").mousedown(function (event) {
        event.preventDefault();
        CirSim.onMousePressed(event);
    });

    $("#canvas_container").mouseup(function (event) {
        event.preventDefault();
        CirSim.onMouseReleased(event);
    });

    $(document).keydown(function (event) {
        event.preventDefault();
        //alert(event.which);
        CirSim.onKeyPressed(event);
    });

    $(document).keyup(function (event) {
        event.preventDefault();
        CirSim.onKeyReleased(event);
    });

    start();
});


function start() {
    // The default circuit is loaded from the class attribute
    // For instance <canvas ... class="lrc well span8" will render the lrc.txt file
    var defaultCircuitType = CANVAS.attr('class');
    defaultCircuitType = defaultCircuitType.split(" ")[0];
    CirSim.init(defaultCircuitType);

    buildUI();
    console.log("Starting simulation");
    setInterval(function () {
        CirSim.updateCircuit();
    }, 1);
}




