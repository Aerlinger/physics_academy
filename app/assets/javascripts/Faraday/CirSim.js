/////////////////////////////////////////////////////////////////////////////////
// CirSim: Core circuit computation and node management
/////////////////////////////////////////////////////////////////////////////////

CirSim.MODE_ADD_ELM = 0;
CirSim.MODE_DRAG_ALL = 1;
CirSim.MODE_DRAG_ROW = 2;
CirSim.MODE_DRAG_COLUMN = 3;
CirSim.MODE_DRAG_SELECTED = 4;
CirSim.MODE_DRAG_POST = 5;
CirSim.MODE_SELECT = 6;
CirSim.infoWidth = 120;

CirSim.addingClass = "null"; // String representing object to be added.

CirSim.mouseMode = CirSim.MODE_SELECT;
CirSim.tempMouseMode = CirSim.MODE_SELECT;
CirSim.mouseModeStr = "Select";

CirSim.dragX = 0;
CirSim.dragY = 0;
CirSim.initDragX = 0;
CirSim.initDragY = 0;

CirSim.selectedArea = new Rectangle(0, 0, 0, 0);

CirSim.gridSize = 10;
CirSim.gridMask = 10;
CirSim.gridRound = 10;

CirSim.dragging = false;
CirSim.analyzeFlag = true;
CirSim.dumpMatrix = false;

CirSim.t = 0;
CirSim.pause = 10;

CirSim.menuScope = -1;
CirSim.hintType = -1;
CirSim.hintItem1 = -1;
CirSim.hintItem2 = -1;
CirSim.stopMessage = 0;

CirSim.HINT_LC = 1;
CirSim.HINT_RC = 2;
CirSim.HINT_3DB_C = 3;
CirSim.HINT_TWINT = 4;
CirSim.HINT_3DB_L = 5;


CirSim.setupList = [];

// Simulation state variables ///////////////////////

CirSim.stoppedCheck = false;
CirSim.showPowerCheck = false;
CirSim.showValuesCheckItem = false;
CirSim.powerCheckItem = false;
CirSim.voltsCheckItem = true;
CirSim.dotsCheckItem = true;
CirSim.printableCheckItem = false;
CirSim.conventionCheckItem = true;
CirSim.speedBar = 117;
CirSim.currentBar = 50;
CirSim.smallGridCheckItem = false;
CirSim.powerBar = 'replaceme';

CirSim.timeStep = 1e-6;
CirSim.converged = true;
CirSim.subIterations = 5000;
////////////////////////////////////////////////////

CirSim.dragElm = null;
CirSim.menuElm = null;
CirSim.mouseElm = null;
CirSim.stopElm = null;

CirSim.mousePost = -1;
CirSim.plotXElm = null;
CirSim.plotYElm = null;
CirSim.draggingPost = 0;
CirSim.heldSwitchElm;

// Todo: Implement Scopes
CirSim.Scopes = [];
CirSim.scopeCount = 0;
CirSim.scopeSelected = -1;
CirSim.scopeColCount = [];

CirSim.muString = "u";
CirSim.ohmString = "ohm";

CirSim.root
//public var useFrame:Boolean;

CirSim.elmList = [];
CirSim.nodeList = [];
CirSim.voltageSources = [];

// Circuit data Arrays: //////////////////////////////////////////////////////////
CirSim.circuitMatrix = [];
// Two dimensional floating point array;
CirSim.circuitRightSide = [];
// Column vector (floating point)
CirSim.origRightSide = [];
// Column vector floating point
CirSim.origMatrix = [];
// Two dimensional floating point array;

CirSim.circuitRowInfo = []; // Array of RowInfo Elements

CirSim.circuitPermute = []; // Array of integers

CirSim.scaleFactors = new Array();
//////////////////////////////////////////////////////////////////////////////////

CirSim.circuitNonLinear = false;

CirSim.voltageSourceCount = 0;

CirSim.circuitMatrixSize;
CirSim.circuitMatrixFullSize;
CirSim.circuitNeedsMap;

CirSim.editDialog = null;
CirSim.impDialog;

CirSim.clipboard = "";

//CirSim.circuitArea;
CirSim.circuitBottom;

CirSim.undoStack = [];
CirSim.redoStack = [];

CirSim.startCircuit = null;
CirSim.startLabel = null;
CirSim.startCircuitText = null;
CirSim.baseURL = "";

// Simulation tracking variables:
CirSim.lastTime = 0;
CirSim.lastFrameTime = 0;
CirSim.lastIterTime = 0;
CirSim.secTime = 0;
CirSim.frames = 0;
CirSim.steps = 0;
CirSim.framerate = 0;
CirSim.steprate = 0;

CirSim.dumpTypes = [];
//= new Dictionary();	// Array of classes
CirSim.menuMapping = [];
// new Dictionary();

CirSim.useFrame = false;

var date = new Date();

// Map of each circuit element to its corresponding object
CirSim.elementMap = [];

CirSim.NO_MOUSE_BTN = 0;
CirSim.LEFT_MOUSE_BTN = 1;
CirSim.MIDDLE_MOUSE_BTN = 2;
CirSim.RIGHT_MOUSE_BTN = 3;

CirSim.NO_KEY_DOWN = 0;
CirSim.KEY_DELETE = 46;
CirSim.KEY_SHIFT = 16;
CirSim.KEY_CTRL = 17;
CirSim.KEY_ALT = 18;

CirSim.KEY_ESC = 27;

CirSim.keyDown = CirSim.NO_KEY_DOWN;
CirSim.mouseButtonDown = CirSim.NO_MOUSE_BTN;

///////////////////////////////////////////////////////////////////////
// CirSim Constructor: ////////////////////////////////////////////////
function CirSim() {
    console.log("Started simulation");
};

CirSim.register = function (elmClassName) {

    // TODO test
    try {
        var elm = CirSim.constructElement(elmClassName, 0, 0, 0, 0, 0, null);
        var dumpType = elm.getDumpType();

        var dclass = elmClassName;//elmClassName.getDumpClass();
        if (CirSim.dumpTypes[dumpType] == dclass)
            return;
        if (CirSim.dumpTypes[dumpType] != null) {
            console.log("Dump type conflict: " + dumpType + " " + CirSim.dumpTypes[dumpType]);
            return;
        }

        CirSim.dumpTypes[dumpType] = elmClassName;
    } catch (e) {
        console.log("Element: " + elmClassName + " Not yet implemented");
    }
};

CirSim.constructElement = function (elementObjName, xa, ya, xb, yb, f, st) {
    // todo: Use elementObj.call(...) instead of eval
    try {
        var newElement = eval("new " + elementObjName + "(" + xa + "," + ya + "," + xb + "," + yb + "," + f + "," + 'st' + ");");
    } catch (e) {
        console.log("Couldn't construct element: " + elementObjName + " " + e);
    }

    return newElement;
};

CirSim.init = function (defaultCircuit) {

    // TODO FINISH IMPLEMENTATION
    CirSim.initScaleFactors();

    CircuitElement.initClass();

    CirSim.needAnalyze();

    /////////////////////////////////////////
    // Set up UI Here:
    /////////////////////////////////////////
    CirSim.dumpTypes = new Array(300);

    CirSim.dumpTypes['o'] = Scope.prototype;
    CirSim.dumpTypes['h'] = Scope.prototype;
    CirSim.dumpTypes['$'] = Scope.prototype;
    CirSim.dumpTypes['%'] = Scope.prototype;
    CirSim.dumpTypes['?'] = Scope.prototype;
    CirSim.dumpTypes['B'] = Scope.prototype;

    //////////////////////////////////////////////////////////////////////
    // Create a hashmap of all our elements:
    //////////////////////////////////////////////////////////////////////
    // Implemented, tested, working (prefixed with +)
    CirSim.elementMap['WireElm'] = '+Wire';
    CirSim.elementMap['ResistorElm'] = '+Resistor';
    CirSim.elementMap['CapacitorElm'] = '+Capacitor';
    CirSim.elementMap['InductorElm'] = '+Inductor';
    CirSim.elementMap['SwitchElm'] = '+Switch';
    CirSim.elementMap['GroundElm'] = '+Ground';
    CirSim.elementMap['VoltageElm'] = '+Voltage Source';

    // Implemented, not tested (prefixed with #)
    CirSim.elementMap['DiodeElm'] = '#Diode';

    // Not implemented (prefixed with -)
    CirSim.elementMap['ACRailElm'] = '-AC Rail';
    CirSim.elementMap['ACVoltageElm'] = '-AC Voltage';
    CirSim.elementMap['ADCElm'] = '-A/D Converter';
    CirSim.elementMap['AnalogSwitchElm'] = '-Analog Switch';
    CirSim.elementMap['AnalogSwitch2Elm'] = '-Analog Switch2';
    CirSim.elementMap['AndGateElm'] = '-AndGateElm';
    CirSim.elementMap['AntennaElm'] = '-Antenna';
    CirSim.elementMap['CC2Elm'] = '-CC2';
    CirSim.elementMap['CC2NegElm'] = '-CC2 Negative';
    CirSim.elementMap['ClockElm'] = '-Clock Generator';
    CirSim.elementMap['CounterElm'] = '-Counter';
    CirSim.elementMap['CurrentElm'] = '-Current Source';

    CirSim.elementMap['DACElm'] = '-D/A Converter';
    CirSim.elementMap['DCVoltageElm'] = '-DC Voltage Src';
    CirSim.elementMap['DecadeElm'] = '-Decade Counter';
    CirSim.elementMap['DFlipFlopElm'] = '-D Flip Flop';
    CirSim.elementMap['DiacElm'] = '-Diac';
    CirSim.elementMap['InverterElm'] = '-InverterElm';
    CirSim.elementMap['JfetElm'] = '-JFET';
    CirSim.elementMap['JKFlipFlopElm'] = '-JK Flip Flop';
    CirSim.elementMap['LampElm'] = '-LampElm';
    CirSim.elementMap['LatchElm'] = '-Latch';
    CirSim.elementMap['LEDElm'] = '-LED';
    CirSim.elementMap['LogicInputElm'] = '-Logic Input';

    CirSim.elementMap['LogicOutputElm'] = '-Logic Output';
    CirSim.elementMap['MemristorElm'] = '-Memristor';
    CirSim.elementMap['MosftetElm'] = '-MOSFET';
    CirSim.elementMap['NandGageElm'] = '-NAND Gate';
    CirSim.elementMap['NJfetElm'] = '-N-type JFET';
    CirSim.elementMap['PJfetElm'] = '-P-type JFET';
    CirSim.elementMap['NMosfetElm'] = '-N-type FET';
    CirSim.elementMap['PMosfetElm'] = '-P-type FET';
    CirSim.elementMap['PotElm'] = '-Potentiometer';
    CirSim.elementMap['ProbeElm'] = '-Probe';
    CirSim.elementMap['PTransistorElm'] = '-P Transistor';
    CirSim.elementMap['NTransistorElm'] = '-N Transistor';
    CirSim.elementMap['PushSwitchElm'] = '-PushSwitch';
    CirSim.elementMap['RailElm'] = '-Voltage Rail';
    CirSim.elementMap['RelayElm'] = '-Relay';
    CirSim.elementMap['SCRElm'] = '-SCR Element';
    CirSim.elementMap['SevenSegElm'] = '-7-Segment LCD';
    CirSim.elementMap['SparkGapElm'] = '-Spark Gap';
    CirSim.elementMap['SquareRailElm'] = '-SquareRail';
    CirSim.elementMap['SweepElm'] = '-Freq. Sweep';
    CirSim.elementMap['Switch2Elm'] = '-Switch 2';
    CirSim.elementMap['TappedTransformerElm'] = '-Tapped Transformer';
    CirSim.elementMap['TextElm'] = '-Text';
    CirSim.elementMap['ThermistorElm'] = '-Thermistor';
    CirSim.elementMap['TimerElm'] = '-Timer';
    CirSim.elementMap['TransformerElm'] = '-Transformer';
    CirSim.elementMap['TransistorElm'] = '-Transistor';
    CirSim.elementMap['TransmissionElm'] = '-Xmission Line';
    CirSim.elementMap['TriacElm'] = '-Triac';
    CirSim.elementMap['TriodeElm'] = '-Triode';
    CirSim.elementMap['TunnelDiodeElm'] = '-TunnelDiode';
    CirSim.elementMap['VarRailElm'] = '-Variable Rail';
    CirSim.elementMap['VCOElm'] = '-Volt. Cont. Osc.';
    CirSim.elementMap['XORGateElm'] = '-XOR Gate';
    CirSim.elementMap['ZenerElm'] = '-Zener Diode';


    CirSim.setGrid();
    CirSim.registerAll();
    CirSim.elmList = new Array();

    CirSim.setupList = new Array();
    CirSim.undoStack = new Array();
    CirSim.redoStack = new Array();

    CirSim.scopes = new Array(20); // Array of scope objects
    CirSim.scopeColCount = new Array(20); // Array of integers
    //CirSim.scopeCount       = 0;

    CirSim.initCircuit(defaultCircuit);

};

