/** *********************************************************************************
 * CirSim: Core circuit computation and node management
 *
 * 2012
 */



// User drag coordinates for selection
Circuit.dragX = 0;
Circuit.dragY = 0;
Circuit.initDragX = 0;
Circuit.initDragY = 0;

Circuit.selectedArea = new Rectangle(-1, -1, -1, -1);

Circuit.gridSize = 10;
Circuit.gridMask = 10;
Circuit.gridRound = 10;

Circuit.dragging = false;    // True if a circuit element (or elements) are being dragged)
Circuit.analyzeFlag = true;     // Flag indicating if the circuit needs to be reanalyzed (only true when the circuit has changed)
Circuit.dumpMatrix = false;


Circuit.t = 0;       // Simulation time (in seconds)
Circuit.pause = 10;

// User interaction state variables
Circuit.MODE_ADD_ELM = 0;
Circuit.MODE_DRAG_ALL = 1;
Circuit.MODE_DRAG_ROW = 2;
Circuit.MODE_DRAG_COLUMN = 3;
Circuit.MODE_DRAG_SELECTED = 4;
Circuit.MODE_DRAG_POST = 5;
Circuit.MODE_SELECT = 6;

Circuit.mouseMode = Circuit.MODE_SELECT;
Circuit.tempMouseMode = Circuit.MODE_SELECT;
Circuit.mouseModeStr = "Select";

Circuit.infoWidth = 120;

Circuit.menuScope = -1;
Circuit.hintType = -1;
Circuit.hintItem1 = -1;
Circuit.hintItem2 = -1;
Circuit.stopMessage = 0;

// Variables to store states and optimize rendering of circuit elements
Circuit.HINT_LC = 1;
Circuit.HINT_RC = 2;
Circuit.HINT_3DB_C = 3;
Circuit.HINT_TWINT = 4;
Circuit.HINT_3DB_L = 5;


Circuit.setupList = [];

// Simulation state variables ///////////////////////
Circuit.stoppedCheck = false;
Circuit.showPowerCheck = false;
Circuit.showValuesCheckItem = false;
Circuit.powerCheckItem = false;
Circuit.voltsCheckItem = true;
Circuit.dotsCheckItem = true;
Circuit.printableCheckItem = false;
Circuit.conventionCheckItem = true;
Circuit.speedBar = 90;
Circuit.currentBar = 40;
Circuit.smallGridCheckItem = false;
Circuit.powerBar = 'PowerBarNeedsToBeImplemented';

Circuit.timeStep = 1e-6;
Circuit.converged = true;
Circuit.subIterations = 5000;
////////////////////////////////////////////////////

Circuit.dragElm = null;     // Element currently being dragged by the mouse
Circuit.menuElm = null;
Circuit.mouseElm = null;     // Element the mouse is hovering over
Circuit.stopElm = null;     // Element that caused an error

Circuit.mousePost = -1;       // Index of post
Circuit.draggingPost = 0;        // Index of post being dragged
Circuit.plotXElm = null;     // Element being plotted
Circuit.plotYElm = null;
Circuit.heldSwitchElm;

// Todo: Scopes not yet fully implemented
Circuit.Scopes = [];   // Array of active scopes
Circuit.scopeCount = 0;
Circuit.scopeSelected = -1;
Circuit.scopeColCount = [];

Circuit.muString = "u";
Circuit.ohmString = "ohm";

Circuit.root

Circuit.elementList = [];
Circuit.nodeList = [];
Circuit.voltageSources = [];

// Circuit data Arrays: //////////////////////////////////////////////////////////
Circuit.circuitMatrix = [];     // Two dimensional floating point array, representing data nodes of circuit
Circuit.circuitRightSide = [];

Circuit.origMatrix = [];     // Original Circuit
Circuit.origRightSide = [];     // Original right-side Column vector (floating point)

Circuit.circuitRowInfo = [];     // Array of RowInfo Elements
Circuit.circuitPermute = [];     // Array of integers

Circuit.scaleFactors = [];
//////////////////////////////////////////////////////////////////////////////////

Circuit.circuitNonLinear = false;

Circuit.voltageSourceCount = 0;

Circuit.circuitMatrixSize;
Circuit.circuitMatrixFullSize;
Circuit.circuitNeedsMap;

Circuit.editDialog = null;
Circuit.impDialog;

Circuit.clipboard = "";

//CirSim.circuitArea;
Circuit.circuitBottom;

Circuit.undoStack = [];
Circuit.redoStack = [];

Circuit.startCircuit = null;
Circuit.startLabel = null;
Circuit.startCircuitText = null;
Circuit.baseURL = "";

// Simulation tracking variables:
Circuit.lastTime = 0;
Circuit.lastFrameTime = 0;
Circuit.lastIterTime = 0;
Circuit.secTime = 0;
Circuit.frames = 0;
Circuit.steps = 0;
Circuit.framerate = 0;
Circuit.steprate = 0;

Circuit.dumpTypes = [];
Circuit.menuMapping = [];
//= new Dictionary();	// Array of classes

Circuit.useFrame = false;

var date = new Date();

Circuit.addingClass = "null";    // String representing object to be added.
Circuit.elementMap = [];   // Map of each circuit element to its corresponding object

Circuit.NO_MOUSE_BTN = 0;
Circuit.LEFT_MOUSE_BTN = 1;
Circuit.MIDDLE_MOUSE_BTN = 2;
Circuit.RIGHT_MOUSE_BTN = 3;

Circuit.NO_KEY_DOWN = 0;
Circuit.KEY_DELETE = 46;
Circuit.KEY_SHIFT = 16;
Circuit.KEY_CTRL = 17;
Circuit.KEY_ALT = 18;

Circuit.KEY_ESC = 27;

Circuit.keyDown = Circuit.NO_KEY_DOWN;
Circuit.mouseButtonDown = Circuit.NO_MOUSE_BTN;

///////////////////////////////////////////////////////////////////////
// CirSim Constructor: ////////////////////////////////////////////////
function Circuit() {
  console.log("Started simulation");
}
;

/**
 * Initializes
 */
Circuit.init = function () {

  // TODO FINISH IMPLEMENTATION
  Circuit.initScaleFactors();

  CircuitElement.initClass();

  Circuit.needAnalyze();

  /////////////////////////////////////////
  // Set up UI Here:
  /////////////////////////////////////////
  Circuit.dumpTypes = new Array(300);

  Circuit.dumpTypes['o'] = Scope.prototype;
  Circuit.dumpTypes['h'] = Scope.prototype;
  Circuit.dumpTypes['$'] = Scope.prototype;
  Circuit.dumpTypes['%'] = Scope.prototype;
  Circuit.dumpTypes['?'] = Scope.prototype;
  Circuit.dumpTypes['B'] = Scope.prototype;

  //////////////////////////////////////////////////////////////////////
  // Create a hashmap of all our elements:
  //////////////////////////////////////////////////////////////////////
  // Implemented, tested, working (prefixed with +)
  Circuit.elementMap['WireElm'] = '+Wire';
  Circuit.elementMap['ResistorElm'] = '+Resistor';
  Circuit.elementMap['CapacitorElm'] = '+Capacitor';
  Circuit.elementMap['InductorElm'] = '+Inductor';
  Circuit.elementMap['SwitchElm'] = '+Switch';
  Circuit.elementMap['GroundElm'] = '+Ground';
  Circuit.elementMap['VoltageElm'] = '+Voltage Source';

  // Implemented, not tested (prefixed with #)
  Circuit.elementMap['DiodeElm'] = '#Diode';

  // Not implemented (prefixed with -)
  Circuit.elementMap['ACRailElm'] = '-AC Rail';
  Circuit.elementMap['ACVoltageElm'] = '-AC Voltage';
  Circuit.elementMap['ADCElm'] = '-A/D Converter';
  Circuit.elementMap['AnalogSwitchElm'] = '-Analog Switch';
  Circuit.elementMap['AnalogSwitch2Elm'] = '-Analog Switch2';
  Circuit.elementMap['AndGateElm'] = '-AndGateElm';
  Circuit.elementMap['AntennaElm'] = '-Antenna';
  Circuit.elementMap['CC2Elm'] = '-CC2';
  Circuit.elementMap['CC2NegElm'] = '-CC2 Negative';
  Circuit.elementMap['ClockElm'] = '-Clock Generator';
  Circuit.elementMap['CounterElm'] = '-Counter';
  Circuit.elementMap['CurrentElm'] = '-Current Source';

  Circuit.elementMap['DACElm'] = '-D/A Converter';
  Circuit.elementMap['DCVoltageElm'] = '-DC Voltage Src';
  Circuit.elementMap['DecadeElm'] = '-Decade Counter';
  Circuit.elementMap['DFlipFlopElm'] = '-D Flip Flop';
  Circuit.elementMap['DiacElm'] = '-Diac';
  Circuit.elementMap['InverterElm'] = '-InverterElm';
  Circuit.elementMap['JfetElm'] = '-JFET';
  Circuit.elementMap['JKFlipFlopElm'] = '-JK Flip Flop';
  Circuit.elementMap['LampElm'] = '-LampElm';
  Circuit.elementMap['LatchElm'] = '-Latch';
  Circuit.elementMap['LEDElm'] = '-LED';
  Circuit.elementMap['LogicInputElm'] = '-Logic Input';

  Circuit.elementMap['LogicOutputElm'] = '-Logic Output';
  Circuit.elementMap['MemristorElm'] = '-Memristor';
  Circuit.elementMap['MosftetElm'] = '-MOSFET';
  Circuit.elementMap['NandGageElm'] = '-NAND Gate';
  Circuit.elementMap['NJfetElm'] = '-N-type JFET';
  Circuit.elementMap['PJfetElm'] = '-P-type JFET';
  Circuit.elementMap['NMosfetElm'] = '-N-type FET';
  Circuit.elementMap['PMosfetElm'] = '-P-type FET';
  Circuit.elementMap['PotElm'] = '-Potentiometer';
  Circuit.elementMap['ProbeElm'] = '-Probe';
  Circuit.elementMap['PTransistorElm'] = '-P Transistor';
  Circuit.elementMap['NTransistorElm'] = '-N Transistor';
  Circuit.elementMap['PushSwitchElm'] = '-PushSwitch';
  Circuit.elementMap['RailElm'] = '-Voltage Rail';
  Circuit.elementMap['RelayElm'] = '-Relay';
  Circuit.elementMap['SCRElm'] = '-SCR Element';
  Circuit.elementMap['SevenSegElm'] = '-7-Segment LCD';
  Circuit.elementMap['SparkGapElm'] = '-Spark Gap';
  Circuit.elementMap['SquareRailElm'] = '-SquareRail';
  Circuit.elementMap['SweepElm'] = '-Freq. Sweep';
  Circuit.elementMap['Switch2Elm'] = '-Switch 2';
  Circuit.elementMap['TappedTransformerElm'] = '-Tapped Transformer';
  Circuit.elementMap['TextElm'] = '-Text';
  Circuit.elementMap['ThermistorElm'] = '-Thermistor';
  Circuit.elementMap['TimerElm'] = '-Timer';
  Circuit.elementMap['TransformerElm'] = '-Transformer';
  Circuit.elementMap['TransistorElm'] = '-Transistor';
  Circuit.elementMap['TransmissionElm'] = '-Xmission Line';
  Circuit.elementMap['TriacElm'] = '-Triac';
  Circuit.elementMap['TriodeElm'] = '-Triode';
  Circuit.elementMap['TunnelDiodeElm'] = '-TunnelDiode';
  Circuit.elementMap['VarRailElm'] = '-Variable Rail';
  Circuit.elementMap['VCOElm'] = '-Volt. Cont. Osc.';
  Circuit.elementMap['XORGateElm'] = '-XOR Gate';
  Circuit.elementMap['ZenerElm'] = '-Zener Diode';


  Circuit.setGrid();
  Circuit.registerAll();
  Circuit.elementList = new Array();

  Circuit.setupList = new Array();
  Circuit.undoStack = new Array();
  Circuit.redoStack = new Array();

  Circuit.scopes = new Array(20); // Array of scope objects
  Circuit.scopeColCount = new Array(20); // Array of integers
  Circuit.scopeCount = 0;

  //Circuit.initCircuit(defaultCircuit);

};


