// jQuery element of the 'live' canvas
var CANVAS;
var paper;


var js_asset_path = "/assets/Faraday/";
//var js_asset_path = "";

function buildCircuitElementToolbar() {
    var items = [];

    for (var element in CirSim.elementMap) {
        var classname = 'class="green"';
        var buttonName = CirSim.elementMap[element];
        if (buttonName[0] === '+') {
            classname = 'class="green"';
            buttonName[0] = '';
        } else if (buttonName[0] === '/') {
            classname = 'class="yellow"';
            buttonName[0] = '';
        } else if (buttonName[0] === '-') {
            classname = 'class="red"';
            buttonName[0] = '';
        }

        // Remove prefixes from names
        buttonName = buttonName.replace('-', '');
        buttonName = buttonName.replace('+', '');
        buttonName = buttonName.replace('#', '');

        // Remove prefixes from names
        var elmHTML = '<li ' + classname + '><a href="#" onclick="CirSim.addElm(\'' + element.toString() + '\');">' + buttonName + '</a></li>';
        items.push(elmHTML);
    }

    $('#toolbar_buttons').append(items.join(''));
};


var readSetupList = function (retry) {
    var stack = new Array(6);
    var stackptr = 0;

    // Stack structure to keep track of menu items
    stack[stackptr++] = "root";

    var circuitPresetHTML = "";

    $.get(js_asset_path + 'setuplist.txt', function (b) {

        var len = b.length;     // Number of bytes (characters) in the file
        var p;                  // Address of current character

        // For each line in the setup list
        for (p = 0; p < len;) {
            var l;  // l is the number of characters in this line.
            for (l = 0; l != len - p; l++)
                if (b[l + p] == '\n') {
                    l++; // Increment l until we reach the end
                    break;
                }

            var line = b.substring(p, p + l - 1);

            // If this is a comment line, skip it.
            if (line.charAt(0) == '#') { }

            // Lines starting with a + add a submenu item
            else if (line.charAt(0) == '+') {
                var menuName = line.substring(1);

                circuitPresetHTML += "<br />" + "<strong>" + menuName + "</strong><br />";
                console.log('push ' + menuName);

                stack[stackptr++] = menuName;
                // Sub menus are delimited by a '-'
            } else if (line.charAt(0) == '-') {
                var pop = stack[--stackptr - 1];
                console.log("pop " + pop);
            } else {

                var testedWorkingCircuit = false;

                // If the first line of the file begins with a $ this is a valid circuit
                if (line.charAt(0)=='$') {
                    testedWorkingCircuit = true;
                }

                // Get the location of the title of this menu item
                var i = line.indexOf(' ');

                if (i > 0) {
                    var title = line.substring(i + 1);
                    var first = false;
                    if (line.charAt(0) == '>')
                        first = true;

                    line = line.replace('$', '');

                    var circuitName = line.substring(first ? 1 : 0, i).replace('$', '');
                    var prefix = '';

                    for (var i = 0; i < stackptr; ++i)
                        prefix += ' ';

                    // Append this circuit file to the HTML
                    testedWorkingCircuit ? className = 'green circuit_preset_link' : className = 'red circuit_preset_link'

                    if(testedWorkingCircuit)
                        circuitPresetHTML += prefix + '<a class=\"' + className + '\" id=\"' + circuitName + '\" href="#">' + title + "</a> <br />";

                    console.log(prefix + "Adding: " + title + " :: circuit: " + circuitName);

                    if (first && CirSim.startCircuit == null) {
                        CirSim.startCircuit = circuitName;
                        CirSim.startLabel = title;
                    }
                }
            }
            p += l;
        }

        $("#circuit_presets").html(circuitPresetHTML);

        // Bind load file event to default circuit links
        $('.circuit_preset_link').click(function () {
            console.log("Loading Circuit: " + $(this).attr('id'));
            CirSim.readCircuitFromFile($(this).attr('id'), false);
        });

    });

};

function getCanvasBounds() {
    return new Rectangle(CANVAS.offset().left, CANVAS.offset().top, CANVAS.width(), CANVAS.height());
};

/** Start is called by $(document).ready */
function start() {

    // The default circuit is loaded from the class attribute
    // For instance <canvas ... class="lrc well span8" will render the lrc.txt file
    var defaultCircuitType = CANVAS.attr('class');
    defaultCircuitType = defaultCircuitType.split(" ")[0];
    CirSim.init(defaultCircuitType);

    buildCircuitElementToolbar();
    console.log("Starting simulation");
    setInterval(function () {
        CirSim.updateCircuit();
    }, 1);
}


/** Callback for when the DOM is ready. This is the entry point for the */
$(document).ready(function (e) {

    console.log("Started!");

    CANVAS = $('#canvas_container');

    // Create the context for rendering:
    var className = document.getElementById('canvas_container');

    // If we can't load the canvas do nothing:
    if(!className) {
        console.log("Couldn't load: " + className);
        return;
    }

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