CirSim.registerAll = function () {

    // TODO test
    //for( var element in CirSim.elementMap)
    //    CirSim.register(element);

    CirSim.register("ResistorElm");
    CirSim.register("CapacitorElm");
    CirSim.register("SwitchElm");
    CirSim.register("Switch2Elm");
    CirSim.register("GroundElm");
    CirSim.register("WireElm");
    CirSim.register("VoltageElm");
    CirSim.register("RailElm");
    CirSim.register("SweepElm");
    CirSim.register("InductorElm");
    CirSim.register("DiodeElm");
    CirSim.register("MosfetElm");
    CirSim.register("TransistorElm");
    CirSim.register("OpAmpElm");
    CirSim.register("SparkGapElm");
    CirSim.register("OutputElm");

};

CirSim.initCircuit = function (defaultCircuit) {

    // Clear and reset circuit elements
    CirSim.clearAll();
    CirSim.undoStack = new Array();

    CirSim.getSetupList(false);

    //CirSim.readCircuitFromFile('circuits/follower.txt');
    //CirSim.readDefaultCircuit('circuits/npn.txt');
    //CirSim.readDefaultCircuit('circuits/leadingedge.txt');
    //CirSim.readDefaultCircuit('circuits/amp-invert.txt');
    //CirSim.readDefaultCircuit('circuits/amp-integ.txt');
    //CirSim.readDefaultCircuit('circuits/fullrectf.txt');
    //CirSim.readCircuitFromFile('circuits/spark-sawtooth.txt');
    CirSim.readCircuitFromFile('assets/Faraday/circuits/' + defaultCircuit + '.txt', false);

};

////////////////////////////////////////////////////////
// EVENT HANDLERS GO HERE:
////////////////////////////////////////////////////////

/** TODO: Not yet fully tested */
CirSim.onKeyPressed = function (evt) {

    // Get the number of the pressed key
    CirSim.keyDown = evt.which;

    if (CirSim.keyDown == CirSim.KEY_SHIFT)
        CirSim.warning("Shift key Pressed!" + evt.which);

    if (CirSim.keyDown == CirSim.KEY_CTRL)
        CirSim.warning("Ctrl key Pressed!" + evt.which);

    if (CirSim.keyDown == CirSim.KEY_ALT)
        CirSim.warning("Alt key Pressed!" + evt.which);

    CirSim.warning('Key: ' + CirSim.keyDown);

    console.log("Key Pressed " + CirSim.keyDown);

    // Key 'd'
    if (CirSim.keyDown == 68) {
        console.log('');
        console.log(CirSim.dumpCircuit());
        console.log('');
    }

    //TODO: IMPLEMENT
    if (CirSim.keyDown > ' ' && CirSim.keyDown < 127) {
        var keyCode = CirSim.keyDown;
        var keyChar = String.fromCharCode(keyCode + 32);
        var c = CirSim.dumpTypes[keyChar];

        if (c == null || c == 'Scope')
            return;

        var elm = null;
        elm = CirSim.constructElement(c, 0, 0);
        if (elm == null || !(elm.needsShortcut() && elm.getDumpClass() == c))
            return;

        CirSim.mouseMode = CirSim.MODE_ADD_ELM;
        CirSim.mouseModeStr = c.getName();
        CirSim.addingClass = c;
    }

    if (keyPressed(' ')) {
        CirSim.mouseMode = CirSim.MODE_SELECT;
        CirSim.mouseModeStr = "Select";
    }
    CirSim.tempMouseMode = CirSim.mouseMode;
};

function keyPressed(char) {
    if (char.length > 1) {
        console.log('keypressed is longer than one character');
        return false;
    }

    return ( CirSim.keyDown === char.charCodeAt(0) );
}

/** Key released not used */
CirSim.onKeyReleased = function (evt) {
    CirSim.keyDown = CirSim.NO_KEY_DOWN;
};

CirSim.onMouseDragged = function (evt) {

    var CanvasBounds = getCanvasBounds();

    // X and Y mouse position
    var x = evt.pageX - CanvasBounds.x;
    var y = evt.pageY - CanvasBounds.y;

    if (!getCanvasBounds().contains(x, y))
        return;

    if (CirSim.dragElm != null)
        CirSim.dragElm.drag(x, y);
    var success = true;

    switch (CirSim.tempMouseMode) {
        case CirSim.MODE_DRAG_ALL:
            CirSim.dragAll(CirSim.snapGrid(x), CirSim.snapGrid(y));
            break;
        case CirSim.MODE_DRAG_ROW:
            CirSim.dragRow(CirSim.snapGrid(x), CirSim.snapGrid(y));
            break;
        case CirSim.MODE_DRAG_COLUMN:
            CirSim.dragColumn(CirSim.snapGrid(x), CirSim.snapGrid(y));
            break;
        case CirSim.MODE_DRAG_POST:
            if (CirSim.mouseElm != null)
                CirSim.dragPost(CirSim.snapGrid(x), CirSim.snapGrid(y));
            break;
        case CirSim.MODE_SELECT:
            if (CirSim.mouseElm == null)
                CirSim.selectArea(x, y);
            else {
                CirSim.tempMouseMode = CirSim.MODE_DRAG_SELECTED;
                success = CirSim.dragSelected(x, y);
            }
            break;
        case CirSim.MODE_DRAG_SELECTED:
            success = CirSim.dragSelected(x, y);
            break;
    }

    CirSim.dragging = true;

    if (success) {
        if (CirSim.tempMouseMode == CirSim.MODE_DRAG_SELECTED && CirSim.mouseElm instanceof TextElm) {
            CirSim.dragX = x;
            CirSim.dragY = y;
        } else {
            CirSim.dragX = CirSim.snapGrid(x);
            CirSim.dragY = CirSim.snapGrid(y);
        }
    }
    //root.repaint();
};

CirSim.dragAll = function (x, y) {
    var dx = x - CirSim.dragX;
    var dy = y - CirSim.dragY;
    if (dx == 0 && dy == 0)
        return;
    var i;
    for (i = 0; i != CirSim.elmList.length; i++) {
        var ce = CirSim.getElm(i);
        ce.move(dx, dy);
    }
    CirSim.removeZeroLengthElements();
};

CirSim.dragRow = function (x, y) {
    var dy = y - CirSim.dragY;
    if (dy == 0)
        return;
    var i;
    for (i = 0; i != CirSim.elmList.length; i++) {
        var ce = CirSim.getElm(i);
        if (ce.y == CirSim.dragY)
            ce.movePoint(0, 0, dy);
        if (ce.y2 == CirSim.dragY)
            ce.movePoint(1, 0, dy);
    }
    CirSim.removeZeroLengthElements();
};


CirSim.onMouseMove = function (evt) {
    //    TODO: TEST
    var CanvasBounds = getCanvasBounds();

    // X and Y mouse position
    var x = evt.pageX - CanvasBounds.x;
    var y = evt.pageY - CanvasBounds.y;

    // CirSim.error("onMouseMove: " + x + ", " + y + " " + CirSim.mouseButtonDown);

    // If the mouse is down
    if (CirSim.mouseButtonDown != 0) {
        CirSim.onMouseDragged(evt);
        return;
    }

    CirSim.dragX = CirSim.snapGrid(x);
    CirSim.dragY = CirSim.snapGrid(y);

    CirSim.draggingPost = -1;

    var i;
    var origMouse = CirSim.mouseElm;

    CirSim.mouseElm = null;
    CirSim.mousePost = -1;

    CirSim.plotXElm = CirSim.plotYElm = null;
    var bestDist = 1e7;
    var bestArea = 1e7;

    for (i = 0; i != CirSim.elmList.length; i++) {
        var ce = CirSim.getElm(i);
        if (ce.boundingBox.contains(x, y)) {
            var j;
            var area = ce.boundingBox.width * ce.boundingBox.height;
            var jn = ce.getPostCount();
            if (jn > 2)
                jn = 2;
            for (j = 0; j != jn; j++) {
                var pt = ce.getPost(j);
                var distance = CirSim.distanceSq(x, y, pt.x, pt.y);

                // If multiple elements have overlapping bounding boxes, we prefer selecting elements that have posts
                // close to the mouse pointer and that have a small bounding box area.
                if (distance <= bestDist && area <= bestArea) {
                    bestDist = distance;
                    bestArea = area;
                    CirSim.mouseElm = ce;
                }
            }
            if (ce.getPostCount() == 0)
                CirSim.mouseElm = ce;
        }
    }

    CirSim.scopeSelected = -1;
    if (CirSim.mouseElm == null) {

        for (i = 0; i != CirSim.scopeCount; i++) {
            var s = CirSim.scopes[i];
            if (s.rect.contains(x, y)) {
                s.select();
                CirSim.scopeSelected = i;
            }
        }
        // the mouse pointer was not in any of the bounding boxes, but we might still be close to a post
        for (i = 0; i != CirSim.elmList.length; i++) {
            var ce = CirSim.getElm(i);
            var j;
            var jn = ce.getPostCount();
            for (j = 0; j != jn; j++) {
                var pt = ce.getPost(j);

                var distance = CirSim.distanceSq(x, y, pt.x, pt.y);
                if (CirSim.distanceSq(pt.x, pt.y, x, y) < 26) {
                    CirSim.mouseElm = ce;
                    CirSim.mousePost = j;
                    break;
                }
            }
        }
    } else {
        CirSim.mousePost = -1;
        // look for post close to the mouse pointer
        for (i = 0; i != CirSim.mouseElm.getPostCount(); i++) {
            var pt = CirSim.mouseElm.getPost(i);
            if (CirSim.distanceSq(pt.x, pt.y, x, y) < 26)
                CirSim.mousePost = i;
        }
    }
    //if (CircuitSimulator.mouseElm != origMouse)
    //	this.repaint();
};