/**
 * Components in this method will be registered with the engine so that they can be read from text files
 */
Circuit.registerAll = function () {

  Circuit.register("ResistorElm");
  Circuit.register("CapacitorElm");
  Circuit.register("SwitchElm");
  Circuit.register("Switch2Elm");
  Circuit.register("GroundElm");
  Circuit.register("WireElm");
  Circuit.register("VoltageElm");
  Circuit.register("VarRailElm");
  Circuit.register("RailElm");
  Circuit.register("SweepElm");
  Circuit.register("InductorElm");
  Circuit.register("DiodeElm");
  Circuit.register("MosfetElm");
  Circuit.register("TransistorElm");
  Circuit.register("OpAmpElm");
  Circuit.register("SparkGapElm");
  Circuit.register("OutputElm");

};

/**
 * Working components must be registered with the engine so that they can be read from text files
 */
Circuit.register = function (elmClassName) {

  // TODO test
  try {
    var elm = Circuit.constructElement(elmClassName, 0, 0, 0, 0, 0, null);
    var dumpType = elm.getDumpType();

    var dclass = elmClassName;  //elmClassName.getDumpClass();
    //if (Circuit.dumpTypes[dumpType] == dclass)
    //  return;
    if (Circuit.dumpTypes[dumpType] != null) {
      console.log("Dump type conflict: " + dumpType + " " + Circuit.dumpTypes[dumpType]);
      return;
    }

    Circuit.dumpTypes[dumpType] = elmClassName;
  } catch (e) {
    console.log("Element: " + elmClassName + " Not yet implemented");
  }
};

/**
 * Reads the default parameters for the Simulator from the simulation file. Which is the first line starting with a '$'
 *
 * Parameters: flags, time_step, simulation_speed, current_speed, voltage_range, power_range
 *
 * Example:
 *
 * $ 1 5.0E-6 11.251013186076355 50 5.0 50
 *  */
Circuit.initCircuit = function (defaultCircuit) {

  // Clear and reset circuit elements
  Circuit.clearAll();
  Circuit.undoStack = new Array();

  //readSetupList(false);
  //Circuit.readCircuitFromFile(defaultCircuit + '.txt', false);

};


/**
 * Reads the default parameters for the Simulator from the simulation file. Which is the first line starting with a '$'
 *
 * Parameters: flags, time_step, simulation_speed, current_speed, voltage_range, power_range
 *
 * Example:
 *
 * $ 1 5.0E-6 11.251013186076355 50 5.0 50
 *  */
Circuit.readOptions = function (st) {

  var flags = Math.floor(st.shift());

  var flags;
  var sp;

  Circuit.dotsCheckItem = ((flags & 1) != 0);
  Circuit.smallGridCheckItem = ((flags & 2) != 0);
  Circuit.voltsCheckItem = ((flags & 4) == 0);
  Circuit.powerCheckItem = ((flags & 8) == 8);
  Circuit.showValuesCheckItem = ((flags & 16) == 0);

  Circuit.timeStep = Number(st.shift());

  sp = Number(st.shift());
  //var sp2 = (int) (Math.log(sp)*24+1.5);
  var sp2 = Math.floor(Math.log(10 * sp) * 24 + 61.5);

  Circuit.speedBar = sp2;
  Circuit.currentBar = Math.floor(st.shift());

  var vrange = Number(st.shift());
  CircuitElement.voltageRange = vrange;

  if (powerBar = st.shift())
    Circuit.powerBar = Math.floor(powerBar);

  Circuit.setGrid();
};

/** Retrieves string data from a circuit text file (via AJAX GET) */
Circuit.readCircuitFromFile = function (circuitFileName, retain) {

  var result = $.get(js_asset_path + 'circuits/' + circuitFileName, function (b) {

    if (!retain)
      Circuit.clearAll();

    Circuit.readCircuitFromString(b);

    if (!retain)
      Circuit.handleResize(); // for scopes
  });

};

/** Reads a circuit from a string buffer after loaded from from file.
 * Called when the defaultCircuitFile is finished loading */
Circuit.readCircuitFromString = function (b) {
  Circuit.reset();

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
        sc.position = Circuit.scopeCount;
        sc.undump(st);
        Circuit.scopes[Circuit.scopeCount++] = sc;
        break;
      }
      if (type == ('h')) {
        Circuit.readHint(st);
        break;
      }
      if (type == ('$')) {
        Circuit.readOptions(st);
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

      var cls = Circuit.dumpTypes[type];

      if (cls == null) {
        Circuit.error("unrecognized dump type: " + type);
        break;
      }

      // ===================== NEW ELEMENTS ARE INSTANTIATED HERE ============================================
      var ce = Circuit.constructElement(cls, x1, y1, x2, y2, f, st);
      console.log(ce);
      ce.setPoints();
      // =====================================================================================================

      // Add the element to the Element list
      Circuit.elementList.push(ce);
      break;
    }
    p += l;

  }

  var dumpMessage = Circuit.dumpCircuit();

  Circuit.needAnalyze();
  Circuit.handleResize();

  //initCircuit();
  console.log("dump: \n" + dumpMessage);

};

/** Adds an element from the user interface */
Circuit.addElm = function (elmObjectName) {
  var insertElm = Circuit.constructElement(elmObjectName, 340, 160);

  Circuit.mouseMode = Circuit.MODE_ADD_ELM;
  Circuit.mouseModeStr = insertElm.toString();
  Circuit.addingClass = elmObjectName;

  Circuit.tempMouseMode = Circuit.mouseMode;
};

Circuit.deleteSelected = function () {

  Circuit.pushUndo();
  //CirSim.setMenuSelection();
  Circuit.clipboard = "";
  for (var i = Circuit.elementList.length - 1; i >= 0; i--) {
    var ce = Circuit.getElm(i);
    if (ce.isSelected()) {

      Circuit.clipboard += ce.dump() + "\n";

      // Do cleanup
      ce.destroy();
      Circuit.elementList.splice(i, 1);
    }
  }
  Circuit.enablePaste();
  Circuit.needAnalyze();
};

/**
 * Constructs a new circuit element
 *
 * @param elementObjName  Class name of the circuit element
 * @param xa    first x location
 * @param ya    first y location
 * @param xb    second x location
 * @param yb    second y position
 * @param f     flags
 * @param st    string token containing variable parameters for each object
 * @return {Object}
 */
Circuit.constructElement = function (elementObjName, xa, ya, xb, yb, f, st) {
  // todo: Use elementObj.call(...) instead of eval for security reasons
  try {
    var newElement = eval("new " + elementObjName + "(" + xa + "," + ya + "," + xb + "," + yb + "," + f + "," + 'st' + ");");
  } catch (e) {
    console.log("Couldn't construct element: " + elementObjName + " " + e);
  }

  return newElement;
};


////////////////////////////////////////////////////////
// EVENT HANDLERS
////////////////////////////////////////////////////////

/** TODO: Not yet fully tested */
Circuit.onKeyPressed = function (evt) {

  // Get the number of the pressed key
  Circuit.keyDown = evt.which;

  if (Circuit.keyDown == Circuit.KEY_SHIFT)
    Circuit.warning("Shift key Pressed!" + evt.which);

  if (Circuit.keyDown == Circuit.KEY_CTRL)
    Circuit.warning("Ctrl key Pressed!" + evt.which);

  if (Circuit.keyDown == Circuit.KEY_ALT)
    Circuit.warning("Alt key Pressed!" + evt.which);

  Circuit.warning('Key: ' + Circuit.keyDown);

  console.log("Key Pressed " + Circuit.keyDown);

  // Key 'd'
  if (Circuit.keyDown == 68) {
    console.log('');
    console.log(Circuit.dumpCircuit());
    console.log('');
  }

  //TODO: IMPLEMENT
  if (Circuit.keyDown > ' ' && Circuit.keyDown < 127) {
    var keyCode = Circuit.keyDown;
    var keyChar = String.fromCharCode(keyCode + 32);
    var c = Circuit.dumpTypes[keyChar];

    if (c == null || c == 'Scope')
      return;

    var elm = null;
    elm = Circuit.constructElement(c, 0, 0);
    if (elm == null || !(elm.needsShortcut() && elm.getDumpClass() == c))
      return;

    Circuit.mouseMode = Circuit.MODE_ADD_ELM;
    Circuit.mouseModeStr = c.getName();
    Circuit.addingClass = c;
  }

  if (keyPressed(' ')) {
    Circuit.mouseMode = Circuit.MODE_SELECT;
    Circuit.mouseModeStr = "Select";
  }
  Circuit.tempMouseMode = Circuit.mouseMode;
};

function keyPressed(char) {
  if (char.length > 1) {
    console.log('keypressed is longer than one character');
    return false;
  }

  return ( Circuit.keyDown === char.charCodeAt(0) );
}