CirSim.onMouseClicked = function (evt) {
    console.log("CLICK: " + evt.pageX + "  " + evt.pageY);

    if (evt.button == CirSim.LEFT_MOUSE_BTN) {
        if (CirSim.mouseMode == CirSim.MODE_SELECT || CirSim.mouseMode == CirSim.MODE_DRAG_SELECTED)
            CirSim.clearSelection();
    }
};

CirSim.onMouseEntered = function (evt) {
    // TODO: IMPLEMENT
};

CirSim.onMouseExited = function (evt) {
    // TODO: IMPLEMENT
    CirSim.scopeSelected = -1;
    CirSim.mouseElm = CirSim.plotXElm = CirSim.plotYElm = null;

};

CirSim.onMousePressed = function (evt) {
    //TODO: IMPLEMENT right mouse
//    var ex = evt.getModifiersEx();
//
//    if ((ex & (MouseEvent.META_DOWN_MASK |
//        MouseEvent.SHIFT_DOWN_MASK)) == 0 && e.isPopupTrigger()) {
//        doPopupMenu(e);
//        return;
//    }

    CirSim.mouseButtonDown = evt.which;

    var CanvasBounds = getCanvasBounds();

    // X and Y mouse position
    var x = evt.pageX - CanvasBounds.x;
    var y = evt.pageY - CanvasBounds.y;

    if (CirSim.mouseButtonDown == CirSim.LEFT_MOUSE_BTN) {
        //left mouse
        CirSim.tempMouseMode = CirSim.mouseMode;
        if ((CirSim.keyDown == CirSim.KEY_ALT))
            CirSim.tempMouseMode = CirSim.MODE_DRAG_ALL;
        else if ((CirSim.keyDown == CirSim.KEY_ALT) && (CirSim.keyDown == CirSim.KEY_SHIFT))
            CirSim.tempMouseMode = CirSim.MODE_DRAG_ROW;
        else if (CirSim.keyDown == CirSim.KEY_SHIFT)
            CirSim.tempMouseMode = CirSim.MODE_SELECT;
        else if (CirSim.keyDown == CirSim.KEY_ALT)
            CirSim.tempMouseMode = CirSim.MODE_DRAG_ALL;
        else if (CirSim.keyDown == CirSim.KEY_CTRL)
            CirSim.tempMouseMode = CirSim.MODE_DRAG_POST;
    }
    else if (CirSim.mouseButtonDown == CirSim.RIGHT_MOUSE_BTN) {
        // right mouse
        if (CirSim.keyDown == CirSim.KEY_SHIFT)
            CirSim.tempMouseMode = CirSim.MODE_DRAG_ROW;
        else if (CirSim.keyDown == CirSim.KEY_CTRL)
            CirSim.tempMouseMode = CirSim.MODE_DRAG_COLUMN;
        else
            return;
    }

    if (CirSim.tempMouseMode != CirSim.MODE_SELECT && CirSim.tempMouseMode != CirSim.MODE_DRAG_SELECTED)
        CirSim.clearSelection();

    if (CirSim.doSwitch(x, y))
        return;

    //pushUndo();

    CirSim.initDragX = x;
    CirSim.initDragY = y;
    CirSim.dragging = true;

    if (CirSim.tempMouseMode != CirSim.MODE_ADD_ELM || !CirSim.addingClass)
        return;

    var x0 = CirSim.snapGrid(x);
    var y0 = CirSim.snapGrid(y);
    if (!CanvasBounds.contains(x0, y0))
        return;

    CirSim.dragElm = CirSim.constructElement(CirSim.addingClass, x0, y0);
};

CirSim.onMouseReleased = function (evt) {
    //TODO: test
//    int ex = e.getModifiersEx();

//    if ((ex & (MouseEvent.SHIFT_DOWN_MASK | MouseEvent.CTRL_DOWN_MASK |
//        MouseEvent.META_DOWN_MASK)) == 0 && e.isPopupTrigger()) {
//        doPopupMenu(e);
//        return;
//    }

    CirSim.mouseButtonDown = CirSim.NO_MOUSE_BTN;

    CirSim.tempMouseMode = CirSim.mouseMode;
    CirSim.selectedArea = null;
    CirSim.dragging = false;
    var circuitChanged = false;

    if (CirSim.heldSwitchElm) {
        CirSim.heldSwitchElm.mouseUp();
        CirSim.heldSwitchElm = null;
        circuitChanged = true;
    }

    if (CirSim.dragElm != null) {
        // if the element is zero size then don't create it
        if (CirSim.dragElm.x == CirSim.dragElm.x2 && CirSim.dragElm.y == CirSim.dragElm.y2)
            CirSim.dragElm.destroy();
        else {
            CirSim.elmList.push(CirSim.dragElm);
            circuitChanged = true;
        }
        CirSim.dragElm = null;
    }

    for (var i = 0; i < CirSim.elmList.length; ++i) {
        var ce = CirSim.elmList[i];

        if (ce.isSelected()) {
            CirSim.doEdit(ce);
        }
    }

    if (circuitChanged)
        CirSim.needAnalyze();
    if (CirSim.dragElm != null)
        CirSim.dragElm.destroy();

    CirSim.dragElm = null;
    //root.repaint();
};

CirSim.addElm = function (elmObjectName) {
    var insertElm = CirSim.constructElement(elmObjectName, 340, 160);

    CirSim.mouseMode = CirSim.MODE_ADD_ELM;
    CirSim.mouseModeStr = insertElm.toString();
    CirSim.addingClass = elmObjectName;

    CirSim.tempMouseMode = CirSim.mouseMode;
};

CirSim.deleteSelected = function () {

    CirSim.pushUndo();
    //CirSim.setMenuSelection();
    CirSim.clipboard = "";
    for (var i = CirSim.elmList.length - 1; i >= 0; i--) {
        var ce = CirSim.getElm(i);
        if (ce.isSelected()) {

            CirSim.clipboard += ce.dump() + "\n";

            // Do cleanup
            ce.destroy();
            CirSim.elmList.splice(i, 1);
        }
    }
    CirSim.enablePaste();
    CirSim.needAnalyze();
};

CirSim.resetSelection = function () {
    CirSim.mouseMode = CirSim.MODE_SELECT;
    CirSim.mouseModeStr = "Select";

    CirSim.tempMouseMode = CirSim.mouseMode;
};

CirSim.dragColumn = function (x, y) {
    //TODO: test
    var dx = x - CirSim.dragX;
    if (dx == 0)
        return;
    var i;
    for (i = 0; i != CirSim.elmList.length; i++) {
        var ce = CirSim.getElm(i);
        if (ce.x == CirSim.dragX)
            ce.movePoint(0, dx, 0);
        if (ce.x2 == CirSim.dragX)
            ce.movePoint(1, dx, 0);
    }
    CirSim.removeZeroLengthElements();
};

CirSim.dragSelected = function (x, y) {
    //TODO: test
    var me = false;
    if (CirSim.mouseElm != null && !CirSim.mouseElm.isSelected())
        CirSim.mouseElm.setSelected(me = true);

    // snap grid, unless we're only dragging text elements
    var i;
    for (i = 0; i != CirSim.elmList.length; i++) {
        var ce = CirSim.getElm(i);
        if (ce.isSelected() && !(ce instanceof TextElm))
            break;
    }
    if (i != CirSim.elmList.length) {
        x = CirSim.snapGrid(x);
        y = CirSim.snapGrid(y);
    }

    var dx = x - CirSim.dragX;
    var dy = y - CirSim.dragY;
    if (dx == 0 && dy == 0) {
        // don't leave mouseElm selected if we selected it above
        if (me)
            CirSim.mouseElm.setSelected(false);
        return false;
    }
    var allowed = true;

    // check if moves are allowed
    for (i = 0; allowed && i != CirSim.elmList.length; i++) {
        var ce = CirSim.getElm(i);
        if (ce.isSelected() && !ce.allowMove(dx, dy))
            allowed = false;
    }

    if (allowed) {
        for (i = 0; i != CirSim.elmList.length; i++) {
            var ce = CirSim.getElm(i);
            if (ce.isSelected())
                ce.move(dx, dy);
        }
        CirSim.needAnalyze();
    }

    // don't leave mouseElm selected if we selected it above
    if (me)
        CirSim.mouseElm.setSelected(false);

    return allowed;
};

CirSim.dragPost = function (x, y) {
    // TODO: test
    if (CirSim.draggingPost == -1) {
        CirSim.draggingPost =
            (CirSim.distanceSq(CirSim.mouseElm.x, CirSim.mouseElm.y, x, y) >
                CirSim.distanceSq(CirSim.mouseElm.x2, CirSim.mouseElm.y2, x, y)) ? 1 : 0;
    }
    var dx = x - CirSim.dragX;
    var dy = y - CirSim.dragY;
    if (dx == 0 && dy == 0)
        return;

    CirSim.mouseElm.movePoint(CirSim.draggingPost, dx, dy);
    CirSim.needAnalyze();
};

CirSim.unstackScope = function (s) {
    if (s == 0) {
        if (CirSim.scopeCount < 2)
            return;
        s = 1;
    }
    if (CirSim.scopes[s].position != CirSim.scopes[s - 1].position)
        return;
    for (; s < CirSim.scopeCount; s++)
        CirSim.scopes[s].position++;
};

CirSim.stackAll = function () {
    var i;
    for (i = 0; i != CirSim.scopeCount; i++) {
        CirSim.scopes[i].position = 0;
        CirSim.scopes[i].showMax = CirSim.scopes[i].showMin = false;
    }
};

CirSim.unstackAll = function () {
    var i;
    for (i = 0; i != CirSim.scopeCount; i++) {
        CirSim.scopes[i].position = i;
        CirSim.scopes[i].showMax = true;
    }
};

CirSim.doEdit = function (target) {
    //CirSim.clearSelection();

    CirSim.pushUndo();

    //if(CirSim.editDialog) {
    //CirSim.editDialog.setVisible(false);
    //CirSim.editDialog = null;
    //}

    CirSim.editDialog = new EditDialog(target);
    //CirSim.editDialog.show();

};

CirSim.dumpCircuit = function () {
    var i;

    var f = (CirSim.dotsCheckItem) ? 1 : 0;
    f |= (CirSim.smallGridCheckItem) ? 2 : 0;
    f |= (CirSim.voltsCheckItem) ? 0 : 4;
    f |= (CirSim.powerCheckItem) ? 8 : 0;
    f |= (CirSim.showValuesCheckItem) ? 0 : 16;

    // 32 = linear scale in a filter
    var dump = "$ " + f + " " + CirSim.timeStep + " " + CirSim.getIterCount() + " " + CirSim.currentBar + " " + CircuitElement.voltageRange + " " + CirSim.powerBar + "\n";

    for (i = 0; i != CirSim.elmList.length; i++)
        dump += CirSim.getElm(i).dump() + "\n";

    // TODO: Implement scope
    for (i = 0; i != CirSim.scopeCount; i++) {
        var d = CirSim.scopes[i].dump();
        if (d != null)
            dump += d + "\n";
    }

    if (CirSim.hintType != -1)
        dump += "h " + CirSim.hintType + " " + CirSim.hintItem1 + " " + CirSim.hintItem2 + "\n";

    return dump;
};

CirSim.selectArea = function (x, y) {
    var x1 = Math.min(x, CirSim.initDragX);
    var x2 = Math.max(x, CirSim.initDragX);
    var y1 = Math.min(y, CirSim.initDragY);
    var y2 = Math.max(y, CirSim.initDragY);
    CirSim.selectedArea = new Rectangle(x1, y1, x2 - x1, y2 - y1);
    var i;
    for (i = 0; i != CirSim.elmList.length; i++) {
        var ce = CirSim.getElm(i);
        ce.selectRect(CirSim.selectedArea);
    }
};

CirSim.removeZeroLengthElements = function () {
    var i;
    var changed = false;
    for (i = CirSim.elmList.length - 1; i >= 0; i--) {
        var ce = CirSim.getElm(i);
        if (ce.x == ce.x2 && ce.y == ce.y2) {
            // TODO: Make sure this works
            CirSim.elmList.splice(i, 1);
            ce.destroy();
            changed = true;
        }
    }
    CirSim.needAnalyze();
};

CirSim.pushUndo = function () {
    CirSim.redoStack = new Array();
    var s = CirSim.dumpCircuit();

    if (CirSim.undoStack.length > 0 && s === CirSim.undoStack[CirSim.undoStack.length - 1])
        return;

    CirSim.undoStack.push(s);
    CirSim.enableUndoRedo();
};

CirSim.doUndo = function () {
    if (CirSim.undoStack.length == 0)
        return;

    CirSim.redoStack.push(CirSim.dumpCircuit());
    var s = CirSim.undoStack.remove(CirSim.undoStack.size() - 1);
    //CirSim.readSetup(s);
    CirSim.readCircuitFromString(s);
    CirSim.enableUndoRedo();
};

// TODO: Test
CirSim.doRedo = function () {
    if (CirSim.redoStack.size() == 0)
        return;
    CirSim.undoStack.add(CirSim.dumpCircuit());
    var s = CirSim.redoStack.remove(CirSim.redoStack.size() - 1);

    CirSim.readCircuitFromString(s);
    CirSim.enableUndoRedo();
};

CirSim.enableUndoRedo = function () {
    //CirSim.redoMenuItem.setEnabled(CirSim.redoStack.size() > 0);
    //CirSim.undoMenuItem.setEnabled(CirSim.undoStack.size() > 0);
};

CirSim.setMenuSelection = function () {
    if (CirSim.menuElm != null) {
        if (CirSim.menuElm.selected)
            return;
        CirSim.clearSelection();
        CirSim.menuElm.setSelected(true);
    }
};


/** TODO: NOT YET PORTED */
CirSim.doCut = function () {
    var i;
    CirSim.pushUndo();
    //setMenuSelection();
    CirSim.clipboard = "";

    for (i = CirSim.elmList.length - 1; i >= 0; i--) {
        var ce = CirSim.getElm(i);
        if (ce.isSelected()) {
            CirSim.clipboard += ce.dump() + "\n";
            ce.destroy();
            CirSim.elmList.removeElementAt(i);
        }
    }

    CirSim.enablePaste();
    CirSim.needAnalyze();
};

/** TODO: NOT YET PORTED */
CirSim.doCopy = function () {
    var i;
    CirSim.clipboard = "";
    //setMenuSelection();
    for (i = CirSim.elmList.length - 1; i >= 0; i--) {
        var ce = CirSim.getElm(i);
        if (ce.isSelected())
            CirSim.clipboard += ce.dump() + "\n";
    }
    CirSim.enablePaste();
};

/** Removes all circuit elements and scopes from the workspace and resets time to zero. */
CirSim.clearAll = function () {

    // reset the interface
    for (var i = 0; i < CirSim.elmList.length; i++) {
        var ce = CirSim.getElm(i);
        ce.destroy();
    }

    CirSim.elmList = [];
    CirSim.hintType = -1;
    CirSim.timeStep = 5e-6;

    CirSim.dotsCheckItem = true;
    CirSim.smallGridCheckItem = false;
    CirSim.powerCheckItem = false;
    CirSim.voltsCheckItem = true;
    CirSim.showValuesCheckItem = true;
    CirSim.setGrid();
    CirSim.speedBar = 117; // 57
    CirSim.currentBar = 100;
    CirSim.powerBar = 50;
    CircuitElement.voltageRange = 5;
    CirSim.scopeCount = 0;

    CirSim.errorStack = new Array();
    CirSim.warningStack = new Array();
};

/** Restarts the circuit from time zero */
CirSim.reset = function () {

    for (var i = 0; i < CirSim.elmList.length; i++)
        CirSim.getElm(i).reset();
    for (i = 0; i != CirSim.scopeCount; i++)
        CirSim.scopes[i].resetGraph();

    CirSim.analyzeFlag = true;
    CirSim.t = 0;
    CirSim.stoppedCheck = false;

    //cv.repaint();
};

// TODO: Test!
CirSim.doDelete = function () {
    var i;
    CirSim.pushUndo();
    CirSim.setMenuSelection();
    for (i = CirSim.elmList.length - 1; i >= 0; i--) {
        var ce = CirSim.getElm(i);
        if (ce.isSelected()) {
            ce.destroy();
            CirSim.elmList.splice(i, 1)
        }
    }
    CirSim.needAnalyze();
};

CirSim.enablePaste = function () {
    //pasteMenuItem.setEnabled(CirSim.clipboard.length() > 0);
};

/** Not yet ported */
CirSim.doPaste = function () {
    // TODO: NOT YET PORTED
};

CirSim.clearSelection = function () {
    var i;
    for (i = 0; i != CirSim.elmList.length; i++) {
        var ce = CirSim.getElm(i);
        ce.setSelected(false);
    }
};

CirSim.doSelectAll = function () {
    var i;
    for (i = 0; i != CirSim.elmList.length; i++) {
        var ce = CirSim.getElm(i);
        ce.setSelected(true);
    }
};

CirSim.setGrid = function () {
    CirSim.gridSize = (CirSim.smallGridCheckItem) ? 8 : 16;
    CirSim.gridMask = ~(CirSim.gridSize - 1);
    CirSim.gridRound = CirSim.gridSize / 2 - 1;
};

CirSim.drawGrid = function () {

    var CanvasBounds = getCanvasBounds();

    var numCols = (CanvasBounds.width / CirSim.gridSize);
    var numRows = (CanvasBounds.height / CirSim.gridSize);

    // Draw cols:
    for (var i = 0; i < numCols; i++) {
        for (var j = 0; j < numRows; ++j) {
            paper.rect(CirSim.gridSize * i, CirSim.gridSize * j, 1, 1).attr({
                'stroke':Color.color2HexString(Color.DEEP_YELLOW),
                'stroke-width':.2
            });
        }
    }

};

CirSim.handleResize = function () {
    //TODO: Probably not needed.
    CirSim.needAnalyze();
    CirSim.circuitBottom = 0;
};

CirSim.destroyFrame = function () {
    //TODO: Probably not needed.
};

CirSim.getHint = function () {

    var c1 = CirSim.getElm(CirSim.hintItem1);
    var c2 = CirSim.getElm(CirSim.hintItem2);

    if (c1 == null || c2 == null)
        return null;
    if (CirSim.hintType == CirSim.HINT_LC) {
        if (!( c1 instanceof InductorElm))
            return null;
        if (!( c2 instanceof CapacitorElm))
            return null;
        var ie = c1;
        // as InductorElm;
        var ce = c2;
        // as CapacitorElm;
        return "res.f = " + CircuitElement.getUnitText(1 / (2 * Math.PI * Math.sqrt(ie.inductance * ce.capacitance)), "Hz");
    }
    if (CirSim.hintType == CirSim.HINT_RC) {
        if (!( c1 instanceof ResistorElm))
            return null;
        if (!( c2 instanceof CapacitorElm))
            return null;
        var re = c1;
        // as ResistorElm;
        var ce = c2;
        // as CapacitorElm;
        return "RC = " + CircuitElement.getUnitText(re.resistance * ce.capacitance, "s");
    }
    if (CirSim.hintType == CirSim.HINT_3DB_C) {
        if (!( c1 instanceof ResistorElm))
            return null;
        if (!( c2 instanceof CapacitorElm))
            return null;
        var re = c1;
        // as ResistorElm;
        var ce = c2;
        // as CapacitorElm;
        return "f.3db = " + CircuitElement.getUnitText(1 / (2 * Math.PI * re.resistance * ce.capacitance), "Hz");
    }
    if (CirSim.hintType == CirSim.HINT_3DB_L) {
        if (!( c1 instanceof ResistorElm))
            return null;
        if (!( c2 instanceof InductorElm))
            return null;
        var re = c1;
        // as ResistorElm;
        var ie = c2;
        // as InductorElm;
        return "f.3db = " + CircuitElement.getUnitText(re.resistance / (2 * Math.PI * ie.inductance), "Hz");
    }
    if (CirSim.hintType == CirSim.HINT_TWINT) {
        if (!( c1 instanceof ResistorElm))
            return null;
        if (!( c2 instanceof CapacitorElm))
            return null;
        var re = c1; // as ResistorElm;
        var ce = c2; // as CapacitorElm;
        return "fc = " + CircuitElement.getUnitText(1 / (2 * Math.PI * re.resistance * ce.capacitance), "Hz");
    }

    return null;
};

CirSim.snapGrid = function (x) {
    return (x + CirSim.gridRound) & CirSim.gridMask;
};

CirSim.toggleSwitch = function (n) {
    var i;
    for (i = 0; i != CirSim.elmList.length; i++) {
        var ce = CirSim.getElm(i);
        if (ce instanceof SwitchElm) {
            n--;
            if (n == 0) {
                (ce).toggle();
                CirSim.analyzeFlag = true;
                //cv.repaint();
                return;
            }
        }
    }
};

CirSim.doSwitch = function (x, y) {
    if (CirSim.mouseElm == null || !(CirSim.mouseElm instanceof SwitchElm))
        return false;

    var se = CirSim.mouseElm; // as SwitchElm;
    se.toggle();

    if (se.momentary)
        CirSim.heldSwitchElm = se;

    CirSim.needAnalyze();
    return true;
};

CirSim.getIterCount = function () {
    if (CirSim.speedBar == 0)
        return 0;
    //return (Math.exp((speedBar.getValue()-1)/24.) + .5);
    return .1 * Math.exp((CirSim.speedBar - 61) / 24.);
};

CirSim.needAnalyze = function () {
    CirSim.analyzeFlag = true;
};

CirSim.getCircuitNode = function (n) {
    if (n >= CirSim.nodeList.length)
        return new CircuitNode();

    return CirSim.nodeList[n];//[n] as CircuitNode;
};

CirSim.getElm = function (n) {
    if (n >= CirSim.elmList.length)
        return null;
    return CirSim.elmList[n];
    // as CircuitElement;
};

CirSim.halt = function (s, ce) {
    CirSim.stopMessage = s;
    CirSim.circuitMatrix = null;
    CirSim.stopElm = ce;
    CirSim.stoppedCheck = true;
    CirSim.analyzeFlag = false;

    CirSim.error("[FATAL] " + s);
};