/** Key released not used */
Circuit.onKeyReleased = function (evt) {
  Circuit.keyDown = Circuit.NO_KEY_DOWN;
};

Circuit.onMouseDragged = function (evt) {

  // X and Y mouse position
  var x = evt.offsetX;
  var y = evt.offsetY;

  console.log("DRAG: " + evt.offsetX + "  " + evt.offsetY);

  if (Circuit.dragElm != null)
    Circuit.dragElm.drag(x, y);
  var success = true;

  switch (Circuit.tempMouseMode) {
    case Circuit.MODE_DRAG_ALL:
      Circuit.dragAll(Circuit.snapGrid(x), Circuit.snapGrid(y));
      break;
    case Circuit.MODE_DRAG_ROW:
      Circuit.dragRow(Circuit.snapGrid(x), Circuit.snapGrid(y));
      break;
    case Circuit.MODE_DRAG_COLUMN:
      Circuit.dragColumn(Circuit.snapGrid(x), Circuit.snapGrid(y));
      break;
    case Circuit.MODE_DRAG_POST:
      if (Circuit.mouseElm != null)
        Circuit.dragPost(Circuit.snapGrid(x), Circuit.snapGrid(y));
      break;
    case Circuit.MODE_SELECT:
      if (Circuit.mouseElm == null)
        Circuit.selectArea(x, y);
      else {
        Circuit.tempMouseMode = Circuit.MODE_DRAG_SELECTED;
        success = Circuit.dragSelected(x, y);
      }
      break;
    case Circuit.MODE_DRAG_SELECTED:
      success = Circuit.dragSelected(x, y);
      break;
  }

  Circuit.dragging = true;

  if (success) {
    if (Circuit.tempMouseMode == Circuit.MODE_DRAG_SELECTED && Circuit.mouseElm instanceof TextElm) {
      Circuit.dragX = x;
      Circuit.dragY = y;
    } else {
      Circuit.dragX = Circuit.snapGrid(x);
      Circuit.dragY = Circuit.snapGrid(y);
    }
  }
  //root.repaint();
};

Circuit.dragAll = function (x, y) {
  var dx = x - Circuit.dragX;
  var dy = y - Circuit.dragY;
  if (dx == 0 && dy == 0)
    return;
  var i;
  for (i = 0; i != Circuit.elementList.length; i++) {
    var ce = Circuit.getElm(i);
    ce.move(dx, dy);
  }
  Circuit.removeZeroLengthElements();
};

Circuit.dragRow = function (x, y) {
  var dy = y - Circuit.dragY;
  if (dy == 0)
    return;
  var i;
  for (i = 0; i != Circuit.elementList.length; i++) {
    var ce = Circuit.getElm(i);
    if (ce.y == Circuit.dragY)
      ce.movePoint(0, 0, dy);
    if (ce.y2 == Circuit.dragY)
      ce.movePoint(1, 0, dy);
  }
  Circuit.removeZeroLengthElements();
};


Circuit.onMouseMove = function (evt) {

  // X and Y mouse position
  var x = evt.offsetX;
  var y = evt.offsetY;

  // If the mouse is down
  if (Circuit.mouseButtonDown != 0) {
    Circuit.onMouseDragged(evt);
    return;
  }

  Circuit.dragX = Circuit.snapGrid(x);
  Circuit.dragY = Circuit.snapGrid(y);

  Circuit.draggingPost = -1;

  var i;
  var origMouse = Circuit.mouseElm;

  Circuit.mouseElm = null;
  Circuit.mousePost = -1;

  Circuit.plotXElm = Circuit.plotYElm = null;
  var bestDist = 1e7;
  var bestArea = 1e7;

  for (i = 0; i != Circuit.elementList.length; i++) {
    var ce = Circuit.getElm(i);
    if (ce.boundingBox.contains(x, y)) {
      var j;
      var area = ce.boundingBox.width * ce.boundingBox.height;
      var jn = ce.getPostCount();
      if (jn > 2)
        jn = 2;
      for (j = 0; j != jn; j++) {
        var pt = ce.getPost(j);
        var distance = Circuit.distanceSq(x, y, pt.x1, pt.y);

        // If multiple elements have overlapping bounding boxes, we prefer selecting elements that have posts
        // close to the mouse pointer and that have a small bounding box area.
        if (distance <= bestDist && area <= bestArea) {
          bestDist = distance;
          bestArea = area;
          Circuit.mouseElm = ce;
        }
      }
      if (ce.getPostCount() == 0)
        Circuit.mouseElm = ce;
    }
  }

  Circuit.scopeSelected = -1;
  if (Circuit.mouseElm == null) {

    for (i = 0; i != Circuit.scopeCount; i++) {
      var s = Circuit.scopes[i];
      if (s.rect.contains(x, y)) {
        s.select();
        Circuit.scopeSelected = i;
      }
    }
    // the mouse pointer was not in any of the bounding boxes, but we might still be close to a post
    for (i = 0; i != Circuit.elementList.length; i++) {
      var ce = Circuit.getElm(i);
      var j;
      var jn = ce.getPostCount();
      for (j = 0; j != jn; j++) {
        var pt = ce.getPost(j);

        var distance = Circuit.distanceSq(x, y, pt.x1, pt.y);
        if (Circuit.distanceSq(pt.x1, pt.y, x, y) < 26) {
          Circuit.mouseElm = ce;
          Circuit.mousePost = j;
          break;
        }
      }
    }
  } else {
    Circuit.mousePost = -1;
    // look for post close to the mouse pointer
    for (i = 0; i != Circuit.mouseElm.getPostCount(); i++) {
      var pt = Circuit.mouseElm.getPost(i);
      if (Circuit.distanceSq(pt.x1, pt.y, x, y) < 26)
        Circuit.mousePost = i;
    }
  }
  //if (CircuitSimulator.mouseElm != origMouse)
  //	this.repaint();
};

Circuit.onMouseClicked = function (evt) {
  console.log("CLICK: " + evt.offsetX + "  " + evt.offsetY);

  if (evt.button == Circuit.LEFT_MOUSE_BTN) {
    if (Circuit.mouseMode == Circuit.MODE_SELECT || Circuit.mouseMode == Circuit.MODE_DRAG_SELECTED)
      Circuit.clearSelection();
  }
};

Circuit.onMouseEntered = function (evt) {
  // TODO: IMPLEMENT
};

Circuit.onMouseExited = function (evt) {
  // TODO: IMPLEMENT
  Circuit.scopeSelected = -1;
  Circuit.mouseElm = Circuit.plotXElm = Circuit.plotYElm = null;

};

Circuit.onMousePressed = function (evt) {
  //TODO: IMPLEMENT right mouse
//    var ex = evt.getModifiersEx();
//
//    if ((ex & (MouseEvent.META_DOWN_MASK |
//        MouseEvent.SHIFT_DOWN_MASK)) == 0 && e.isPopupTrigger()) {
//        doPopupMenu(e);
//        return;
//    }

  Circuit.mouseButtonDown = evt.which;

  // X and Y mouse position
  var x = evt.offsetX;
  var y = evt.offsetY;

  if (Circuit.mouseButtonDown == Circuit.LEFT_MOUSE_BTN) {
    //left mouse
    Circuit.tempMouseMode = Circuit.mouseMode;
    if ((Circuit.keyDown == Circuit.KEY_ALT))
      Circuit.tempMouseMode = Circuit.MODE_DRAG_ALL;
    else if ((Circuit.keyDown == Circuit.KEY_ALT) && (Circuit.keyDown == Circuit.KEY_SHIFT))
      Circuit.tempMouseMode = Circuit.MODE_DRAG_ROW;
    else if (Circuit.keyDown == Circuit.KEY_SHIFT)
      Circuit.tempMouseMode = Circuit.MODE_SELECT;
    else if (Circuit.keyDown == Circuit.KEY_ALT)
      Circuit.tempMouseMode = Circuit.MODE_DRAG_ALL;
    else if (Circuit.keyDown == Circuit.KEY_CTRL)
      Circuit.tempMouseMode = Circuit.MODE_DRAG_POST;
  }
  else if (Circuit.mouseButtonDown == Circuit.RIGHT_MOUSE_BTN) {
    // right mouse
    if (Circuit.keyDown == Circuit.KEY_SHIFT)
      Circuit.tempMouseMode = Circuit.MODE_DRAG_ROW;
    else if (Circuit.keyDown == Circuit.KEY_CTRL)
      Circuit.tempMouseMode = Circuit.MODE_DRAG_COLUMN;
    else
      return;
  }

  if (Circuit.tempMouseMode != Circuit.MODE_SELECT && Circuit.tempMouseMode != Circuit.MODE_DRAG_SELECTED)
    Circuit.clearSelection();

  if (Circuit.doSwitch())
    return;

  //pushUndo();

  Circuit.initDragX = x;
  Circuit.initDragY = y;
  Circuit.dragging = true;

  if (Circuit.tempMouseMode != Circuit.MODE_ADD_ELM || !Circuit.addingClass)
    return;

  var x0 = Circuit.snapGrid(x);
  var y0 = Circuit.snapGrid(y);

  Circuit.dragElm = Circuit.constructElement(Circuit.addingClass, x0, y0);
};

Circuit.onMouseReleased = function (evt) {
  //TODO: test
//    int ex = e.getModifiersEx();

//    if ((ex & (MouseEvent.SHIFT_DOWN_MASK | MouseEvent.CTRL_DOWN_MASK |
//        MouseEvent.META_DOWN_MASK)) == 0 && e.isPopupTrigger()) {
//        doPopupMenu(e);
//        return;
//    }

  Circuit.mouseButtonDown = Circuit.NO_MOUSE_BTN;

  Circuit.tempMouseMode = Circuit.mouseMode;
  Circuit.selectedArea = null;
  Circuit.dragging = false;
  var circuitChanged = false;

  if (Circuit.heldSwitchElm) {
    Circuit.heldSwitchElm.mouseUp();
    Circuit.heldSwitchElm = null;
    circuitChanged = true;
  }

  if (Circuit.dragElm != null) {
    // if the element is zero size then don't create it
    if (Circuit.dragElm.x1 == Circuit.dragElm.x2 && Circuit.dragElm.y == Circuit.dragElm.y2)
      Circuit.dragElm.destroy();
    else {
      Circuit.elementList.push(Circuit.dragElm);
      circuitChanged = true;
    }
    Circuit.dragElm = null;
  }

  for (var i = 0; i < Circuit.elementList.length; ++i) {
    var ce = Circuit.elementList[i];

    if (ce.isSelected()) {
      Circuit.doEdit(ce);
    }
  }

  if (circuitChanged)
    Circuit.needAnalyze();
  if (Circuit.dragElm != null)
    Circuit.dragElm.destroy();

  Circuit.dragElm = null;
  //root.repaint();
};


Circuit.resetSelection = function () {
  Circuit.mouseMode = Circuit.MODE_SELECT;
  Circuit.mouseModeStr = "Select";

  Circuit.tempMouseMode = Circuit.mouseMode;
};

Circuit.dragColumn = function (x, y) {
  //TODO: test
  var dx = x - Circuit.dragX;
  if (dx == 0)
    return;
  var i;
  for (i = 0; i != Circuit.elementList.length; i++) {
    var ce = Circuit.getElm(i);
    if (ce.x1 == Circuit.dragX)
      ce.movePoint(0, dx, 0);
    if (ce.x2 == Circuit.dragX)
      ce.movePoint(1, dx, 0);
  }
  Circuit.removeZeroLengthElements();
};

Circuit.dragSelected = function (x, y) {
  //TODO: test
  var me = false;
  if (Circuit.mouseElm != null && !Circuit.mouseElm.isSelected())
    Circuit.mouseElm.setSelected(me = true);

  // snap grid, unless we're only dragging text elements
  var i;
  for (i = 0; i != Circuit.elementList.length; i++) {
    var ce = Circuit.getElm(i);
    if (ce.isSelected() && !(ce instanceof TextElm))
      break;
  }
  if (i != Circuit.elementList.length) {
    x = Circuit.snapGrid(x);
    y = Circuit.snapGrid(y);
  }

  var dx = x - Circuit.dragX;
  var dy = y - Circuit.dragY;
  if (dx == 0 && dy == 0) {
    // don't leave mouseElm selected if we selected it above
    if (me)
      Circuit.mouseElm.setSelected(false);
    return false;
  }
  var allowed = true;

  // check if moves are allowed
  for (i = 0; allowed && i != Circuit.elementList.length; i++) {
    var ce = Circuit.getElm(i);
    if (ce.isSelected() && !ce.allowMove(dx, dy))
      allowed = false;
  }

  if (allowed) {
    for (i = 0; i < Circuit.elementList.length; i++) {
      var ce = Circuit.getElm(i);
      if (ce.isSelected())
        ce.move(dx, dy);
    }
    Circuit.needAnalyze();
  }

  // don't leave mouseElm selected if we selected it above
  if (me)
    Circuit.mouseElm.setSelected(false);

  return allowed;
};

Circuit.dragPost = function (x, y) {
  // TODO: test
  if (Circuit.draggingPost == -1) {
    Circuit.draggingPost =
      (Circuit.distanceSq(Circuit.mouseElm.x1, Circuit.mouseElm.y, x, y) >
        Circuit.distanceSq(Circuit.mouseElm.x2, Circuit.mouseElm.y2, x, y)) ? 1 : 0;
  }
  var dx = x - Circuit.dragX;
  var dy = y - Circuit.dragY;
  if (dx == 0 && dy == 0)
    return;

  Circuit.mouseElm.movePoint(Circuit.draggingPost, dx, dy);
  Circuit.needAnalyze();
};

Circuit.unstackScope = function (s) {
  if (s == 0) {
    if (Circuit.scopeCount < 2)
      return;
    s = 1;
  }
  if (Circuit.scopes[s].position != Circuit.scopes[s - 1].position)
    return;
  for (; s < Circuit.scopeCount; s++)
    Circuit.scopes[s].position++;
};

Circuit.stackAll = function () {
  var i;
  for (i = 0; i != Circuit.scopeCount; i++) {
    Circuit.scopes[i].position = 0;
    Circuit.scopes[i].showMax = Circuit.scopes[i].showMin = false;
  }
};

Circuit.unstackAll = function () {
  var i;
  for (i = 0; i != Circuit.scopeCount; i++) {
    Circuit.scopes[i].position = i;
    Circuit.scopes[i].showMax = true;
  }
};

Circuit.doEdit = function (target) {
  //CirSim.clearSelection();

  Circuit.pushUndo();

  //if(CirSim.editDialog) {
  //CirSim.editDialog.setVisible(false);
  //CirSim.editDialog = null;
  //}

  Circuit.editDialog = new EditDialog(target);
  //CirSim.editDialog.show();

};

Circuit.dumpCircuit = function () {
  var i;

  var f = (Circuit.dotsCheckItem) ? 1 : 0;
  f |= (Circuit.smallGridCheckItem) ? 2 : 0;
  f |= (Circuit.voltsCheckItem) ? 0 : 4;
  f |= (Circuit.powerCheckItem) ? 8 : 0;
  f |= (Circuit.showValuesCheckItem) ? 0 : 16;

  // 32 = linear scale in a filter
  var dump = "$ " + f + " " + Circuit.timeStep + " " + Circuit.getIterCount() + " " + Circuit.currentBar + " " + CircuitElement.voltageRange + " " + Circuit.powerBar + "\n";

  for (i = 0; i != Circuit.elementList.length; i++)
    dump += Circuit.getElm(i).dump() + "\n";

  // TODO: Implement scope
  for (i = 0; i != Circuit.scopeCount; i++) {
    var d = Circuit.scopes[i].dump();
    if (d != null)
      dump += d + "\n";
  }

  if (Circuit.hintType != -1)
    dump += "h " + Circuit.hintType + " " + Circuit.hintItem1 + " " + Circuit.hintItem2 + "\n";

  return dump;
};

Circuit.selectArea = function (x, y) {
  var x1 = Math.min(x, Circuit.initDragX);
  var x2 = Math.max(x, Circuit.initDragX);
  var y1 = Math.min(y, Circuit.initDragY);
  var y2 = Math.max(y, Circuit.initDragY);
  Circuit.selectedArea = new Rectangle(x1, y1, x2 - x1, y2 - y1);
  var i;
  for (i = 0; i != Circuit.elementList.length; i++) {
    var ce = Circuit.getElm(i);
    ce.selectRect(Circuit.selectedArea);
  }
};

Circuit.removeZeroLengthElements = function () {
  var i;
  var changed = false;
  for (i = Circuit.elementList.length - 1; i >= 0; i--) {
    var ce = Circuit.getElm(i);
    if (ce.x1 == ce.x2 && ce.y == ce.y2) {
      // TODO: Make sure this works
      Circuit.elementList.splice(i, 1);
      ce.destroy();
      changed = true;
    }
  }
  Circuit.needAnalyze();
};

Circuit.pushUndo = function () {
  Circuit.redoStack = new Array();
  var s = Circuit.dumpCircuit();

  if (Circuit.undoStack.length > 0 && s === Circuit.undoStack[Circuit.undoStack.length - 1])
    return;

  Circuit.undoStack.push(s);
  Circuit.enableUndoRedo();
};

Circuit.doUndo = function () {
  if (Circuit.undoStack.length == 0)
    return;

  Circuit.redoStack.push(Circuit.dumpCircuit());
  var s = Circuit.undoStack.remove(Circuit.undoStack.size() - 1);
  //CirSim.readSetup(s);
  Circuit.readCircuitFromString(s);
  Circuit.enableUndoRedo();
};

// TODO: Test
Circuit.doRedo = function () {
  if (Circuit.redoStack.size() == 0)
    return;
  Circuit.undoStack.add(Circuit.dumpCircuit());
  var s = Circuit.redoStack.remove(Circuit.redoStack.size() - 1);

  Circuit.readCircuitFromString(s);
  Circuit.enableUndoRedo();
};

Circuit.enableUndoRedo = function () {
  //CirSim.redoMenuItem.setEnabled(CirSim.redoStack.size() > 0);
  //CirSim.undoMenuItem.setEnabled(CirSim.undoStack.size() > 0);
};

Circuit.setMenuSelection = function () {
  if (Circuit.menuElm != null) {
    if (Circuit.menuElm.selected)
      return;
    Circuit.clearSelection();
    Circuit.menuElm.setSelected(true);
  }
};


/** TODO: NOT YET IMPLEMENTED */
Circuit.doCut = function () {
  var i;
  Circuit.pushUndo();
  //setMenuSelection();
  Circuit.clipboard = "";

  for (i = Circuit.elementList.length - 1; i >= 0; i--) {
    var ce = Circuit.getElm(i);
    if (ce.isSelected()) {
      Circuit.clipboard += ce.dump() + "\n";
      ce.destroy();
      Circuit.elementList.removeElementAt(i);
    }
  }

  Circuit.enablePaste();
  Circuit.needAnalyze();
};

/** TODO: NOT YET IMPLEMENTED */
Circuit.doCopy = function () {
  var i;
  Circuit.clipboard = "";
  //setMenuSelection();
  for (i = Circuit.elementList.length - 1; i >= 0; i--) {
    var ce = Circuit.getElm(i);
    if (ce.isSelected())
      Circuit.clipboard += ce.dump() + "\n";
  }
  Circuit.enablePaste();
};

/**
 * Removes all circuit elements and scopes from the workspace and resets time to zero.
 * */
Circuit.clearAll = function () {

  // reset the interface
  for (var i = 0; i < Circuit.elementList.length; i++) {
    var ce = Circuit.getElm(i);
    ce.destroy();
  }

  Circuit.elementList = [];
  Circuit.hintType = -1;
  Circuit.timeStep = 5e-6;

  Circuit.dotsCheckItem = true;
  Circuit.smallGridCheckItem = false;
  Circuit.powerCheckItem = false;
  Circuit.voltsCheckItem = true;
  Circuit.showValuesCheckItem = true;
  Circuit.setGrid();
  Circuit.speedBar = 117; // 57
  Circuit.currentBar = 100;
  Circuit.powerBar = 50;
  CircuitElement.voltageRange = 5;
  Circuit.scopeCount = 0;

  Circuit.errorStack = new Array();
  Circuit.warningStack = new Array();
};

/**
 * Clears current states, graphs, and errors then Restarts the circuit from time zero.
 * */
Circuit.reset = function () {

  for (var i = 0; i < Circuit.elementList.length; i++)
    Circuit.getElm(i).reset();
  for (i = 0; i != Circuit.scopeCount; i++)
    Circuit.scopes[i].resetGraph();

  Circuit.stopMessage = "";
  Circuit.analyzeFlag = true;
  Circuit.t = 0;
  Circuit.stoppedCheck = false;

  //cv.repaint();
};