///////////////////////////////////////////////////////////////////////////////////////////////
CirSim.updateCircuit = function () {
    var startTime = (new Date()).getTime();

    // Reset the page:
    paper.clearRect(0, 0, CANVAS.width(), CANVAS.height());

    //CirSim.drawGrid();

    // CircuitElement
    var realMouseElm = CirSim.mouseElm;

    // Render Warning and error messages:
    //CirSim.drawError();
    //CirSim.drawWarning();

    if (CirSim.analyzeFlag) {
        CirSim.analyzeCircuit();
        CirSim.analyzeFlag = false;
    }

    // TODO
//	if(CirSim.editDialog != null && CirSim.editDialog.elm instanceof CircuitElement)
//		CirSim.mouseElm = CirSim.editDialog.elm;
    // as CircuitElement;

    if (CirSim.mouseElm == null)
        CirSim.mouseElm = CirSim.stopElm;

    // TODO: test
    CirSim.setupScopes();

    CircuitElement.selectColor = Settings.SELECT_COLOR;

    if (CirSim.printableCheckItem) {
        CircuitElement.whiteColor = Color.WHITE;
        CircuitElement.lightGrayColor = Color.BLACK;
    } else {
        CircuitElement.whiteColor = Color.WHITE;
        CircuitElement.lightGrayColor = Color.LIGHT_GREY;
    }

    if (!CirSim.stoppedCheck) {
        try {
            CirSim.runCircuit();
        } catch (e) {
            console.log("error in run circuit: " + e.message);
            CirSim.analyzeFlag = true;

            //cv.paint(g);
            return;
        }
    }


    if (!CirSim.stoppedCheck) {

        var sysTime = (new Date()).getTime();
        if (CirSim.lastTime != 0) {
            var inc = Math.floor(sysTime - CirSim.lastTime);
            var c = CirSim.currentBar;     //55; 	// The value of CirSim number must be carefully set for current to display properly

            //console.log("Frame time: " + inc  + "   #: "  + frames);

            c = Math.exp(c / 3.5 - 14.2);
            CircuitElement.currentMult = 1.7 * inc * c;
            //console.log("cur: " + CircuitElement.currentMult + " cb: " + CirSim.currentBar);
            if (!CirSim.conventionCheckItem)
                CircuitElement.currentMult = -CircuitElement.currentMult;

        }
        if (sysTime - CirSim.secTime >= 1000) {
            CirSim.framerate = CirSim.frames;
            CirSim.steprate = CirSim.steps;
            CirSim.frames = 0;
            CirSim.steps = 0;
            CirSim.secTime = sysTime;
        }

        CirSim.lastTime = sysTime;
    } else {
        CirSim.lastTime = 0;
    }

    CircuitElement.powerMult = Math.exp(CirSim.powerBar / 4.762 - 7);

    for (var i = 0; i < CirSim.elmList.length; ++i) {
        CirSim.getElm(i).draw();
    }

    if (CirSim.tempMouseMode == CirSim.MODE_DRAG_ROW || CirSim.tempMouseMode == CirSim.MODE_DRAG_COLUMN || CirSim.tempMouseMode == CirSim.MODE_DRAG_POST || CirSim.tempMouseMode == CirSim.MODE_DRAG_SELECTED) {

        for (i = 0; i < CirSim.elmList.length; ++i) {
            var ce = CirSim.getElm(i);
            ce.drawPost(ce.x, ce.y);
            ce.drawPost(ce.x2, ce.y2);
        }

    }

    var badNodes = 0;

    // find bad connections. Nodes not connected to other elements which intersect other elements' bounding boxes
    for (i = 0; i < CirSim.nodeList.length; ++i) {
        var cn = CirSim.getCircuitNode(i);

        if (!cn.intern && cn.links.length == 1) {
            var bb = 0;
            var cn1 = cn.links[0];
            // CircuitNodeLink
            for (var j = 0; j < CirSim.elmList.length; ++j) {
                if (cn1.elm != CirSim.getElm(j) && CirSim.getElm(j).boundingBox.contains(cn.x, cn.y))
                    bb++;
            }
            if (bb > 0) {
                // Outline bad nodes
                paper.circle(cn.x, cn.y, 2 * Settings.POST_RADIUS).attr({
                    'stroke':Color.color2HexString(Color.RED),
                    'stroke-dasharray':'--'
                });
                badNodes++;
            }
        }
    }

    if (CirSim.dragElm != null && (CirSim.dragElm.x != CirSim.dragElm.x2 || CirSim.dragElm.y != CirSim.dragElm.y2))
        CirSim.dragElm.draw(null);

    var ct = CirSim.scopeCount;

    if (CirSim.stopMessage != null)
        ct = 0;

    // TODO Implement scopes
    //for(i=0; i!=ct; ++i)
    //    CirSim.scopes[i].draw();

    if (CirSim.stopMessage != null) {
        printError(CirSim.stopMessage);
    } else {
        if (CirSim.circuitBottom == 0)
            CirSim.calcCircuitBottom();

        var info = [];
        // Array of messages to be displayed at the bottom of the canvas
        if (CirSim.mouseElm != null) {
            if (CirSim.mousePost == -1)
                CirSim.mouseElm.getInfo(info);
            else
                info[0] = "V = " + CircuitElement.getUnitText(CirSim.mouseElm.getPostVoltage(CirSim.mousePost), "V");
        } else {
            CircuitElement.showFormat.fractionalDigits = 2;
            info[0] = "t = " + CircuitElement.getUnitText(CirSim.t, "s") + "\nf.t.: " + (CirSim.lastTime - CirSim.lastFrameTime) + "\n";
        }
        if (CirSim.hintType != -1) {
            for (i = 0; info[i] != null; ++i) {
            }
            var s = CirSim.getHint();
            if (s == null)
                CirSim.hintType = -1;
            else
                info[i] = s;
        }
        var x = 0;

        // TODO: Implement scopes
        if (ct != 0)
            x = CirSim.scopes[ct - 1].rightEdge() + 20;

        var CanvasBounds = getCanvasBounds();

        if (!x) x = 0;

        x = Math.max(x, CanvasBounds.width * 2 / 3);

        for (i = 0; info[i] != null; ++i) {
        }
        if (badNodes > 0)
            info[++i] = badNodes + ((badNodes == 1) ? " bad connection" : " bad connections");

        var bottomTextOffset = 100;
        // Find where to show data; below circuit, not too high unless we need it
        var ybase = CanvasBounds.height - 15 * i - bottomTextOffset;
        ybase = Math.min(ybase, CanvasBounds.height);
        ybase = Math.max(ybase, CirSim.circuitBottom);

        // TODO: CANVAS
        //for (i = 0; info[i] != null; ++i)
        //    paper.text(x, ybase + 15 * (i + 1), info[i]).attr('fill', Color.color2HexString(Settings.TEXT_COLOR));

    }

    // Draw selection outline:
    if (CirSim.selectedArea != null) {
        paper.strokeStyle = Color.color2HexString(Settings.SELECTION_MARQUEE_COLOR);
        paper.rect(this.selectedArea.x, this.selectedArea.y, this.selectedArea.width, this.selectedArea.height);
    }

    CirSim.mouseElm = realMouseElm;
    CirSim.frames++;

    var endTime = (new Date()).getTime();
    var computationTime = (endTime - startTime);

    //paper.text(100, 15, "Frame: " + CirSim.frames + "\nComputationTime: " + computationTime).attr('fill', Color.color2HexString(Settings.TEXT_COLOR));

    CirSim.lastFrameTime = CirSim.lastTime;
};

/** Render any scopes on the scene */
CirSim.setupScopes = function () {
    var i;

    // check scopes to make sure the elements still exist, and remove unused scopes/columns
    var pos = -1;
    for (i = 0; i < CirSim.scopeCount; i++) {
        if (CirSim.locateElm(CirSim.scopes[i].elm) < 0)
            CirSim.scopes[i].setElm(null);
        if (CirSim.scopes[i].elm == null) {
            var j;
            for (j = i; j != CirSim.scopeCount; j++)
                CirSim.scopes[j] = CirSim.scopes[j + 1];
            CirSim.scopeCount--;
            i--;
            continue;
        }
        if (CirSim.scopes[i].position > pos + 1)
            CirSim.scopes[i].position = pos + 1;
        pos = CirSim.scopes[i].position;
    }
    while (CirSim.scopeCount > 0 && CirSim.scopes[CirSim.scopeCount - 1].elm == null)
        CirSim.scopeCount--;
    //var h = winSize.height - circuitArea.height;
    var h = 120;

    pos = 0;
    for (i = 0; i != CirSim.scopeCount; i++)
        CirSim.scopeColCount[i] = 0;
    for (i = 0; i != CirSim.scopeCount; i++) {
        pos = Math.max(CirSim.scopes[i].position, pos);
        CirSim.scopeColCount[CirSim.scopes[i].position]++;
    }
    var colct = pos + 1;
    var iw = CirSim.infoWidth;
    if (colct <= 2)
        iw = iw * 3 / 2;
    var w = (getCanvasBounds().width - iw) / colct;
    var marg = 10;
    if (w < marg * 2)
        w = marg * 2;
    pos = -1;
    var colh = 0;
    var row = 0;
    var speed = 0;
    for (i = 0; i != CirSim.scopeCount; i++) {
        var s = CirSim.scopes[i];
        if (s.position > pos) {
            pos = s.position;
            colh = h / CirSim.scopeColCount[pos];
            row = 0;
            speed = s.speed;
        }
        if (s.speed != speed) {
            s.speed = speed;
            s.resetGraph();
        }
        var r = new Rectangle(pos * w, getCanvasBounds().height - h + colh * row, w - marg, colh);
        row++;
        if (!(r.equals(s.rect)))
            s.setRect(r);
    }
};

CirSim.locateElm = function (elm) {

    for (var i = 0; i != CirSim.elmList.size(); i++)
        if (elm == CirSim.elmList[i])
            return i;

    return -1;
};

CirSim.analyzeCircuit = function () {

    CirSim.calcCircuitBottom();
    if (CirSim.elmList.length == 0)
        return;

    CirSim.stopMessage = null;
    CirSim.stopElm = null;

    var i;
    var j;

    var vscount = 0; // int

    CirSim.nodeList = [];

    var gotGround = false;
    var gotRail = false;

    var volt = null;	// CircuitElement

    for (i = 0; i < CirSim.elmList.length; ++i) {
        var ce = CirSim.getElm(i); // CircuitElement type

        if (ce instanceof GroundElm) {
            gotGround = true;
            break;
        }
        if (ce instanceof RailElm)
            gotRail = true;
        if (volt == null && ce instanceof VoltageElm)
            volt = ce;
    }

    // If no ground and no rails then voltage element's first terminal instanceof referenced to ground:
    if (!gotGround && volt != null && !gotRail) {
        var cn = new CircuitNode();

        var pt = volt.getPost(0);
        cn.x = pt.x;
        cn.y = pt.y;
        CirSim.nodeList.push(cn);
    } else {
        // Else allocate extra node for ground
        var cn = new CircuitNode();
        cn.x = cn.y = -1;
        CirSim.nodeList.push(cn);
    }

    // Allocate nodes and voltage sources
    for (i = 0; i < CirSim.elmList.length; ++i) {
        var ce = CirSim.getElm(i);

        var inodes = ce.getInternalNodeCount();
        var ivs = ce.getVoltageSourceCount();
        var posts = ce.getPostCount();

        // allocate a node for each post and match posts to nodes
        for (j = 0; j != posts; ++j) {
            var pt = ce.getPost(j);

            var k;
            for (k = 0; k != CirSim.nodeList.length; ++k) {
                var cn = CirSim.getCircuitNode(k);
                if (pt.x == cn.x && pt.y == cn.y)
                    break;
            }
            if (k == CirSim.nodeList.length) {
                var cn = new CircuitNode();
                cn.x = pt.x;
                cn.y = pt.y;
                var cn1 = new CircuitNodeLink();
                cn1.num = j;
                cn1.elm = ce;
                cn.links.push(cn1);
                ce.setNode(j, CirSim.nodeList.length);
                CirSim.nodeList.push(cn);
            } else {
                var cn1 = new CircuitNodeLink();
                cn1.num = j;
                cn1.elm = ce;
                CirSim.getCircuitNode(k).links.push(cn1);
                ce.setNode(j, k);
                // If it's the ground node, make sure the node voltage instanceof 0, because it may not get set later.
                if (k == 0)
                    ce.setNodeVoltage(j, 0);
            }

        }
        for (j = 0; j != inodes; ++j) {
            var cn = new CircuitNode();

            cn.x = -1;
            cn.y = -1;
            cn.intern = true;

            var cn1 = new CircuitNodeLink();
            cn1.num = j + posts;
            cn1.elm = ce;
            cn.links.push(cn1);
            ce.setNode(cn1.num, CirSim.nodeList.length);
            CirSim.nodeList.push(cn);
        }
        vscount += ivs;
    }

    CirSim.voltageSources = new Array(vscount);
    vscount = 0;
    CirSim.circuitNonLinear = false;

    // determine if circuit instanceof nonlinear
    for (i = 0; i != CirSim.elmList.length; ++i) {
        var ce = CirSim.getElm(i);		// circuitElement
        if (ce.nonLinear())
            CirSim.circuitNonLinear = true;
        var ivs = ce.getVoltageSourceCount();
        for (j = 0; j != ivs; ++j) {
            CirSim.voltageSources[vscount] = ce;
            ce.setVoltageSource(j, vscount++);
        }
    }

    CirSim.voltageSourceCount = vscount;

    var matrixSize = CirSim.nodeList.length - 1 + vscount;
    CirSim.circuitMatrix = initializeTwoDArray(matrixSize, matrixSize);
    CirSim.origMatrix = initializeTwoDArray(matrixSize, matrixSize);

    CirSim.circuitRightSide = new Array(matrixSize);
    // Todo: check array length
    /*circuitRightSide = */
    zeroArray(CirSim.circuitRightSide);
    CirSim.origRightSide = new Array(matrixSize);
    /*origRightSide = */
    zeroArray(CirSim.origRightSide);
    CirSim.circuitMatrixSize = CirSim.circuitMatrixFullSize = matrixSize;

    CirSim.circuitRowInfo = new Array(matrixSize);
    CirSim.circuitPermute = new Array(matrixSize);
    // Todo: check
    /*circuitRowInfo = */
    zeroArray(CirSim.circuitRowInfo);
    /*circuitPermute = */
    zeroArray(CirSim.circuitPermute);

    for (i = 0; i != matrixSize; ++i) {
        CirSim.circuitRowInfo[i] = new RowInfo();
    }

    CirSim.circuitNeedsMap = false;

    // stamp linear circuit elements
    for (i = 0; i != CirSim.elmList.length; ++i) {
        var ce = CirSim.getElm(i);
        ce.stamp();
    }

    var closure = new Array(CirSim.nodeList.length);
    var changed = true;

    closure[0] = true;

    while (changed) {
        changed = false;
        for (i = 0; i != CirSim.elmList.length; ++i) {
            var ce = CirSim.getElm(i);

            // Loop through all ce's nodes to see if theya are connected to otehr nodes not in closure
            for (j = 0; j < ce.getPostCount(); ++j) {
                if (!closure[ce.getNode(j)]) {
                    if (ce.hasGroundConnection(j))
                        closure[ce.getNode(j)] = changed = true;
                    continue;
                }

                var k;
                for (k = 0; k != ce.getPostCount(); ++k) {
                    if (j == k)
                        continue;
                    var kn = ce.getNode(k);
                    if (ce.getConnection(j, k) && !closure[kn]) {
                        closure[kn] = true;
                        changed = true;
                    }
                }
            }
        }

        if (changed)
            continue;

        // connect unconnected nodes
        for (i = 0; i != CirSim.nodeList.length; ++i) {
            if (!closure[i] && !CirSim.getCircuitNode(i).intern) {
                CirSim.error("node " + i + " unconnected");
                CirSim.stampResistor(0, i, 1e8);
                closure[i] = true;
                changed = true;
                break;
            }
        }
    }

    for (i = 0; i != CirSim.elmList.length; ++i) {
        var ce = CirSim.getElm(i);

        if (ce instanceof InductorElm) {
            var fpi = new FindPathInfo(FindPathInfo.INDUCT, ce, ce.getNode(1), CirSim.elmList, CirSim.nodeList.length);

            // try findPath with maximum depth of 5, to avoid slowdown
            if (!fpi.findPath(ce.getNode(0), 5) && !fpi.findPath(ce.getNode(0))) {
                console.log(ce.toString() + " no path");
                ce.reset();
            }
        }

        // look for current sources with no current path
        if (ce instanceof CurrentElm) {
            var fpi = new FindPathInfo(FindPathInfo.INDUCT, ce, ce.getNode(1), CirSim.elmList, CirSim.nodeList.length);

            if (!fpi.findPath(ce.getNode(0))) {
                CirSim.halt("No path for current source!", ce);
                return;
            }
        }

        // Look for voltage soure loops:
        if ((ce instanceof VoltageElm && ce.getPostCount() == 2) || ce instanceof WireElm) {
            var fpi = new FindPathInfo(FindPathInfo.VOLTAGE, ce, ce.getNode(1), CirSim.elmList, CirSim.nodeList.length);

            if (fpi.findPath(ce.getNode(0)) == true) {
                CirSim.halt("Voltage source/wire loop with no resistance!", ce);
                return;
            }
        }

        // Look for shorted caps or caps with voltage but no resistance
        if (ce instanceof CapacitorElm) {
            var fpi = new FindPathInfo(FindPathInfo.SHORT, ce, ce.getNode(1), CirSim.elmList, CirSim.nodeList.length);

            if (fpi.findPath(ce.getNode(0))) {
                console.log(ce.toString() + " shorted");
                ce.reset();
            } else {

                fpi = new FindPathInfo(FindPathInfo.CAP_V, ce, ce.getNode(1), CirSim.elmList, CirSim.nodeList.length);
                if (fpi.findPath(ce.getNode(0))) {
                    CirSim.halt("Capacitor loop with no resistance!", ce);
                    return;
                }

            }
        }

    }

    for (i = 0; i != matrixSize; ++i) {
        var qm = -1;
        var qp = -1;
        var qv = 0;
        var re = CirSim.circuitRowInfo[i];

        if (re.lsChanges || re.dropRow || re.rsChanges)
            continue;

        var rsadd = 0;

        // look for rows that can be removed
        for (j = 0; j != matrixSize; ++j) {
            var q = CirSim.circuitMatrix[i][j];
            if (CirSim.circuitRowInfo[j].type == RowInfo.ROW_CONST) {
                // Keep a running total of const values that have been removed already
                rsadd -= CirSim.circuitRowInfo[j].value * q;
                continue;
            }
            if (q == 0)
                continue;
            if (qp == -1) {
                qp = j;
                qv = q;
                continue;
            }
            if (qm == -1 && q == -qv) {
                qm = j;
                continue;
            }
            break;
        }

        //console.log("line " + i + " " + qp + " " + qm + " " + j);
        /*if (qp != -1 && circuitRowInfo[qp].lsChanges) {
         console.log("lschanges");
         continue;
         }
         if (qm != -1 && circuitRowInfo[qm].lsChanges) {
         console.log("lschanges");
         continue;
         }*/

        if (j == matrixSize) {
            if (qp == -1) {
                CirSim.halt("Matrix error", null);
                return;
            }

            var elt = CirSim.circuitRowInfo[qp];
            if (qm == -1) {
                // We found a row with only one nonzero entry, that value instanceof constant
                var k;
                for (k = 0; elt.type == RowInfo.ROW_EQUAL && k < 100; ++k) {
                    // Follow the chain
                    qp = elt.nodeEq;
                    elt = CirSim.circuitRowInfo[qp];
                }
                if (elt.type == RowInfo.ROW_EQUAL) {
                    // break equal chains
                    //console.log("Break equal chain");
                    elt.type = RowInfo.ROW_NORMAL;
                    continue;
                }
                if (elt.type != RowInfo.ROW_NORMAL) {
                    console.log("type already " + elt.type + " for " + qp + "!");
                    continue;
                }

                elt.type = RowInfo.ROW_CONST;
                elt.value = (CirSim.circuitRightSide[i] + rsadd) / qv;
                CirSim.circuitRowInfo[i].dropRow = true;
                //console.log(qp + " * " + qv + " = const " + elt.value);
                i = -1; // start over from scratch
            } else if (CirSim.circuitRightSide[i] + rsadd == 0) {
                // we found a row with only two nonzero entries, and one
                // instanceof the negative of the other; the values are equal
                if (elt.type != RowInfo.ROW_NORMAL) {
                    //console.log("swapping");
                    var qq = qm;
                    qm = qp;
                    qp = qq;
                    elt = CirSim.circuitRowInfo[qp];
                    if (elt.type != RowInfo.ROW_NORMAL) {
                        // we should follow the chain here, but this hardly ever happens so it's not worth worrying about
                        console.log("swap failed");
                        continue;
                    }
                }
                elt.type = RowInfo.ROW_EQUAL;
                elt.nodeEq = qm;
                CirSim.circuitRowInfo[i].dropRow = true;
                //console.log(qp + " = " + qm);
            } // end elseif

        } // end if(j==matrixSize)

    } // end for(matrixSize)

    // find size of new matrix:
    var nn = 0;
    for (i = 0; i != matrixSize; ++i) {
        var elt = CirSim.circuitRowInfo[i];
        if (elt.type == RowInfo.ROW_NORMAL) {
            elt.mapCol = nn++;
            //console.log("col " + i + " maps to " + elt.mapCol);
            continue;
        }
        if (elt.type == RowInfo.ROW_EQUAL) {
            var e2 = null;
            // resolve chains of equality; 100 max steps to avoid loops
            for (j = 0; j != 100; j++) {
                e2 = CirSim.circuitRowInfo[elt.nodeEq];
                if (e2.type != RowInfo.ROW_EQUAL)
                    break;
                if (i == e2.nodeEq)
                    break;
                elt.nodeEq = e2.nodeEq;
            }
        }
        if (elt.type == RowInfo.ROW_CONST)
            elt.mapCol = -1;
    } // END for

    for (i = 0; i != matrixSize; i++) {
        var elt = CirSim.circuitRowInfo[i];
        if (elt.type == RowInfo.ROW_EQUAL) {
            var e2 = CirSim.circuitRowInfo[elt.nodeEq];
            if (e2.type == RowInfo.ROW_CONST) {
                // if something instanceof equal to a const, it's a const
                elt.type = e2.type;
                elt.value = e2.value;
                elt.mapCol = -1;
                //console.log(i + " = [late]const " + elt.value);
            } else {
                elt.mapCol = e2.mapCol;
                //console.log(i + " maps to: " + e2.mapCol);
            }
        }
    }

    // make the new, simplified matrix
    var newsize = nn;
    var newmatx = initializeTwoDArray(newsize, newsize);

    var newrs = new Array(newsize);
    /*var newrs:Array = */
    zeroArray(newrs);
    var ii = 0;
    for (i = 0; i != matrixSize; i++) {
        var rri = CirSim.circuitRowInfo[i];
        if (rri.dropRow) {
            rri.mapRow = -1;
            continue;
        }
        newrs[ii] = CirSim.circuitRightSide[i];
        rri.mapRow = ii;
        //console.log("Row " + i + " maps to " + ii);
        for (j = 0; j != matrixSize; j++) {
            var ri = CirSim.circuitRowInfo[j];
            if (ri.type == RowInfo.ROW_CONST)
                newrs[ii] -= ri.value * CirSim.circuitMatrix[i][j];
            else
                newmatx[ii][ri.mapCol] += CirSim.circuitMatrix[i][j];
        }
        ii++;
    }

    CirSim.circuitMatrix = newmatx;
    CirSim.circuitRightSide = newrs;
    matrixSize = CirSim.circuitMatrixSize = newsize;
    for (i = 0; i != matrixSize; i++)
        CirSim.origRightSide[i] = CirSim.circuitRightSide[i];
    for (i = 0; i != matrixSize; i++)
        for (j = 0; j != matrixSize; j++)
            CirSim.origMatrix[i][j] = CirSim.circuitMatrix[i][j];
    CirSim.circuitNeedsMap = true;

    /* // For debugging
     console.log("matrixSize = " + matrixSize + " " + circuitNonLinear);
     for (j = 0; j != circuitMatrixSize; j++) {
     for (i = 0; i != circuitMatrixSize; i++)
     console.log(circuitMatrix[j][i] + " ");
     console.log("  " + circuitRightSide[j] + "\n");
     }
     console.log("\n");
     */

    // if a matrix instanceof linear, we can do the lu_factor here instead of needing to do it every frame
    if (!CirSim.circuitNonLinear) {
        if (!CirSim.lu_factor(CirSim.circuitMatrix, CirSim.circuitMatrixSize, CirSim.circuitPermute)) {
            CirSim.halt("Singular matrix!", null);
            return;
        }
    }

};