/**
 * Stops the circuit when an error occurs
 * */
Circuit.halt = function (s, ce) {
  Circuit.stopMessage = s;
  Circuit.stopElm = ce;
  //Circuit.circuitMatrix = null;
  //Circuit.stoppedCheck = true;
  Circuit.analyzeFlag = true;

  Circuit.error("[FATAL] " + s);
  Circuit.error("\n[SOURCE] " + ce);
};


/** Returns the y position of the bottom of the circuit */
Circuit.calcCircuitBottom = function () {
  var i;
  Circuit.circuitBottom = 0;
  for (i = 0; i != Circuit.elementList.length; i++) {
    var rect = Circuit.getElm(i).boundingBox;
    var bottom = rect.height + rect.y;
    if (bottom > Circuit.circuitBottom)
      Circuit.circuitBottom = bottom;
  }
};

/**
 * Deletes a circuit element
 * */
// TODO: Test!
Circuit.doDelete = function () {
  var i;
  Circuit.pushUndo();
  Circuit.setMenuSelection();
  for (i = Circuit.elementList.length - 1; i >= 0; i--) {
    var ce = Circuit.getElm(i);
    if (ce.isSelected()) {
      ce.destroy();
      Circuit.elementList.splice(i, 1)
    }
  }
  Circuit.needAnalyze();
};

Circuit.enablePaste = function () {
  //pasteMenuItem.setEnabled(CirSim.clipboard.length() > 0);
  // TODO: NOT YET IMPLEMENTED
};

/** Not yet ported */
Circuit.doPaste = function () {
  // TODO: NOT YET IMPLEMENTED
};

Circuit.clearSelection = function () {
  var i;
  for (i = 0; i != Circuit.elementList.length; i++) {
    var ce = Circuit.getElm(i);
    ce.setSelected(false);
  }
};

Circuit.doSelectAll = function () {
  var i;
  for (i = 0; i != Circuit.elementList.length; i++) {
    var ce = Circuit.getElm(i);
    ce.setSelected(true);
  }
};

Circuit.setGrid = function () {
  Circuit.gridSize = (Circuit.smallGridCheckItem) ? 8 : 16;
  Circuit.gridMask = ~(Circuit.gridSize - 1);
  Circuit.gridRound = Circuit.gridSize / 2 - 1;
};

Circuit.drawGrid = function () {

  var CanvasBounds = getCanvasBounds();

  var numCols = (CanvasBounds.width / Circuit.gridSize);
  var numRows = (CanvasBounds.height / Circuit.gridSize);

  // Draw cols:
  for (var i = 0; i < numCols; i++) {
    for (var j = 0; j < numRows; ++j) {
//            paper.rect(CirSim.gridSize * i, CirSim.gridSize * j, 1, 1).attr({
//                'stroke':Color.color2HexString(Color.DEEP_YELLOW),
//                'stroke-width':.2
//            });
    }
  }

};

Circuit.handleResize = function () {
  //TODO: Probably not needed.
  Circuit.needAnalyze();
  Circuit.circuitBottom = 0;
};

Circuit.destroyFrame = function () {
  //TODO: Probably not needed.
};


Circuit.snapGrid = function (x) {
  return (x + Circuit.gridRound) & Circuit.gridMask;
};

Circuit.toggleSwitch = function (n) {
  var i;
  for (i = 0; i != Circuit.elementList.length; i++) {
    var ce = Circuit.getElm(i);
    if (ce instanceof SwitchElm) {
      n--;
      if (n == 0) {
        (ce).toggle();
        Circuit.analyzeFlag = true;
        //cv.repaint();
        return;
      }
    }
  }
};

Circuit.doSwitch = function (x, y) {
  if (Circuit.mouseElm == null || !(Circuit.mouseElm instanceof SwitchElm || Circuit.mouseElm instanceof Switch2Elm))
    return false;

  var se = Circuit.mouseElm; // as SwitchElm;
  se.toggle();

  if (se.momentary)
    Circuit.heldSwitchElm = se;

  Circuit.needAnalyze();
  return true;
};

Circuit.getIterCount = function () {
  if (Circuit.speedBar == 0)
    return 0;
  //return (Math.exp((speedBar.getValue()-1)/24.) + .5);
  return .1 * Math.exp((Circuit.speedBar - 61) / 24.);
};

Circuit.needAnalyze = function () {
  Circuit.analyzeFlag = true;
};

Circuit.getCircuitNode = function (n) {
  if (n >= Circuit.nodeList.length)
    return new CircuitNode();

  return Circuit.nodeList[n];//[n] as CircuitNode;
};

Circuit.getElm = function (n) {
  if (n >= Circuit.elementList.length)
    return null;
  return Circuit.elementList[n]; // as CircuitElement;
};

/**
 * Returns the index of a specified element. -1 is returned if that element is not found
 */
Circuit.locateElm = function (elm) {
  var i;
  for (i = 0; i != Circuit.elementList.length; i++)
    if (elm == Circuit.elementList[i])
      return i;
  return -1;
};

/** Todo: Check if working */
Circuit.getCodeBase = function () {
  return "";
};

/**
 * initializes the values of scalefactors for performance reasons
 * */
Circuit.initScaleFactors = function () {
  var numScaleFactors = 200;
  for (var i = 0; i < numScaleFactors; ++i) {
    Circuit.scaleFactors[i] = 0;
  }
};

/**
 * Configures and places all scopes on the stage
 */