CirSim.calcCircuitBottom = function () {
    var i;
    CirSim.circuitBottom = 0;
    for (i = 0; i != CirSim.elmList.length; i++) {
        var rect = CirSim.getElm(i).boundingBox;
        var bottom = rect.height + rect.y;
        if (bottom > CirSim.circuitBottom)
            CirSim.circuitBottom = bottom;
    }
};

/* ported */
CirSim.locateElm = function (elm) {
    var i;
    for (i = 0; i != CirSim.elmList.length; i++)
        if (elm == CirSim.elmList[i])
            return i;
    return -1;
};

/** control voltage source vs with voltage from n1 to n2 (must also call stampVoltageSource()) */
CirSim.stampVCVS = function (n1, n2, coef, vs) {
    var vn = CirSim.nodeList.length + vs;
    CirSim.stampMatrix(vn, n1, coef);
    CirSim.stampMatrix(vn, n2, -coef);
};

/** stamp independent voltage source #vs, from n1 to n2, amount v */
CirSim.stampVoltageSource = function (n1, n2, vs, v) {
    var vn = CirSim.nodeList.length + vs;
    CirSim.stampMatrix(vn, n1, -1);
    CirSim.stampMatrix(vn, n2, 1);
    CirSim.stampRightSide(vn, v);
    CirSim.stampMatrix(n1, vn, 1);
    CirSim.stampMatrix(n2, vn, -1);
};

CirSim.updateVoltageSource = function (n1, n2, vs, v) {
    var vn = CirSim.nodeList.length + vs;
    CirSim.stampRightSide(vn, v);
};

CirSim.stampResistor = function (n1, n2, r) {
    var r0 = 1 / r;
    if (isNaN(r0) || isInfinite(r0)) {
        CirSim.error("bad resistance");
        var a = 0;
        a /= a;
    }

    CirSim.stampMatrix(n1, n1, r0);
    CirSim.stampMatrix(n2, n2, r0);
    CirSim.stampMatrix(n1, n2, -r0);
    CirSim.stampMatrix(n2, n1, -r0);
};

CirSim.stampConductance = function (n1, n2, r0) {
    CirSim.stampMatrix(n1, n1, r0);
    CirSim.stampMatrix(n2, n2, r0);
    CirSim.stampMatrix(n1, n2, -r0);
    CirSim.stampMatrix(n2, n1, -r0);
};

/** current from cn1 to cn2 is equal to voltage from vn1 to 2, divided by g */
CirSim.stampVCCurrentSource = function (cn1, cn2, vn1, vn2, g) {
    CirSim.stampMatrix(cn1, vn1, g);
    CirSim.stampMatrix(cn2, vn2, g);
    CirSim.stampMatrix(cn1, vn2, -g);
    CirSim.stampMatrix(cn2, vn1, -g);
};

CirSim.stampCurrentSource = function (n1, n2, i) {
    CirSim.stampRightSide(n1, -i);
    CirSim.stampRightSide(n2, i);
};

/** stamp a current source from n1 to n2 depending on current through vs */
CirSim.stampCCCS = function (n1, n2, vs, gain) {
    var vn = CirSim.nodeList.length + vs;
    CirSim.stampMatrix(n1, vn, gain);
    CirSim.stampMatrix(n2, vn, -gain);
};

/** stamp value x in row i, column j, meaning that a voltage change
 of dv in node j will increase the current into node i by x dv.
 (Unless i or j is a voltage source node.) */
CirSim.stampMatrix = function (i, j, x) {
    if (i > 0 && j > 0) {
        if (CirSim.circuitNeedsMap) {
            i = CirSim.circuitRowInfo[i - 1].mapRow;
            var ri = CirSim.circuitRowInfo[j - 1];
            if (ri.type == RowInfo.ROW_CONST) {
                //console.log("Stamping constant " + i + " " + j + " " + x);
                CirSim.circuitRightSide[i] -= x * ri.value;
                return;
            }
            j = ri.mapCol;
            //console.log("stamping " + i + " " + j + " " + x);
        } else {
            i--;
            j--;
        }
        CirSim.circuitMatrix[i][j] += x;
    }
};

/** Stamp value x on the right side of row i, representing an
 independent current source flowing into node i
 */
CirSim.stampRightSide = function (i, x) {
    if (isNaN(x)) {
        //console.log("rschanges true " + (i-1));
        if (i > 0)
            CirSim.circuitRowInfo[i - 1].rsChanges = true;
    } else {
        if (i > 0) {
            if (CirSim.circuitNeedsMap) {
                i = CirSim.circuitRowInfo[i - 1].mapRow;
                //console.log("stamping rs " + i + " " + x);
            } else
                i--;
            CirSim.circuitRightSide[i] += x;
        }
    }
};

/** Indicate that the values on the left side of row i change in doStep() */
CirSim.stampNonLinear = function (i) {
    if (i > 0)
        CirSim.circuitRowInfo[i - 1].lsChanges = true;
};

/** Todo: Check if working */
CirSim.getCodeBase = function () {
    return "";
};

CirSim.runCircuit = function () {

    if (CirSim.circuitMatrix == null || CirSim.elmList.length == 0) {
        CirSim.circuitMatrix = null;
        return;
    }

    var iter;
    var debugPrint = CirSim.dumpMatrix;

    CirSim.dumpMatrix = false;

    var steprate = Math.floor(160 * CirSim.getIterCount());

    var tm = (new Date()).getTime();
    var lit = CirSim.lastIterTime;

    // Double-check
    if (1000 >= steprate * (tm - CirSim.lastIterTime)) {
        console.log("returned: diff: " + (tm - CirSim.lastIterTime));
        return;
    }

    // Main iteration
    for (iter = 1; ; ++iter) {

        var i;
        var j;
        var k;
        var subiter;

        // Start Iteration for each element in the circuit
        for (i = 0; i < CirSim.elmList.length; ++i) {
            var ce = CirSim.getElm(i);
            ce.startIteration();
        }

        // Keep track of the number of steps
        ++CirSim.steps;

        // The number of maximum allowable iterations
        var subiterCount = 500;

        // Sub iteration
        for (subiter = 0; subiter != subiterCount; subiter++) {

            CirSim.converged = true;

            CirSim.subIterations = subiter;

            for (i = 0; i < CirSim.circuitMatrixSize; ++i)
                CirSim.circuitRightSide[i] = CirSim.origRightSide[i];
            if (CirSim.circuitNonLinear) {
                for (i = 0; i < CirSim.circuitMatrixSize; ++i)
                    for (j = 0; j < CirSim.circuitMatrixSize; ++j)
                        CirSim.circuitMatrix[i][j] = CirSim.origMatrix[i][j];
            }

            // Step each element this iteration
            for (i = 0; i < CirSim.elmList.length; ++i) {
                var ce = CirSim.getElm(i);
                ce.doStep();
            }

            if (CirSim.stopMessage != null)
                return;

            var printit = debugPrint;
            debugPrint = false;
            for (j = 0; j < CirSim.circuitMatrixSize; ++j) {
                for (i = 0; i < CirSim.circuitMatrixSize; ++i) {
                    var x = CirSim.circuitMatrix[i][j];
                    if (isNaN(x) || isInfinite(x)) {
                        console.log("Matrix is invalid " + isNaN(x));
                        CirSim.halt("Invalid matrix", null);
                        return;
                    }
                }
            }

//            if(printit) {
//                for(j=0; i<circuitMatrixSize; j++) {
//                    for( i=0; i<circuitMatrixSize; ++i)
//                        console.log(circuitMatrix[j][i] + ",");
//                    console.log(" " + circuitRightSide[j] + "\n");
//                }
//                console.log("\n");
//            }

            if (CirSim.circuitNonLinear) {
                if (CirSim.converged && subiter > 0)
                    break;

                if (!CirSim.lu_factor(CirSim.circuitMatrix, CirSim.circuitMatrixSize, CirSim.circuitPermute)) {
                    CirSim.halt("Singular matrix!", null);
                    return;
                }

            }

            CirSim.lu_solve(CirSim.circuitMatrix, CirSim.circuitMatrixSize, CirSim.circuitPermute, CirSim.circuitRightSide);

            for (j = 0; j < CirSim.circuitMatrixFullSize; ++j) {
                var ri = CirSim.circuitRowInfo[j];
                var res = 0;

                if (ri.type == RowInfo.ROW_CONST)
                    res = ri.value;
                else
                    res = CirSim.circuitRightSide[ri.mapCol];

                if (isNaN(res)) {
                    CirSim.converged = false;
                    break;
                }

                if (j < (CirSim.nodeList.length - 1)) {

                    var cn = CirSim.getCircuitNode(j + 1);
                    for (k = 0; k < cn.links.length; ++k) {
                        var cn1 = cn.links[k];// as CircuitNodeLink;

                        cn1.elm.setNodeVoltage(cn1.num, res);
                    }
                } else {
                    var ji = j - (CirSim.nodeList.length - 1);
                    //console.log("setting vsrc " + ji + " to " + res);
                    CirSim.voltageSources[ji].setCurrent(ji, res);
                }

            }

            if (!CirSim.circuitNonLinear)
                break;

        }	// End for

        if (subiter > 5)
            console.log("converged after " + subiter + " iterations");
        if (subiter >= subiterCount) {
            CirSim.halt("Convergence failed: " + subiter, null);
            break;
        }

        CirSim.t += CirSim.timeStep;
        //for(i=0; i<CirSim.scopeCount; ++i)
        //    CirSim.scopes[i].timeStep();

        tm = (new Date()).getTime();
        lit = tm;

        //console.log("diff: " + (tm-CirSim.lastIterTime) + " iter: " + iter + " ");
        //console.log(iterCount + " breaking from iteration: " + " sr: " + steprate + " iter: " + subiter + " time: " + (tm - CirSim.lastIterTime)+ " lastFrametime: " + CirSim.lastFrameTime );
        //iterCount++;
        if (iter * 1000 >= steprate * (tm - CirSim.lastIterTime)) {
            //console.log("1 breaking from iteration: " + " sr: " + steprate + " iter: " + subiter + " time: " + (tm - CirSim.lastIterTime)+ " lastFrametime: " + CirSim.lastFrameTime );
            break;
        } else if (tm - CirSim.lastFrameTime > 500) {
            //console.log("2 breaking from iteration: " + " sr: " + steprate + " iter: " + iter + " time: " + (tm - CirSim.lastIterTime) + " lastFrametime: " + CirSim.lastFrameTime );
            break;
        }

    }

    CirSim.lastIterTime = lit;
};

//var iterCount = 0;

/** initializes the values of scalefactors for performance reasons */
CirSim.initScaleFactors = function () {
    var numScaleFactors = 200;
    for (var i = 0; i < numScaleFactors; ++i) {
        CirSim.scaleFactors[i] = 0;
    }
};

/** Input array a is a two dimensional array */
CirSim.lu_factor = function (a, n, ipvt) {

    var i = 0;
    var j = 0;
    var k = 0;

    // Divide each row by largest element in that row and remember scale factors
    for (i = 0; i < n; ++i) {
        var largest = 0;

        for (j = 0; j < n; ++j) {
            var x = Math.abs(a[i][j]);
            if (x > largest)
                largest = x;
        }
        // Check for singular matrix:
        if (largest == 0)
            return false;
        CirSim.scaleFactors[i] = 1.0 / largest;
    }

    // Crout's method: Loop through columns first
    for (j = 0; j < n; ++j) {

        // Calculate upper trangular elements for this column:
        for (i = 0; i < j; ++i) {
            var q = a[i][j];

            for (k = 0; k != i; ++k)
                q -= a[i][k] * a[k][j];

            a[i][j] = q;
        }

        // Calculate lower triangular elements for this column
        var largest = 0;
        var largestRow = -1;

        for (i = j; i < n; ++i) {
            var q = a[i][j];

            for (k = 0; k < j; ++k)
                q -= a[i][k] * a[k][j];

            a[i][j] = q;
            var x = Math.abs(q);

            if (x >= largest) {
                largest = x;
                largestRow = i;
            }
        }

        // Pivot
        if (j != largestRow) {
            var x;

            for (var k = 0; k < n; ++k) {
                x = a[largestRow][k];
                a[largestRow][k] = a[j][k];
                a[j][k] = x;
            }
            CirSim.scaleFactors[largestRow] = CirSim.scaleFactors[j];
        }

        // keep track of row interchanges
        ipvt[j] = largestRow;

        // avoid zeros
        if (a[j][j] == 0) {
            //console.log("avoided zero");
            a[j][j] = 1e-18;
        }

        if (j != n - 1) {
            var mult = 1 / a[j][j];
            for (i = j + 1; i != n; ++i)
                a[i][j] *= mult;
        }

    }

    return true;
};

/** Solves the factored matrix */
CirSim.lu_solve = function (a, n, ipvt, b) {
    var i;

    // find first nonzero b element
    for (i = 0; i < n; ++i) {
        var row = ipvt[i];

        var swap = b[row];
        b[row] = b[i];
        b[i] = swap;
        if (swap != 0)
            break;
    }

    var bi = i++;
    for (; i < n; ++i) {
        var row = ipvt[i];
        var j;
        var tot = b[row];

        b[row] = b[i];
        // Forward substitution by using the lower triangular matrix;
        for (j = bi; j < i; ++j)
            tot -= a[i][j] * b[j];
        b[i] = tot;

    }

    for (i = n - 1; i >= 0; i--) {
        var tot = b[i];

        // back-substitution using the upper triangular matrix
        var j;
        for (j = i + 1; j != n; ++j)
            tot -= a[i][j] * b[j];
        b[i] = tot / a[i][i];

    }
};

CirSim.snapGrid = function (x) {
    return (x + CirSim.gridRound) & CirSim.gridMask;
};

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// END: CIRCUIT ANALYSIS CODE
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// CIRCUIT FILE IO
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
CirSim.getSetupList = function (retry) {
    var stack = new Array(6);
    var stackptr = 0;

    // Stack structure to keep track of menu items
    stack[stackptr++] = "root";

    var circuitPresetHTML = "";

    $.get('assets/Faraday/setuplist.txt', function (b) {

        var len = b.length;    // Number of bytes (characters) in the file
        var p;  // Address of current character

//        if (len == 0 || b[0] != '#') {
//            // got a redirect, try again
//            getSetupList(true);
//            return;
//        }

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
            if (line.charAt(0) == '#') {
            }

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
                // Get the location of the title of this menu item
                var i = line.indexOf(' ');

                if (i > 0) {
                    var title = line.substring(i + 1);
                    var first = false;
                    if (line.charAt(0) == '>')
                        first = true;

                    var file = line.substring(first ? 1 : 0, i);
                    var prefix = '';

                    for (var i = 0; i < stackptr; ++i)
                        prefix += '&nbsp';

                    // Append this circuit file to the HTML
                    circuitPresetHTML += prefix + '<a class="circuit_preset_link" id=\"' + file + '\" href="#">' + title + "</a>" + '<br />';
                    console.log(prefix + "Adding: " + title + " setup " + file);

                    if (first && CirSim.startCircuit == null) {
                        CirSim.startCircuit = file;
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
            CirSim.readCircuitFromFile('circuits/' + $(this).attr('id'), false);
        });
    });

};

CirSim.readCircuitFromString = function (b) {
    for (var p = 0; p < b.length;) {

        var l;
        var linelen = 0;
        for (l = 0; l != b.length - p; l++) {
            if (b.charAt(l + p) == '\n' || b.charAt(l + p) == '\r') {
                linelen = l++;
                if (l + p < b.length && b.charAt(l + p) == '\n')
                    l++;
                break;
            }
        }

        var line = b.substring(p, p + linelen);
        var st = line.split(' ');

        while (st.length > 0) {

            var type = st.shift();

            if (type == 'o') {
                var sc = new Scope();
                sc.position = CirSim.scopeCount;
                sc.undump(st);
                CirSim.scopes[CirSim.scopeCount++] = sc;
                break;
            }
            if (type == ('h')) {
                CirSim.readHint(st);
                break;
            }
            if (type == ('$')) {
                CirSim.readOptions(st);
                break;
            }
            if (type == ('%') || type == ('?') || type == ('B')) {
                // ignore filter-specific stuff
                break;
            }

            if (type >= ('0') && type <= ('9'))
                type = parseInt(type);

            var x1 = Math.floor(st.shift());
            var y1 = Math.floor(st.shift());
            var x2 = Math.floor(st.shift());
            var y2 = Math.floor(st.shift());
            var f = Math.floor(st.shift());

            var cls = CirSim.dumpTypes[type];

            if (cls == null) {
                CirSim.error("unrecognized dump type: " + type);
                break;
            }

            // ===================== NEW ELEMENTS ARE INSTANTIATED HERE ============================================
            var ce = CirSim.constructElement(cls, x1, y1, x2, y2, f, st);
            console.log(ce);
            ce.setPoints();
            // =====================================================================================================

            // Add the element to the Element list
            CirSim.elmList.push(ce);
            break;
        }
        p += l;

    }

    var dumpMessage = CirSim.dumpCircuit();

    CirSim.needAnalyze();
    CirSim.handleResize();

    //initCircuit();
    console.log("dump: \n" + dumpMessage);
};

/** Reads a circuit from a string buffer after loaded from from file.
 * Called when the defaultCircuitFile is finished loading*/
CirSim.readCircuitFromFile = function (circuitFileName, retain) {

    var result = $.get(circuitFileName, function (b) {

        if (!retain)
            CirSim.clearAll();

        CirSim.readCircuitFromString(b);

        if (!retain)
            CirSim.handleResize(); // for scopes
    });

};


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// LOCAL UTILITY FUNCTIONS
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

/** Computes the Euclidean distance between two points */
CirSim.distanceSq = function (x1, y1, x2, y2) {
    x2 -= x1;
    y2 -= y1;

    return x2 * x2 + y2 * y2;
};


CirSim.readHint = function (st) {
    if (typeof st == 'string')
        st = st.split(' ');

    CirSim.hintType = st[0];
    CirSim.hintItem1 = st[1];
    CirSim.hintItem2 = st[2];
};

CirSim.readOptions = function (st) {

    var flags = Math.floor(st.shift());

    var flags;
    var sp;

    CirSim.dotsCheckItem = ((flags & 1) != 0);
    CirSim.smallGridCheckItem = ((flags & 2) != 0);
    CirSim.voltsCheckItem = ((flags & 4) == 0);
    CirSim.powerCheckItem = ((flags & 8) == 8);
    CirSim.showValuesCheckItem = ((flags & 16) == 0);

    CirSim.timeStep = Number(st.shift());

    sp = Number(st.shift());
    var sp2 = Math.floor(Math.log(10 * sp) * 24 + 61.5);

    //int sp2 = (int) (Math.log(sp)*24+1.5);
    CirSim.speedBar = sp2;
    CirSim.currentBar = Math.floor(st.shift());

    var vrange = Number(st.shift());
    CircuitElement.voltageRange = vrange;

    if (powerBar = st.shift())
        CirSim.powerBar = Math.floor(powerBar);

    CirSim.setGrid();
};

// ERRORS AND WARNINGS: //////////////////////////////////////////////////////////////////////
CirSim.errorStack = new Array();
CirSim.warningStack = new Array();


CirSim.error = function (msg) {
    console.log("Error: " + msg);
    CirSim.errorStack.push(msg);
    CirSim.drawError();
};

CirSim.drawError = function () {
    var msg = "";
    for (var i = 0; i < CirSim.errorStack.length; ++i) {
        msg += CirSim.errorStack[i] + '\n';
    }
    console.error("Simulation Error: " + msg);
    // TODO: CANVAS
    //paper.text(150, getCanvasBounds().height - 50, msg).attr('fill', Color.color2HexString(Settings.ERROR_COLOR));
    paper.fillText(msg, 150, getCanvasBounds().height - 50);
};

CirSim.warning = function (msg) {
    console.log("Warning: " + msg);
    CirSim.warningStack.push(msg);
    CirSim.drawWarning();
};

CirSim.drawWarning = function () {
    var msg = "";
    for (var i = 0; i < CirSim.warningStack.length; ++i) {
        msg += CirSim.warningStack[i] + '\n';
    }
    //paper.text(150, getCanvasBounds().height - 70, msg).attr('fill', Color.color2HexString(Settings.WARNING_COLOR));
    paper.fillText(msg, 150, getCanvasBounds().height - 70);
};