Circuit.setupScopes = function () {
  var i;

  // check scopes to make sure the elements still exist, and remove unused scopes/columns
  var pos = -1;
  for (i = 0; i < Circuit.scopeCount; i++) {
    if (Circuit.locateElm(Circuit.scopes[i].elm) < 0)
      Circuit.scopes[i].setElm(null);
    if (Circuit.scopes[i].elm == null) {
      var j;
      for (j = i; j != Circuit.scopeCount; j++)
        Circuit.scopes[j] = Circuit.scopes[j + 1];
      Circuit.scopeCount--;
      i--;
      continue;
    }
    if (Circuit.scopes[i].position > pos + 1)
      Circuit.scopes[i].position = pos + 1;
    pos = Circuit.scopes[i].position;
  }
  while (Circuit.scopeCount > 0 && Circuit.scopes[Circuit.scopeCount - 1].elm == null)
    Circuit.scopeCount--;
  //var h = winSize.height - circuitArea.height;
  var h = 120;

  pos = 0;
  for (i = 0; i != Circuit.scopeCount; i++)
    Circuit.scopeColCount[i] = 0;
  for (i = 0; i != Circuit.scopeCount; i++) {
    pos = Math.max(Circuit.scopes[i].position, pos);
    Circuit.scopeColCount[Circuit.scopes[i].position]++;
  }
  var colct = pos + 1;
  var iw = Circuit.infoWidth;
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
  for (i = 0; i != Circuit.scopeCount; i++) {
    var s = Circuit.scopes[i];
    if (s.position > pos) {
      pos = s.position;
      colh = h / Circuit.scopeColCount[pos];
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


/** control voltage source vs with voltage from n1 to n2 (must also call stampVoltageSource()) */
Circuit.stampVCVS = function (n1, n2, coef, vs) {
  var vn = Circuit.nodeList.length + vs;
  Circuit.stampMatrix(vn, n1, coef);
  Circuit.stampMatrix(vn, n2, -coef);
};

/** stamp independent voltage source #vs, from n1 to n2, amount v */
Circuit.stampVoltageSource = function (n1, n2, vs, v) {
  var vn = Circuit.nodeList.length + vs;
  Circuit.stampMatrix(vn, n1, -1);
  Circuit.stampMatrix(vn, n2, 1);
  Circuit.stampRightSide(vn, v);
  Circuit.stampMatrix(n1, vn, 1);
  Circuit.stampMatrix(n2, vn, -1);
};

Circuit.updateVoltageSource = function (n1, n2, vs, v) {
  var vn = Circuit.nodeList.length + vs;
  Circuit.stampRightSide(vn, v);
};

Circuit.stampResistor = function (n1, n2, r) {
  var r0 = 1 / r;
  if (isNaN(r0) || isInfinite(r0)) {
    Circuit.error("bad resistance");
    var a = 0;
    a /= a;
  }

  Circuit.stampMatrix(n1, n1, r0);
  Circuit.stampMatrix(n2, n2, r0);
  Circuit.stampMatrix(n1, n2, -r0);
  Circuit.stampMatrix(n2, n1, -r0);
};

Circuit.stampConductance = function (n1, n2, r0) {
  Circuit.stampMatrix(n1, n1, r0);
  Circuit.stampMatrix(n2, n2, r0);
  Circuit.stampMatrix(n1, n2, -r0);
  Circuit.stampMatrix(n2, n1, -r0);
};

/** current from cn1 to cn2 is equal to voltage from vn1 to 2, divided by g */
Circuit.stampVCCurrentSource = function (cn1, cn2, vn1, vn2, g) {
  Circuit.stampMatrix(cn1, vn1, g);
  Circuit.stampMatrix(cn2, vn2, g);
  Circuit.stampMatrix(cn1, vn2, -g);
  Circuit.stampMatrix(cn2, vn1, -g);
};

Circuit.stampCurrentSource = function (n1, n2, i) {
  Circuit.stampRightSide(n1, -i);
  Circuit.stampRightSide(n2, i);
};

/** stamp a current source from n1 to n2 depending on current through vs */
Circuit.stampCCCS = function (n1, n2, vs, gain) {
  var vn = Circuit.nodeList.length + vs;
  Circuit.stampMatrix(n1, vn, gain);
  Circuit.stampMatrix(n2, vn, -gain);
};

/** stamp value x in row i, column j, meaning that a voltage change
 of dv in node j will increase the current into node i by x dv.
 (Unless i or j is a voltage source node.) */
Circuit.stampMatrix = function (i, j, x) {
  if (i > 0 && j > 0) {
    console.log("stamping " + i + " " + j + " " + x);
    if (Circuit.circuitNeedsMap) {
      i = Circuit.circuitRowInfo[i - 1].mapRow;
      var ri = Circuit.circuitRowInfo[j - 1];
      console.log("circuit needs map " + i + "  " + ri);
      if (ri.type == RowInfo.ROW_CONST) {
        console.log("Stamping constant " + i + " " + j + " " + x);
        Circuit.circuitRightSide[i] -= x * ri.value;
        return;
      }
      j = ri.mapCol;
    } else {
      i--;
      j--;
    }

    console.log("incrementing value " + x);
    Circuit.circuitMatrix[i][j] += x;
  }
};

/** Stamp value x on the right side of row i, representing an
 independent current source flowing into node i
 */
Circuit.stampRightSide = function (i, x) {
  if (isNaN(x)) {
    console.log("rschanges true " + (i-1));
    if (i > 0)
      Circuit.circuitRowInfo[i - 1].rsChanges = true;
  } else {
    if (i > 0) {
      console.log(" >> stamping rs " + i + " " + x);
      if (Circuit.circuitNeedsMap) {
        i = Circuit.circuitRowInfo[i - 1].mapRow;

      } else
        i--;
      Circuit.circuitRightSide[i] += x;
    }
  }
};

/** Indicate that the values on the left side of row i change in doStep() */
Circuit.stampNonLinear = function (i) {
  if (i > 0)
    Circuit.circuitRowInfo[i - 1].lsChanges = true;
};

Circuit.getHint = function () {

  var c1 = Circuit.getElm(Circuit.hintItem1);
  var c2 = Circuit.getElm(Circuit.hintItem2);

  if (c1 == null || c2 == null)
    return null;
  if (Circuit.hintType == Circuit.HINT_LC) {
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
  if (Circuit.hintType == Circuit.HINT_RC) {
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
  if (Circuit.hintType == Circuit.HINT_3DB_C) {
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
  if (Circuit.hintType == Circuit.HINT_3DB_L) {
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
  if (Circuit.hintType == Circuit.HINT_TWINT) {
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


/* ****************************************************************
 ****************************************************************
 Core simulation
 ****************************************************************
 ****************************************************************/


/**
 * UpdateCircuit: Outermost method in event loops
 *
 * Called once each frame
 */
Circuit.updateCircuit = function () {
  var startTime = (new Date()).getTime();

  // Reset the page:
  paper.clearRect(0, 0, CANVAS.width(), CANVAS.height());

  //CirSim.drawGrid();

  // CircuitElement
  var realMouseElm = Circuit.mouseElm;

  // Render Warning and error messages:
  //CirSim.drawError();
  //CirSim.drawWarning();

  if (Circuit.analyzeFlag) {
    Circuit.analyzeCircuit();
    Circuit.analyzeFlag = false;
  }

  // TODO
//	if(CirSim.editDialog != null && CirSim.editDialog.elm instanceof CircuitElement)
//		CirSim.mouseElm = CirSim.editDialog.elm;
  // as CircuitElement;

  if (Circuit.mouseElm == null)
    Circuit.mouseElm = Circuit.stopElm;

  // TODO: test
  Circuit.setupScopes();

  CircuitElement.selectColor = Settings.SELECT_COLOR;

  if (Circuit.printableCheckItem) {
    CircuitElement.whiteColor = Color.WHITE;
    CircuitElement.lightGrayColor = Color.BLACK;
  } else {
    CircuitElement.whiteColor = Color.WHITE;
    CircuitElement.lightGrayColor = Color.LIGHT_GREY;
  }

  if (!Circuit.stoppedCheck) {
    try {
      Circuit.runCircuit();
    } catch (e) {
      console.log("error in run circuit: " + e.message);
      Circuit.analyzeFlag = true;

      //cv.paint(g);
      return;
    }
  }


  if (!Circuit.stoppedCheck) {

    var sysTime = (new Date()).getTime();
    if (Circuit.lastTime != 0) {
      var inc = Math.floor(sysTime - Circuit.lastTime);
      var c = Circuit.currentBar;     // The value of CirSim number must be carefully set for current to display properly

      //console.log("Frame time: " + inc  + "   #: "  + frames);

      c = Math.exp(c / 3.5 - 14.2);
      CircuitElement.currentMult = 1.7 * inc * c;
      if (!Circuit.conventionCheckItem)
        CircuitElement.currentMult = -CircuitElement.currentMult;

    }
    if (sysTime - Circuit.secTime >= 1000) {
      Circuit.framerate = Circuit.frames;
      Circuit.steprate = Circuit.steps;
      Circuit.frames = 0;
      Circuit.steps = 0;
      Circuit.secTime = sysTime;
    }

    Circuit.lastTime = sysTime;
  } else {
    Circuit.lastTime = 0;
  }

  CircuitElement.powerMult = Math.exp(Circuit.powerBar / 4.762 - 7);

  // Draw each circuit element
  for (var i = 0; i < Circuit.elementList.length; ++i) {
    Circuit.getElm(i).draw();
  }

  // Draw the posts for each circuit
  if (Circuit.tempMouseMode == Circuit.MODE_DRAG_ROW || Circuit.tempMouseMode == Circuit.MODE_DRAG_COLUMN || Circuit.tempMouseMode == Circuit.MODE_DRAG_POST || Circuit.tempMouseMode == Circuit.MODE_DRAG_SELECTED) {

    for (i = 0; i < Circuit.elementList.length; ++i) {
      var ce = Circuit.getElm(i);
      ce.drawPost(ce.x1, ce.y);
      ce.drawPost(ce.x2, ce.y2);
    }

  }

  var badNodes = 0;

  // find bad connections. Nodes not connected to other elements which intersect other elements' bounding boxes
  for (i = 0; i < Circuit.nodeList.length; ++i) {
    var cn = Circuit.getCircuitNode(i);

    if (!cn.intern && cn.links.length == 1) {
      var bb = 0;
      var cn1 = cn.links[0];
      // CircuitNodeLink
      for (var j = 0; j < Circuit.elementList.length; ++j) {
        if (cn1.elm != Circuit.getElm(j) && Circuit.getElm(j).boundingBox.contains(cn.x1, cn.y))
          bb++;
      }
      if (bb > 0) {
        // Outline bad nodes
        paper.circle(cn.x1, cn.y, 2 * Settings.POST_RADIUS).attr({
          'stroke':Color.color2HexString(Color.RED),
          'stroke-dasharray':'--'
        });
        badNodes++;
      }
    }
  }

  if (Circuit.dragElm != null && (Circuit.dragElm.x1 != Circuit.dragElm.x2 || Circuit.dragElm.y != Circuit.dragElm.y2))
    Circuit.dragElm.draw(null);

  var ct = Circuit.scopeCount;

  if (Circuit.stopMessage != null)
    ct = 0;

  // TODO Implement scopes
  //for(i=0; i!=ct; ++i)
  //    CirSim.scopes[i].draw();

  if (Circuit.stopMessage != null) {
    printError(Circuit.stopMessage);
  } else {
    if (Circuit.circuitBottom == 0)
      Circuit.calcCircuitBottom();

    var info = [];
    // Array of messages to be displayed at the bottom of the canvas
    if (Circuit.mouseElm != null) {
      if (Circuit.mousePost == -1)
        Circuit.mouseElm.getInfo(info);
      else
        info[0] = "V = " + CircuitElement.getUnitText(Circuit.mouseElm.getPostVoltage(Circuit.mousePost), "V");
    } else {
      CircuitElement.showFormat.fractionalDigits = 2;
      info[0] = "t = " + CircuitElement.getUnitText(Circuit.t, "s") + "\nf.t.: " + (Circuit.lastTime - Circuit.lastFrameTime) + "\n";
    }
    if (Circuit.hintType != -1) {
      for (i = 0; info[i] != null; ++i) {
      }
      var s = Circuit.getHint();
      if (s == null)
        Circuit.hintType = -1;
      else
        info[i] = s;
    }
    var x = 0;

    // TODO: Implement scopes
    if (ct != 0)
      x = Circuit.scopes[ct - 1].rightEdge() + 20;

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
    ybase = Math.max(ybase, Circuit.circuitBottom);

    // TODO: CANVAS
    for (i = 0; info[i] != null; ++i) {
      paper.fillStyle = Color.color2HexString(Settings.TEXT_COLOR);
      paper.fillText(info[i], x, ybase + 15 * (i + 1));
    }

  }

  // Draw selection outline:
  if (Circuit.selectedArea != null) {
    //paper.strokeStyle = Color.color2HexString(Settings.SELECTION_MARQUEE_COLOR);
    paper.beginPath();
    paper.strokeStyle = Settings.SELECT_COLOR;
    paper.strokeRect(this.selectedArea.x1, this.selectedArea.y, this.selectedArea.width, this.selectedArea.height);
    paper.closePath();
  }

  Circuit.mouseElm = realMouseElm;
  Circuit.frames++;

  var endTime = (new Date()).getTime();

  Circuit.lastFrameTime = Circuit.lastTime;
};


/**
 * Analyzes the node structure of the circuit and builds a matrix representation of the circuit. This is done as a
 * preliminary step prior to computation. However, this is only necessary when the structure of the circuit has
 * been modified in some way
 */
Circuit.analyzeCircuit = function () {

  Circuit.calcCircuitBottom();
  if (Circuit.elementList.length == 0)
    return;

  Circuit.stopMessage = null;
  Circuit.stopElm = null;

  var i;
  var j;

  var vscount = 0; // int

  Circuit.nodeList = [];

  var gotGround = false;
  var gotRail = false;

  var volt = null;	// CircuitElement

  for (i = 0; i < Circuit.elementList.length; ++i) {
    var ce = Circuit.getElm(i); // CircuitElement type

    if (ce instanceof GroundElm) {
      gotGround = true;
      break;
    }
    if (ce instanceof RailElm)
      gotRail = true;
    if (volt == null && ce instanceof VoltageElm)
      volt = ce;
  }

  console.log("Got Ground: gotGround" + gotGround)
  console.log("Got Rail: ")
  console.log("volt: " + volt.toString())

  // If no ground and no rails then voltage element's first terminal instanceof referenced to ground:
  if (!gotGround && volt != null && !gotRail) {
    var cn = new CircuitNode();

    var pt = volt.getPost(0);
    cn.x1 = pt.x1;
    cn.y = pt.y;
    console.log("Adding node to: " + cn.x1 + ", " + cn.y);
    Circuit.nodeList.push(cn);
  } else {
    // Else allocate extra node for ground
    var cn = new CircuitNode();
    cn.x1 = cn.y = -1;
    Circuit.nodeList.push(cn);
  }

  // Allocate nodes and voltage sources
  for (i = 0; i < Circuit.elementList.length; ++i) {
    console.log("Allocating nodes and vsources " + i)
    var ce = Circuit.getElm(i);

    var inodes = ce.getInternalNodeCount();
    var ivs = ce.getVoltageSourceCount();
    var posts = ce.getPostCount();

    // allocate a node for each post and match posts to nodes
    for (j = 0; j != posts; ++j) {
      console.log("Allocating a node for each post " + j)
      var pt = ce.getPost(j);

      var k;
      for (k = 0; k != Circuit.nodeList.length; ++k) {
        var cn = Circuit.getCircuitNode(k);
        if (pt.x1 == cn.x1 && pt.y == cn.y)
          break;
      }

      if (k == Circuit.nodeList.length) {
        var cn = new CircuitNode();
        cn.x1 = pt.x1;
        cn.y = pt.y;
        var cn1 = new CircuitNodeLink();
        cn1.num = j;
        cn1.elm = ce;
        cn.links.push(cn1);
        console.log("Created new link at: " + k)
        ce.setNode(j, Circuit.nodeList.length);
        Circuit.nodeList.push(cn);
      } else {
        var cn1 = new CircuitNodeLink();
        cn1.num = j;
        cn1.elm = ce;
        console.log("getting circuit node " + k + "for j= " + j)
        Circuit.getCircuitNode(k).links.push(cn1);
        ce.setNode(j, k);
        // If it's the ground node, make sure the node voltage instanceof 0, because it may not get set later.
        if (k == 0)
          ce.setNodeVoltage(j, 0);
      }

    }
    for (j = 0; j != inodes; ++j) {
      var cn = new CircuitNode();

      cn.x1 = -1;
      cn.y = -1;
      cn.intern = true;
      console.log("j = " + cn);

      var cn1 = new CircuitNodeLink();
      cn1.num = j + posts;
      cn1.elm = ce;
      cn.links.push(cn1);
      ce.setNode(cn1.num, Circuit.nodeList.length);
      Circuit.nodeList.push(cn);
    }
    vscount += ivs;
  }

  Circuit.voltageSources = new Array(vscount);
  vscount = 0;
  Circuit.circuitNonLinear = false;

  // determine if circuit instanceof nonlinear
  for (i = 0; i != Circuit.elementList.length; ++i) {
    var ce = Circuit.getElm(i);		// circuitElement
    if (ce.nonLinear())
      Circuit.circuitNonLinear = true;
    var ivs = ce.getVoltageSourceCount();
    for (j = 0; j != ivs; ++j) {
      Circuit.voltageSources[vscount] = ce;
      ce.setVoltageSource(j, vscount++);
    }
  }

  Circuit.voltageSourceCount = vscount;
  console.log("voltage source count " + Circuit.voltageSourceCount )

  var matrixSize = Circuit.nodeList.length - 1 + vscount;
  Circuit.circuitMatrix = initializeTwoDArray(matrixSize, matrixSize);
  Circuit.origMatrix = initializeTwoDArray(matrixSize, matrixSize);

  Circuit.circuitRightSide = new Array(matrixSize);
  zeroArray(Circuit.circuitRightSide);

  Circuit.origRightSide = new Array(matrixSize);
  zeroArray(Circuit.origRightSide);

  Circuit.circuitMatrixSize = Circuit.circuitMatrixFullSize = matrixSize;

  Circuit.circuitRowInfo = new Array(matrixSize);
  Circuit.circuitPermute = new Array(matrixSize);
  zeroArray(Circuit.circuitRowInfo);
  zeroArray(Circuit.circuitPermute);

  for (i = 0; i != matrixSize; ++i) {
    var re = Circuit.circuitRowInfo[i];
    console.log(re)
  }
  console.log("");

  for (i = 0; i != matrixSize; ++i) {
    Circuit.circuitRowInfo[i] = new RowInfo();
  }

  Circuit.circuitNeedsMap = false;

  // stamp linear circuit elements
  for (i = 0; i != Circuit.elementList.length; ++i) {
    var ce = Circuit.getElm(i);
    ce.stamp();
  }

  var closure = new Array(Circuit.nodeList.length);
  var changed = true;

  closure[0] = true;

  while (changed) {
    changed = false;
    for (i = 0; i != Circuit.elementList.length; ++i) {
      var ce = Circuit.getElm(i);

      // Loop through all ce's nodes to see if they are connected to other nodes not in closure
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
    for (i = 0; i != Circuit.nodeList.length; ++i) {
      if (!closure[i] && !Circuit.getCircuitNode(i).intern) {
        //Circuit.error("node " + i + " unconnected");
        Circuit.stampResistor(0, i, 1e8);
        closure[i] = true;
        changed = true;
        break;
      }
    }
  }

  for (i = 0; i != Circuit.elementList.length; ++i) {
    var ce = Circuit.getElm(i);

    if (ce instanceof InductorElm) {
      var fpi = new FindPathInfo(FindPathInfo.INDUCT, ce, ce.getNode(1), Circuit.elementList, Circuit.nodeList.length);

      // try findPath with maximum depth of 5, to avoid slowdown
      if (!fpi.findPath(ce.getNode(0), 5) && !fpi.findPath(ce.getNode(0))) {
        console.log(ce.toString() + " no path");
        ce.reset();
      }
    }

    // look for current sources with no current path
    if (ce instanceof CurrentElm) {
      var fpi = new FindPathInfo(FindPathInfo.INDUCT, ce, ce.getNode(1), Circuit.elementList, Circuit.nodeList.length);

      if (!fpi.findPath(ce.getNode(0))) {
        Circuit.halt("No path for current source!", ce);
        return;
      }
    }

    // Look for voltage soure loops:
    if ((ce instanceof VoltageElm && ce.getPostCount() == 2) || ce instanceof WireElm) {
      var fpi = new FindPathInfo(FindPathInfo.VOLTAGE, ce, ce.getNode(1), Circuit.elementList, Circuit.nodeList.length);

      if (fpi.findPath(ce.getNode(0)) == true) {
        Circuit.halt("Voltage source/wire loop with no resistance!", ce);
        return;
      }
    }

    // Look for shorted caps or caps with voltage but no resistance
    if (ce instanceof CapacitorElm) {
      var fpi = new FindPathInfo(FindPathInfo.SHORT, ce, ce.getNode(1), Circuit.elementList, Circuit.nodeList.length);

      if (fpi.findPath(ce.getNode(0))) {
        console.log(ce.toString() + " shorted");
        ce.reset();
      } else {

        fpi = new FindPathInfo(FindPathInfo.CAP_V, ce, ce.getNode(1), Circuit.elementList, Circuit.nodeList.length);
        if (fpi.findPath(ce.getNode(0))) {
          Circuit.halt("Capacitor loop with no resistance!", ce);
          return;
        }

      }
    }

  }

  for (i = 0; i != matrixSize; ++i) {
    var qm = -1;
    var qp = -1;
    var qv = 0;
    var re = Circuit.circuitRowInfo[i];
    //console.log(re)
    if (re.lsChanges || re.dropRow || re.rsChanges) {
      console.log("row info continue");
      continue;
    }

    console.log("iter: " + i)
    var rsadd = 0;

    // look for rows that can be removed
    for (j = 0; j != matrixSize; ++j) {
      var q = Circuit.circuitMatrix[i][j];
      if (Circuit.circuitRowInfo[j].type == RowInfo.ROW_CONST) {
        // Keep a running total of const values that have been removed already
        rsadd -= Circuit.circuitRowInfo[j].value * q;
        console.log("rsadd continue")
        continue;
      }
      if (q == 0) {
        console.log("0 continue " + matrixSize)
        continue;
      } if (qp == -1) {
        qp = j;
        qv = q;
        console.log("matrix continue")
        continue;
      }
      if (qm == -1 && q == -qv) {
        qm = j;
        console.log("qm continue " + q)
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
        Circuit.halt("Matrix error", null);
        return;
      }

      var elt = Circuit.circuitRowInfo[qp];
      console.log("qp is " + qp + "  " + elt.type)
      if (qm == -1) {
        // We found a row with only one nonzero entry, that value instanceof constant
        var k;
        for (k = 0; elt.type == RowInfo.ROW_EQUAL && k < 100; ++k) {
          // Follow the chain
          qp = elt.nodeEq;
          elt = Circuit.circuitRowInfo[qp];
        }
        if (elt.type == RowInfo.ROW_EQUAL) {
          // break equal chains
          console.log("Break equal chain");
          elt.type = RowInfo.ROW_NORMAL;
          continue;
        }
        if (elt.type != RowInfo.ROW_NORMAL) {
          console.log("type already " + elt.type + " for " + qp + "!");
          continue;
        }

        elt.type = RowInfo.ROW_CONST;
        elt.value = (Circuit.circuitRightSide[i] + rsadd) / qv;
        Circuit.circuitRowInfo[i].dropRow = true;
        console.log("rowInfo.value = "  + elt.value + " type = " + elt.type);
        console.log(qp + " * " + qv + " = const " + elt.value);
        i = -1; // start over from scratch
      } else if (Circuit.circuitRightSide[i] + rsadd == 0) {
        console.log("continuing")
        // we found a row with only two nonzero entries, and one
        // instanceof the negative of the other; the values are equal
        if (elt.type != RowInfo.ROW_NORMAL) {
          console.log("swapping");
          var qq = qm;
          qm = qp;
          qp = qq;
          elt = Circuit.circuitRowInfo[qp];
          if (elt.type != RowInfo.ROW_NORMAL) {
            // we should follow the chain here, but this hardly ever happens so it's not worth worrying about
            console.log("swap failed");
            continue;
          }
        }
        elt.type = RowInfo.ROW_EQUAL;
        elt.nodeEq = qm;
        Circuit.circuitRowInfo[i].dropRow = true;
        //console.log(qp + " = " + qm);
      } // end elseif

    } // end if(j==matrixSize)

  } // end for(matrixSize)

  console.log(qp + " = " + qm);

  // find size of new matrix:
  var nn = 0;
  for (i = 0; i != matrixSize; ++i) {
    var elt = Circuit.circuitRowInfo[i];
    console.log("col " + i + " maps to " + elt.mapCol);
    if (elt.type == RowInfo.ROW_NORMAL) {
      elt.mapCol = nn++;
      continue;
    }
    if (elt.type == RowInfo.ROW_EQUAL) {
      var e2 = null;
      // resolve chains of equality; 100 max steps to avoid loops
      for (j = 0; j != 100; j++) {
        e2 = Circuit.circuitRowInfo[elt.nodeEq];
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
    var elt = Circuit.circuitRowInfo[i];
    if (elt.type == RowInfo.ROW_EQUAL) {
      var e2 = Circuit.circuitRowInfo[elt.nodeEq];
      if (e2.type == RowInfo.ROW_CONST) {
        // if something instanceof equal to a const, it's a const
        elt.type = e2.type;
        elt.value = e2.value;
        elt.mapCol = -1;
        console.log(i + " = [late]const " + elt.value);
      } else {
        elt.mapCol = e2.mapCol;
        console.log(i + " maps to: " + e2.mapCol);
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
    var rri = Circuit.circuitRowInfo[i];
    if (rri.dropRow) {
      rri.mapRow = -1;
      continue;
    }
    newrs[ii] = Circuit.circuitRightSide[i];
    rri.mapRow = ii;
    console.log("Row " + i + " maps to " + ii);
    for (j = 0; j != matrixSize; j++) {
      var ri = Circuit.circuitRowInfo[j];
      if (ri.type == RowInfo.ROW_CONST)
        newrs[ii] -= ri.value * Circuit.circuitMatrix[i][j];
      else
        newmatx[ii][ri.mapCol] += Circuit.circuitMatrix[i][j];
    }
    ii++;
  }

  Circuit.circuitMatrix = newmatx;
  Circuit.circuitRightSide = newrs;
  matrixSize = Circuit.circuitMatrixSize = newsize;

  for (i = 0; i != matrixSize; i++)
    Circuit.origRightSide[i] = Circuit.circuitRightSide[i];

  for (i = 0; i != matrixSize; i++)
    for (j = 0; j != matrixSize; j++)
      Circuit.origMatrix[i][j] = Circuit.circuitMatrix[i][j];

  Circuit.circuitNeedsMap = true;

   // For debugging
//   console.log("matrixSize = " + matrixSize + " " + circuitNonLinear);
//   for (j = 0; j != Circuit.circuitMatrixSize; j++) {
//     for (i = 0; i != Circuit.circuitMatrixSize; i++) {
//       console.log(Circuit.circuitMatrix[j][i] + " ");
//       console.log("  " + Circuit.circuitRightSide[j] + "\n");
//     }
//     console.log("\n");
//   }


  // if a matrix instanceof linear, we can do the lu_factor here instead of needing to do it every frame
  if (!Circuit.circuitNonLinear) {
    if (!Circuit.lu_factor(Circuit.circuitMatrix, Circuit.circuitMatrixSize, Circuit.circuitPermute)) {
      Circuit.halt("Singular matrix!", null);
      return;
    } else {
      console.log("success");
    }
  }

};

/**
 * RunCircuit: Called by UpdateCircuit
 *
 *
 * Called once per frame, runs many iterations
 */
Circuit.runCircuit = function () {

  if (Circuit.circuitMatrix == null || Circuit.elementList.length == 0) {
    Circuit.circuitMatrix = null;
    return;
  }

  var iter;
  var debugPrint = Circuit.dumpMatrix;

  Circuit.dumpMatrix = false;

  var steprate = Math.floor(160 * Circuit.getIterCount());

  var tm = (new Date()).getTime();
  var lit = Circuit.lastIterTime;

  // Double-check
  if (1000 >= steprate * (tm - Circuit.lastIterTime)) {
    return;
  }

  // Main iteration
  for (iter = 1; ; ++iter) {

    var i;
    var j;
    var k;
    var subiter;

    // Start Iteration for each element in the circuit
    for (i = 0; i < Circuit.elementList.length; ++i) {
      var ce = Circuit.getElm(i);
      ce.startIteration();
    }

    // Keep track of the number of steps
    ++Circuit.steps;

    // The number of maximum allowable iterations
    var subiterCount = 500;

    // Sub iteration
    for (subiter = 0; subiter != subiterCount; subiter++) {

      Circuit.converged = true;

      Circuit.subIterations = subiter;

      for (i = 0; i < Circuit.circuitMatrixSize; ++i)
        Circuit.circuitRightSide[i] = Circuit.origRightSide[i];
      if (Circuit.circuitNonLinear) {
        for (i = 0; i < Circuit.circuitMatrixSize; ++i)
          for (j = 0; j < Circuit.circuitMatrixSize; ++j)
            Circuit.circuitMatrix[i][j] = Circuit.origMatrix[i][j];
      }

      // Step each element this iteration
      for (i = 0; i < Circuit.elementList.length; ++i) {
        var ce = Circuit.getElm(i);
        ce.doStep();
      }

      if (Circuit.stopMessage != null)
        return;

      var printit = debugPrint;
      debugPrint = false;
      for (j = 0; j < Circuit.circuitMatrixSize; ++j) {
        for (i = 0; i < Circuit.circuitMatrixSize; ++i) {
          var x = Circuit.circuitMatrix[i][j];
          if (isNaN(x) || isInfinite(x)) {
            console.log("Matrix is invalid " + isNaN(x));
            Circuit.halt("Invalid matrix", null);
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

      if (Circuit.circuitNonLinear) {
        if (Circuit.converged && subiter > 0)
          break;

        if (!Circuit.lu_factor(Circuit.circuitMatrix, Circuit.circuitMatrixSize, Circuit.circuitPermute)) {
          Circuit.halt("Singular matrix!", null);
          return;
        }

      }

      Circuit.lu_solve(Circuit.circuitMatrix, Circuit.circuitMatrixSize, Circuit.circuitPermute, Circuit.circuitRightSide);

      for (j = 0; j < Circuit.circuitMatrixFullSize; ++j) {
        var ri = Circuit.circuitRowInfo[j];
        var res = 0;

        if (ri.type == RowInfo.ROW_CONST)
          res = ri.value;
        else
          res = Circuit.circuitRightSide[ri.mapCol];

        if (isNaN(res)) {
          Circuit.converged = false;
          break;
        }

        if (j < (Circuit.nodeList.length - 1)) {

          var cn = Circuit.getCircuitNode(j + 1);
          for (k = 0; k < cn.links.length; ++k) {
            var cn1 = cn.links[k];// as CircuitNodeLink;

            cn1.elm.setNodeVoltage(cn1.num, res);
          }
        } else {
          var ji = j - (Circuit.nodeList.length - 1);
          //console.log("setting vsrc " + ji + " to " + res);
          Circuit.voltageSources[ji].setCurrent(ji, res);
        }

      }

      if (!Circuit.circuitNonLinear)
        break;

    }	// End for

    if (subiter > 5)
      console.log("converged after " + subiter + " iterations");
    if (subiter >= subiterCount) {
      Circuit.halt("Convergence failed: " + subiter, null);
      break;
    }

    Circuit.t += Circuit.timeStep;
    for (i = 0; i < Circuit.scopeCount; ++i)
      Circuit.scopes[i].timeStep();

    tm = (new Date()).getTime();
    lit = tm;

    //console.log("diff: " + (tm-CirSim.lastIterTime) + " iter: " + iter + " ");
    //console.log(iterCount + " breaking from iteration: " + " sr: " + steprate + " iter: " + subiter + " time: " + (tm - CirSim.lastIterTime)+ " lastFrametime: " + CirSim.lastFrameTime );
    //iterCount++;
    if (iter * 1000 >= steprate * (tm - Circuit.lastIterTime)) {
      //console.log("1 breaking from iteration: " + " sr: " + steprate + " iter: " + subiter + " time: " + (tm - CirSim.lastIterTime)+ " lastFrametime: " + CirSim.lastFrameTime );
      break;
    } else if (tm - Circuit.lastFrameTime > 500) {
      //console.log("2 breaking from iteration: " + " sr: " + steprate + " iter: " + iter + " time: " + (tm - CirSim.lastIterTime) + " lastFrametime: " + CirSim.lastFrameTime );
      break;
    }

  }

  Circuit.lastIterTime = lit;
};


/**
 * lu_factor: finds a solution to a factored matrix through LU (Lower-Upper) factorization
 *
 * Called once each frame for resistive circuits, otherwise called many times each frame
 *
 * @param a 2D matrix to be solved
 * @param n dimension
 * @param ipvt pivot index
 */
Circuit.lu_factor = function (a, n, ipvt) {

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
    Circuit.scaleFactors[i] = 1.0 / largest;
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
      Circuit.scaleFactors[largestRow] = Circuit.scaleFactors[j];
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

/**
 * Step 2: lu_solve: Called by lu_factor
 *
 * finds a solution to a factored matrix through LU (Lower-Upper) factorization
 *
 * Called once each frame for resistive circuits, otherwise called many times each frame
 *
 * @param a matrix to be solved
 * @param n dimension
 * @param ipvt pivot index
 * @param b factored matrix
 */
Circuit.lu_solve = function (a, n, ipvt, b) {
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


/** ****************************************************************
 ****************************************************************
 Local Utility function
 ****************************************************************
 ****************************************************************/

Circuit.snapGrid = function (x) {
  return (x + Circuit.gridRound) & Circuit.gridMask;
};

/** Computes the Euclidean distance between two points */
Circuit.distanceSq = function (x1, y1, x2, y2) {
  x2 -= x1;
  y2 -= y1;

  return x2 * x2 + y2 * y2;
};


Circuit.readHint = function (st) {
  if (typeof st == 'string')
    st = st.split(' ');

  Circuit.hintType = st[0];
  Circuit.hintItem1 = st[1];
  Circuit.hintItem2 = st[2];
};

/* ****************************************************************
 ****************************************************************
 Errors and Warnings
 ****************************************************************
 ****************************************************************/
Circuit.errorStack = new Array();
Circuit.warningStack = new Array();


Circuit.error = function (msg) {
  console.log("Error: " + msg);
  Circuit.errorStack.push(msg);
  Circuit.drawError();
};

Circuit.drawError = function () {
  var msg = "";
  for (var i = 0; i < Circuit.errorStack.length; ++i) {
    msg += Circuit.errorStack[i] + '\n';
  }
  console.error("Simulation Error: " + msg);
  // TODO: CANVAS
  //paper.text(150, getCanvasBounds().height - 50, msg).attr('fill', Color.color2HexString(Settings.ERROR_COLOR));
  paper.fillText(msg, 150, getCanvasBounds().height - 50);
};

Circuit.warning = function (msg) {
  console.log("Warning: " + msg);
  Circuit.warningStack.push(msg);
  Circuit.drawWarning();
};

Circuit.drawWarning = function () {
  var msg = "";
  for (var i = 0; i < Circuit.warningStack.length; ++i) {
    msg += Circuit.warningStack[i] + '\n';
  }
  //paper.text(150, getCanvasBounds().height - 70, msg).attr('fill', Color.color2HexString(Settings.WARNING_COLOR));
  paper.fillText(msg, 150, getCanvasBounds().height - 70);
};


