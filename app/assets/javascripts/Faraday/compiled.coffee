###
CirSim: Core circuit computation and node management

2012
###

# User drag coordinates for selection
# True if a circuit element (or elements) are being dragged)
# Flag indicating if the circuit needs to be reanalyzed (only true when the circuit has changed)
# Simulation time (in seconds)

# User interaction state variables

# Variables to store states and optimize rendering of circuit elements

# Simulation state variables ///////////////////////

#//////////////////////////////////////////////////
# Element currently being dragged by the mouse
# Element the mouse is hovering over
# Element that caused an error
# Index of post
# Element being plotted
# Index of post being dragged

# Todo: Scopes not yet fully implemented
# Array of active scopes

# Circuit data Arrays: //////////////////////////////////////////////////////////
# Two dimensional floating point array, representing data nodes of circuit
# Original Circuit
# Original right-side Column vector (floating point)
# Array of RowInfo Elements
# Array of integers

#////////////////////////////////////////////////////////////////////////////////

#CirSim.circuitArea;

# Simulation tracking variables:

#= new Dictionary();	// Array of classes
# String representing object to be added.
# Map of each circuit element to its corresponding object

#/////////////////////////////////////////////////////////////////////
# CirSim Constructor: ////////////////////////////////////////////////
CirSim = ->
  console.log "Started simulation"

###
Initializes
###

# TODO FINISH IMPLEMENTATION

#///////////////////////////////////////
# Set up UI Here:
#///////////////////////////////////////

#////////////////////////////////////////////////////////////////////
# Create a hashmap of all our elements:
#////////////////////////////////////////////////////////////////////
# Implemented, tested, working (prefixed with +)

# Implemented, not tested (prefixed with #)

# Not implemented (prefixed with -)
# Array of scope objects
# Array of integers

###
Components in this method will be registered with the engine so that they can be read from text files
###

###
Working components must be registered with the engine so that they can be read from text files
###

# TODO test
#elmClassName.getDumpClass();

###
Reads the default parameters for the Simulator from the simulation file. Which is the first line starting with a '$'

Parameters: flags, time_step, simulation_speed, current_speed, voltage_range, power_range

Example:

$ 1 5.0E-6 11.251013186076355 50 5.0 50
###

# Clear and reset circuit elements

###
Reads the default parameters for the Simulator from the simulation file. Which is the first line starting with a '$'

Parameters: flags, time_step, simulation_speed, current_speed, voltage_range, power_range

Example:

$ 1 5.0E-6 11.251013186076355 50 5.0 50
###

#var sp2 = (int) (Math.log(sp)*24+1.5);

###
Retrieves string data from a circuit text file (via AJAX GET)
###
# for scopes

###
Reads a circuit from a string buffer after loaded from from file.
Called when the defaultCircuitFile is finished loading
###

# ignore filter-specific stuff

# ===================== NEW ELEMENTS ARE INSTANTIATED HERE ============================================

# =====================================================================================================

# Add the element to the Element list

#initCircuit();

###
Adds an element from the user interface
###

#CirSim.setMenuSelection();

# Do cleanup

###
Constructs a new circuit element

@param elementObjName  Class name of the circuit element
@param xa    first x location
@param ya    first y location
@param xb    second x location
@param yb    second y position
@param f     flags
@param st    string token containing variable parameters for each object
@return {Object}
###

# todo: Use elementObj.call(...) instead of eval for security reasons

#//////////////////////////////////////////////////////
# EVENT HANDLERS
#//////////////////////////////////////////////////////

###
TODO: Not yet fully tested
###

# Get the number of the pressed key

# Key 'd'

#TODO: IMPLEMENT
keyPressed = (char) ->
  if char.length > 1
    console.log "keypressed is longer than one character"
    return false
  CirSim.keyDown is char.charCodeAt(0)
CirSim.mouseMode = CirSim.MODE_SELECT
CirSim.tempMouseMode = CirSim.MODE_SELECT
CirSim.mouseModeStr = "Select"
CirSim.dragX = 0
CirSim.dragY = 0
CirSim.initDragX = 0
CirSim.initDragY = 0
CirSim.selectedArea = new Rectangle(-1, -1, -1, -1)
CirSim.gridSize = 10
CirSim.gridMask = 10
CirSim.gridRound = 10
CirSim.dragging = false
CirSim.analyzeFlag = true
CirSim.dumpMatrix = false
CirSim.t = 0
CirSim.pause = 10
CirSim.MODE_ADD_ELM = 0
CirSim.MODE_DRAG_ALL = 1
CirSim.MODE_DRAG_ROW = 2
CirSim.MODE_DRAG_COLUMN = 3
CirSim.MODE_DRAG_SELECTED = 4
CirSim.MODE_DRAG_POST = 5
CirSim.MODE_SELECT = 6
CirSim.infoWidth = 120
CirSim.menuScope = -1
CirSim.hintType = -1
CirSim.hintItem1 = -1
CirSim.hintItem2 = -1
CirSim.stopMessage = 0
CirSim.HINT_LC = 1
CirSim.HINT_RC = 2
CirSim.HINT_3DB_C = 3
CirSim.HINT_TWINT = 4
CirSim.HINT_3DB_L = 5
CirSim.setupList = []
CirSim.stoppedCheck = false
CirSim.showPowerCheck = false
CirSim.showValuesCheckItem = false
CirSim.powerCheckItem = false
CirSim.voltsCheckItem = true
CirSim.dotsCheckItem = true
CirSim.printableCheckItem = false
CirSim.conventionCheckItem = true
CirSim.speedBar = 90
CirSim.currentBar = 40
CirSim.smallGridCheckItem = false
CirSim.powerBar = "PowerBarNeedsToBeImplemented"
CirSim.timeStep = 1e-6
CirSim.converged = true
CirSim.subIterations = 5000
CirSim.dragElm = null
CirSim.menuElm = null
CirSim.mouseElm = null
CirSim.stopElm = null
CirSim.mousePost = -1
CirSim.plotXElm = null
CirSim.plotYElm = null
CirSim.draggingPost = 0
CirSim.heldSwitchElm
CirSim.Scopes = []
CirSim.scopeCount = 0
CirSim.scopeSelected = -1
CirSim.scopeColCount = []
CirSim.muString = "u"
CirSim.ohmString = "ohm"
CirSim.root
CirSim.elementList = []
CirSim.nodeList = []
CirSim.voltageSources = []
CirSim.circuitMatrix = []
CirSim.circuitRightSide = []
CirSim.origMatrix = []
CirSim.origRightSide = []
CirSim.circuitRowInfo = []
CirSim.circuitPermute = []
CirSim.scaleFactors = []
CirSim.circuitNonLinear = false
CirSim.voltageSourceCount = 0
CirSim.circuitMatrixSize
CirSim.circuitMatrixFullSize
CirSim.circuitNeedsMap
CirSim.editDialog = null
CirSim.impDialog
CirSim.clipboard = ""
CirSim.circuitBottom
CirSim.undoStack = []
CirSim.redoStack = []
CirSim.startCircuit = null
CirSim.startLabel = null
CirSim.startCircuitText = null
CirSim.baseURL = ""
CirSim.lastTime = 0
CirSim.lastFrameTime = 0
CirSim.lastIterTime = 0
CirSim.secTime = 0
CirSim.frames = 0
CirSim.steps = 0
CirSim.framerate = 0
CirSim.steprate = 0
CirSim.dumpTypes = []
CirSim.menuMapping = []
CirSim.useFrame = false
date = new Date()
CirSim.addingClass = "null"
CirSim.elementMap = []
CirSim.NO_MOUSE_BTN = 0
CirSim.LEFT_MOUSE_BTN = 1
CirSim.MIDDLE_MOUSE_BTN = 2
CirSim.RIGHT_MOUSE_BTN = 3
CirSim.NO_KEY_DOWN = 0
CirSim.KEY_DELETE = 46
CirSim.KEY_SHIFT = 16
CirSim.KEY_CTRL = 17
CirSim.KEY_ALT = 18
CirSim.KEY_ESC = 27
CirSim.keyDown = CirSim.NO_KEY_DOWN
CirSim.mouseButtonDown = CirSim.NO_MOUSE_BTN
CirSim.init = (defaultCircuit) ->
  CirSim.initScaleFactors()
  CircuitElement.initClass()
  CirSim.needAnalyze()
  CirSim.dumpTypes = new Array(300)
  CirSim.dumpTypes["o"] = Scope::
  CirSim.dumpTypes["h"] = Scope::
  CirSim.dumpTypes["$"] = Scope::
  CirSim.dumpTypes["%"] = Scope::
  CirSim.dumpTypes["?"] = Scope::
  CirSim.dumpTypes["B"] = Scope::
  CirSim.elementMap["WireElm"] = "+Wire"
  CirSim.elementMap["ResistorElm"] = "+Resistor"
  CirSim.elementMap["CapacitorElm"] = "+Capacitor"
  CirSim.elementMap["InductorElm"] = "+Inductor"
  CirSim.elementMap["SwitchElm"] = "+Switch"
  CirSim.elementMap["GroundElm"] = "+Ground"
  CirSim.elementMap["VoltageElm"] = "+Voltage Source"
  CirSim.elementMap["DiodeElm"] = "#Diode"
  CirSim.elementMap["ACRailElm"] = "-AC Rail"
  CirSim.elementMap["ACVoltageElm"] = "-AC Voltage"
  CirSim.elementMap["ADCElm"] = "-A/D Converter"
  CirSim.elementMap["AnalogSwitchElm"] = "-Analog Switch"
  CirSim.elementMap["AnalogSwitch2Elm"] = "-Analog Switch2"
  CirSim.elementMap["AndGateElm"] = "-AndGateElm"
  CirSim.elementMap["AntennaElm"] = "-Antenna"
  CirSim.elementMap["CC2Elm"] = "-CC2"
  CirSim.elementMap["CC2NegElm"] = "-CC2 Negative"
  CirSim.elementMap["ClockElm"] = "-Clock Generator"
  CirSim.elementMap["CounterElm"] = "-Counter"
  CirSim.elementMap["CurrentElm"] = "-Current Source"
  CirSim.elementMap["DACElm"] = "-D/A Converter"
  CirSim.elementMap["DCVoltageElm"] = "-DC Voltage Src"
  CirSim.elementMap["DecadeElm"] = "-Decade Counter"
  CirSim.elementMap["DFlipFlopElm"] = "-D Flip Flop"
  CirSim.elementMap["DiacElm"] = "-Diac"
  CirSim.elementMap["InverterElm"] = "-InverterElm"
  CirSim.elementMap["JfetElm"] = "-JFET"
  CirSim.elementMap["JKFlipFlopElm"] = "-JK Flip Flop"
  CirSim.elementMap["LampElm"] = "-LampElm"
  CirSim.elementMap["LatchElm"] = "-Latch"
  CirSim.elementMap["LEDElm"] = "-LED"
  CirSim.elementMap["LogicInputElm"] = "-Logic Input"
  CirSim.elementMap["LogicOutputElm"] = "-Logic Output"
  CirSim.elementMap["MemristorElm"] = "-Memristor"
  CirSim.elementMap["MosftetElm"] = "-MOSFET"
  CirSim.elementMap["NandGageElm"] = "-NAND Gate"
  CirSim.elementMap["NJfetElm"] = "-N-type JFET"
  CirSim.elementMap["PJfetElm"] = "-P-type JFET"
  CirSim.elementMap["NMosfetElm"] = "-N-type FET"
  CirSim.elementMap["PMosfetElm"] = "-P-type FET"
  CirSim.elementMap["PotElm"] = "-Potentiometer"
  CirSim.elementMap["ProbeElm"] = "-Probe"
  CirSim.elementMap["PTransistorElm"] = "-P Transistor"
  CirSim.elementMap["NTransistorElm"] = "-N Transistor"
  CirSim.elementMap["PushSwitchElm"] = "-PushSwitch"
  CirSim.elementMap["RailElm"] = "-Voltage Rail"
  CirSim.elementMap["RelayElm"] = "-Relay"
  CirSim.elementMap["SCRElm"] = "-SCR Element"
  CirSim.elementMap["SevenSegElm"] = "-7-Segment LCD"
  CirSim.elementMap["SparkGapElm"] = "-Spark Gap"
  CirSim.elementMap["SquareRailElm"] = "-SquareRail"
  CirSim.elementMap["SweepElm"] = "-Freq. Sweep"
  CirSim.elementMap["Switch2Elm"] = "-Switch 2"
  CirSim.elementMap["TappedTransformerElm"] = "-Tapped Transformer"
  CirSim.elementMap["TextElm"] = "-Text"
  CirSim.elementMap["ThermistorElm"] = "-Thermistor"
  CirSim.elementMap["TimerElm"] = "-Timer"
  CirSim.elementMap["TransformerElm"] = "-Transformer"
  CirSim.elementMap["TransistorElm"] = "-Transistor"
  CirSim.elementMap["TransmissionElm"] = "-Xmission Line"
  CirSim.elementMap["TriacElm"] = "-Triac"
  CirSim.elementMap["TriodeElm"] = "-Triode"
  CirSim.elementMap["TunnelDiodeElm"] = "-TunnelDiode"
  CirSim.elementMap["VarRailElm"] = "-Variable Rail"
  CirSim.elementMap["VCOElm"] = "-Volt. Cont. Osc."
  CirSim.elementMap["XORGateElm"] = "-XOR Gate"
  CirSim.elementMap["ZenerElm"] = "-Zener Diode"
  CirSim.setGrid()
  CirSim.registerAll()
  CirSim.elementList = new Array()
  CirSim.setupList = new Array()
  CirSim.undoStack = new Array()
  CirSim.redoStack = new Array()
  CirSim.scopes = new Array(20)
  CirSim.scopeColCount = new Array(20)
  CirSim.scopeCount = 0
  CirSim.initCircuit defaultCircuit

CirSim.registerAll = ->
  CirSim.register "ResistorElm"
  CirSim.register "CapacitorElm"
  CirSim.register "SwitchElm"
  CirSim.register "Switch2Elm"
  CirSim.register "GroundElm"
  CirSim.register "WireElm"
  CirSim.register "VoltageElm"
  CirSim.register "RailElm"
  CirSim.register "SweepElm"
  CirSim.register "InductorElm"
  CirSim.register "DiodeElm"
  CirSim.register "MosfetElm"
  CirSim.register "TransistorElm"
  CirSim.register "OpAmpElm"
  CirSim.register "SparkGapElm"
  CirSim.register "OutputElm"

CirSim.register = (elmClassName) ->
  try
    elm = CirSim.constructElement(elmClassName, 0, 0, 0, 0, 0, null)
    dumpType = elm.getDumpType()
    dclass = elmClassName
    return  if CirSim.dumpTypes[dumpType] is dclass
    if CirSim.dumpTypes[dumpType]?
      console.log "Dump type conflict: " + dumpType + " " + CirSim.dumpTypes[dumpType]
      return
    CirSim.dumpTypes[dumpType] = elmClassName
  catch e
    console.log "Element: " + elmClassName + " Not yet implemented"

CirSim.initCircuit = (defaultCircuit) ->
  CirSim.clearAll()
  CirSim.undoStack = new Array()
  readSetupList false
  CirSim.readCircuitFromFile defaultCircuit + ".txt", false

CirSim.readOptions = (st) ->
  flags = Math.floor(st.shift())
  flags = undefined
  sp = undefined
  CirSim.dotsCheckItem = ((flags & 1) isnt 0)
  CirSim.smallGridCheckItem = ((flags & 2) isnt 0)
  CirSim.voltsCheckItem = ((flags & 4) is 0)
  CirSim.powerCheckItem = ((flags & 8) is 8)
  CirSim.showValuesCheckItem = ((flags & 16) is 0)
  CirSim.timeStep = Number(st.shift())
  sp = Number(st.shift())
  sp2 = Math.floor(Math.log(10 * sp) * 24 + 61.5)
  CirSim.speedBar = sp2
  CirSim.currentBar = Math.floor(st.shift())
  vrange = Number(st.shift())
  CircuitElement.voltageRange = vrange
  CirSim.powerBar = Math.floor(powerBar)  if powerBar = st.shift()
  CirSim.setGrid()

CirSim.readCircuitFromFile = (circuitFileName, retain) ->
  result = $.get(js_asset_path + "circuits/" + circuitFileName, (b) ->
    CirSim.clearAll()  unless retain
    CirSim.readCircuitFromString b
    CirSim.handleResize()  unless retain
  )

CirSim.readCircuitFromString = (b) ->
  CirSim.reset()
  p = 0

  while p < b.length
    l = undefined
    linelen = 0
    l = 0
    while l isnt b.length - p
      if b.charAt(l + p) is "\n" or b.charAt(l + p) is "\r"
        linelen = l++
        l++  if l + p < b.length and b.charAt(l + p) is "\n"
        break
      l++
    line = b.substring(p, p + linelen)
    st = line.split(" ")
    while st.length > 0
      type = st.shift()
      if type is "o"
        sc = new Scope()
        sc.position = CirSim.scopeCount
        sc.undump st
        CirSim.scopes[CirSim.scopeCount++] = sc
        break
      if type is ("h")
        CirSim.readHint st
        break
      if type is ("$")
        CirSim.readOptions st
        break
      break  if type is ("%") or type is ("?") or type is ("B")
      type = parseInt(type)  if type >= ("0") and type <= ("9")
      x1 = Math.floor(st.shift())
      y1 = Math.floor(st.shift())
      x2 = Math.floor(st.shift())
      y2 = Math.floor(st.shift())
      f = Math.floor(st.shift())
      cls = CirSim.dumpTypes[type]
      unless cls?
        CirSim.error "unrecognized dump type: " + type
        break
      ce = CirSim.constructElement(cls, x1, y1, x2, y2, f, st)
      console.log ce
      ce.setPoints()
      CirSim.elementList.push ce
      break
    p += l
  dumpMessage = CirSim.dumpCircuit()
  CirSim.needAnalyze()
  CirSim.handleResize()
  console.log "dump: \n" + dumpMessage

CirSim.addElm = (elmObjectName) ->
  insertElm = CirSim.constructElement(elmObjectName, 340, 160)
  CirSim.mouseMode = CirSim.MODE_ADD_ELM
  CirSim.mouseModeStr = insertElm.toString()
  CirSim.addingClass = elmObjectName
  CirSim.tempMouseMode = CirSim.mouseMode

CirSim.deleteSelected = ->
  CirSim.pushUndo()
  CirSim.clipboard = ""
  i = CirSim.elementList.length - 1

  while i >= 0
    ce = CirSim.getElm(i)
    if ce.isSelected()
      CirSim.clipboard += ce.dump() + "\n"
      ce.destroy()
      CirSim.elementList.splice i, 1
    i--
  CirSim.enablePaste()
  CirSim.needAnalyze()

CirSim.constructElement = (elementObjName, xa, ya, xb, yb, f, st) ->
  try
    newElement = eval_("new " + elementObjName + "(" + xa + "," + ya + "," + xb + "," + yb + "," + f + "," + "st" + ");")
  catch e
    console.log "Couldn't construct element: " + elementObjName + " " + e
  newElement

CirSim.onKeyPressed = (evt) ->
  CirSim.keyDown = evt.which
  CirSim.warning "Shift key Pressed!" + evt.which  if CirSim.keyDown is CirSim.KEY_SHIFT
  CirSim.warning "Ctrl key Pressed!" + evt.which  if CirSim.keyDown is CirSim.KEY_CTRL
  CirSim.warning "Alt key Pressed!" + evt.which  if CirSim.keyDown is CirSim.KEY_ALT
  CirSim.warning "Key: " + CirSim.keyDown
  console.log "Key Pressed " + CirSim.keyDown
  if CirSim.keyDown is 68
    console.log ""
    console.log CirSim.dumpCircuit()
    console.log ""
  if CirSim.keyDown > " " and CirSim.keyDown < 127
    keyCode = CirSim.keyDown
    keyChar = String.fromCharCode(keyCode + 32)
    c = CirSim.dumpTypes[keyChar]
    return  if not c? or c is "Scope"
    elm = null
    elm = CirSim.constructElement(c, 0, 0)
    return  if not elm? or not (elm.needsShortcut() and elm.getDumpClass() is c)
    CirSim.mouseMode = CirSim.MODE_ADD_ELM
    CirSim.mouseModeStr = c.getName()
    CirSim.addingClass = c
  if keyPressed(" ")
    CirSim.mouseMode = CirSim.MODE_SELECT
    CirSim.mouseModeStr = "Select"
  CirSim.tempMouseMode = CirSim.mouseMode


###
Key released not used
###
CirSim.onKeyReleased = (evt) ->
  CirSim.keyDown = CirSim.NO_KEY_DOWN

CirSim.onMouseDragged = (evt) ->
  CanvasBounds = getCanvasBounds()
  
  # X and Y mouse position
  x = evt.pageX - CanvasBounds.x1
  y = evt.pageY - CanvasBounds.y
  return  unless getCanvasBounds().contains(x, y)
  CirSim.dragElm.drag x, y  if CirSim.dragElm?
  success = true
  switch CirSim.tempMouseMode
    when CirSim.MODE_DRAG_ALL
      CirSim.dragAll CirSim.snapGrid(x), CirSim.snapGrid(y)
    when CirSim.MODE_DRAG_ROW
      CirSim.dragRow CirSim.snapGrid(x), CirSim.snapGrid(y)
    when CirSim.MODE_DRAG_COLUMN
      CirSim.dragColumn CirSim.snapGrid(x), CirSim.snapGrid(y)
    when CirSim.MODE_DRAG_POST
      CirSim.dragPost CirSim.snapGrid(x), CirSim.snapGrid(y)  if CirSim.mouseElm?
    when CirSim.MODE_SELECT
      if CirSim.mouseElm?
        CirSim.tempMouseMode = CirSim.MODE_DRAG_SELECTED
        success = CirSim.dragSelected(x, y)
    when CirSim.MODE_DRAG_SELECTED
      success = CirSim.dragSelected(x, y)
  CirSim.dragging = true
  if success
    if CirSim.tempMouseMode is CirSim.MODE_DRAG_SELECTED and CirSim.mouseElm instanceof TextElm
      CirSim.dragX = x
      CirSim.dragY = y
    else
      CirSim.dragX = CirSim.snapGrid(x)
      CirSim.dragY = CirSim.snapGrid(y)


#root.repaint();
CirSim.dragAll = (x, y) ->
  dx = x - CirSim.dragX
  dy = y - CirSim.dragY
  return  if dx is 0 and dy is 0
  i = undefined
  i = 0
  while i isnt CirSim.elementList.length
    ce = CirSim.getElm(i)
    ce.move dx, dy
    i++
  CirSim.removeZeroLengthElements()

CirSim.dragRow = (x, y) ->
  dy = y - CirSim.dragY
  return  if dy is 0
  i = undefined
  i = 0
  while i isnt CirSim.elementList.length
    ce = CirSim.getElm(i)
    ce.movePoint 0, 0, dy  if ce.y is CirSim.dragY
    ce.movePoint 1, 0, dy  if ce.y2 is CirSim.dragY
    i++
  CirSim.removeZeroLengthElements()

CirSim.onMouseMove = (evt) ->
  
  #    TODO: TEST
  CanvasBounds = getCanvasBounds()
  
  # X and Y mouse position
  x = evt.pageX - CanvasBounds.x1
  y = evt.pageY - CanvasBounds.y
  
  # CirSim.error("onMouseMove: " + x + ", " + y + " " + CirSim.mouseButtonDown);
  
  # If the mouse is down
  unless CirSim.mouseButtonDown is 0
    CirSim.onMouseDragged evt
    return
  CirSim.dragX = CirSim.snapGrid(x)
  CirSim.dragY = CirSim.snapGrid(y)
  CirSim.draggingPost = -1
  i = undefined
  origMouse = CirSim.mouseElm
  CirSim.mouseElm = null
  CirSim.mousePost = -1
  CirSim.plotXElm = CirSim.plotYElm = null
  bestDist = 1e7
  bestArea = 1e7
  i = 0
  while i isnt CirSim.elementList.length
    ce = CirSim.getElm(i)
    if ce.boundingBox.contains(x, y)
      j = undefined
      area = ce.boundingBox.width * ce.boundingBox.height
      jn = ce.getPostCount()
      jn = 2  if jn > 2
      j = 0
      while j isnt jn
        pt = ce.getPost(j)
        distance = CirSim.distanceSq(x, y, pt.x1, pt.y)
        
        # If multiple elements have overlapping bounding boxes, we prefer selecting elements that have posts
        # close to the mouse pointer and that have a small bounding box area.
        if distance <= bestDist and area <= bestArea
          bestDist = distance
          bestArea = area
          CirSim.mouseElm = ce
        j++
      CirSim.mouseElm = ce  if ce.getPostCount() is 0
    i++
  CirSim.scopeSelected = -1
  unless CirSim.mouseElm?
    i = 0
    while i isnt CirSim.scopeCount
      s = CirSim.scopes[i]
      if s.rect.contains(x, y)
        s.select()
        CirSim.scopeSelected = i
      i++
    
    # the mouse pointer was not in any of the bounding boxes, but we might still be close to a post
    i = 0
    while i isnt CirSim.elementList.length
      ce = CirSim.getElm(i)
      j = undefined
      jn = ce.getPostCount()
      j = 0
      while j isnt jn
        pt = ce.getPost(j)
        distance = CirSim.distanceSq(x, y, pt.x1, pt.y)
        if CirSim.distanceSq(pt.x1, pt.y, x, y) < 26
          CirSim.mouseElm = ce
          CirSim.mousePost = j
          break
        j++
      i++
  else
    CirSim.mousePost = -1
    
    # look for post close to the mouse pointer
    i = 0
    while i isnt CirSim.mouseElm.getPostCount()
      pt = CirSim.mouseElm.getPost(i)
      CirSim.mousePost = i  if CirSim.distanceSq(pt.x1, pt.y, x, y) < 26
      i++


#if (CircuitSimulator.mouseElm != origMouse)
#	this.repaint();
CirSim.onMouseClicked = (evt) ->
  console.log "CLICK: " + evt.pageX + "  " + evt.pageY
  CirSim.clearSelection()  if CirSim.mouseMode is CirSim.MODE_SELECT or CirSim.mouseMode is CirSim.MODE_DRAG_SELECTED  if evt.button is CirSim.LEFT_MOUSE_BTN

CirSim.onMouseEntered = (evt) ->


# TODO: IMPLEMENT
CirSim.onMouseExited = (evt) ->
  
  # TODO: IMPLEMENT
  CirSim.scopeSelected = -1
  CirSim.mouseElm = CirSim.plotXElm = CirSim.plotYElm = null

CirSim.onMousePressed = (evt) ->
  
  #TODO: IMPLEMENT right mouse
  #    var ex = evt.getModifiersEx();
  #
  #    if ((ex & (MouseEvent.META_DOWN_MASK |
  #        MouseEvent.SHIFT_DOWN_MASK)) == 0 && e.isPopupTrigger()) {
  #        doPopupMenu(e);
  #        return;
  #    }
  CirSim.mouseButtonDown = evt.which
  CanvasBounds = getCanvasBounds()
  
  # X and Y mouse position
  x = evt.pageX - CanvasBounds.x1
  y = evt.pageY - CanvasBounds.y
  if CirSim.mouseButtonDown is CirSim.LEFT_MOUSE_BTN
    
    #left mouse
    CirSim.tempMouseMode = CirSim.mouseMode
    if CirSim.keyDown is CirSim.KEY_ALT
      CirSim.tempMouseMode = CirSim.MODE_DRAG_ALL
    else if (CirSim.keyDown is CirSim.KEY_ALT) and (CirSim.keyDown is CirSim.KEY_SHIFT)
      CirSim.tempMouseMode = CirSim.MODE_DRAG_ROW
    else if CirSim.keyDown is CirSim.KEY_SHIFT
      CirSim.tempMouseMode = CirSim.MODE_SELECT
    else if CirSim.keyDown is CirSim.KEY_ALT
      CirSim.tempMouseMode = CirSim.MODE_DRAG_ALL
    else CirSim.tempMouseMode = CirSim.MODE_DRAG_POST  if CirSim.keyDown is CirSim.KEY_CTRL
  else if CirSim.mouseButtonDown is CirSim.RIGHT_MOUSE_BTN
    
    # right mouse
    if CirSim.keyDown is CirSim.KEY_SHIFT
      CirSim.tempMouseMode = CirSim.MODE_DRAG_ROW
    else if CirSim.keyDown is CirSim.KEY_CTRL
      CirSim.tempMouseMode = CirSim.MODE_DRAG_COLUMN
    else
      return
  CirSim.clearSelection()  if CirSim.tempMouseMode isnt CirSim.MODE_SELECT and CirSim.tempMouseMode isnt CirSim.MODE_DRAG_SELECTED
  return  if CirSim.doSwitch(x, y)
  
  #pushUndo();
  CirSim.initDragX = x
  CirSim.initDragY = y
  CirSim.dragging = true
  return  if CirSim.tempMouseMode isnt CirSim.MODE_ADD_ELM or not CirSim.addingClass
  x0 = CirSim.snapGrid(x)
  y0 = CirSim.snapGrid(y)
  return  unless CanvasBounds.contains(x0, y0)
  CirSim.dragElm = CirSim.constructElement(CirSim.addingClass, x0, y0)

CirSim.onMouseReleased = (evt) ->
  
  #TODO: test
  #    int ex = e.getModifiersEx();
  
  #    if ((ex & (MouseEvent.SHIFT_DOWN_MASK | MouseEvent.CTRL_DOWN_MASK |
  #        MouseEvent.META_DOWN_MASK)) == 0 && e.isPopupTrigger()) {
  #        doPopupMenu(e);
  #        return;
  #    }
  CirSim.mouseButtonDown = CirSim.NO_MOUSE_BTN
  CirSim.tempMouseMode = CirSim.mouseMode
  CirSim.selectedArea = null
  CirSim.dragging = false
  circuitChanged = false
  if CirSim.heldSwitchElm
    CirSim.heldSwitchElm.mouseUp()
    CirSim.heldSwitchElm = null
    circuitChanged = true
  if CirSim.dragElm?
    
    # if the element is zero size then don't create it
    unless CirSim.dragElm.x1 is CirSim.dragElm.x2 and CirSim.dragElm.y is CirSim.dragElm.y2
      CirSim.elementList.push CirSim.dragElm
      circuitChanged = true
    CirSim.dragElm = null
  i = 0

  while i < CirSim.elementList.length
    ce = CirSim.elementList[i]
    CirSim.doEdit ce  if ce.isSelected()
    ++i
  CirSim.needAnalyze()  if circuitChanged
  CirSim.dragElm.destroy()  if CirSim.dragElm?
  CirSim.dragElm = null


#root.repaint();
CirSim.resetSelection = ->
  CirSim.mouseMode = CirSim.MODE_SELECT
  CirSim.mouseModeStr = "Select"
  CirSim.tempMouseMode = CirSim.mouseMode

CirSim.dragColumn = (x, y) ->
  
  #TODO: test
  dx = x - CirSim.dragX
  return  if dx is 0
  i = undefined
  i = 0
  while i isnt CirSim.elementList.length
    ce = CirSim.getElm(i)
    ce.movePoint 0, dx, 0  if ce.x1 is CirSim.dragX
    ce.movePoint 1, dx, 0  if ce.x2 is CirSim.dragX
    i++
  CirSim.removeZeroLengthElements()

CirSim.dragSelected = (x, y) ->
  
  #TODO: test
  me = false
  CirSim.mouseElm.setSelected me = true  if CirSim.mouseElm? and not CirSim.mouseElm.isSelected()
  
  # snap grid, unless we're only dragging text elements
  i = undefined
  i = 0
  while i isnt CirSim.elementList.length
    ce = CirSim.getElm(i)
    break  if ce.isSelected() and (ce not instanceof TextElm)
    i++
  unless i is CirSim.elementList.length
    x = CirSim.snapGrid(x)
    y = CirSim.snapGrid(y)
  dx = x - CirSim.dragX
  dy = y - CirSim.dragY
  if dx is 0 and dy is 0
    
    # don't leave mouseElm selected if we selected it above
    CirSim.mouseElm.setSelected false  if me
    return false
  allowed = true
  
  # check if moves are allowed
  i = 0
  while allowed and i isnt CirSim.elementList.length
    ce = CirSim.getElm(i)
    allowed = false  if ce.isSelected() and not ce.allowMove(dx, dy)
    i++
  if allowed
    i = 0
    while i isnt CirSim.elementList.length
      ce = CirSim.getElm(i)
      ce.move dx, dy  if ce.isSelected()
      i++
    CirSim.needAnalyze()
  
  # don't leave mouseElm selected if we selected it above
  CirSim.mouseElm.setSelected false  if me
  allowed

CirSim.dragPost = (x, y) ->
  
  # TODO: test
  CirSim.draggingPost = (if (CirSim.distanceSq(CirSim.mouseElm.x1, CirSim.mouseElm.y, x, y) > CirSim.distanceSq(CirSim.mouseElm.x2, CirSim.mouseElm.y2, x, y)) then 1 else 0)  if CirSim.draggingPost is -1
  dx = x - CirSim.dragX
  dy = y - CirSim.dragY
  return  if dx is 0 and dy is 0
  CirSim.mouseElm.movePoint CirSim.draggingPost, dx, dy
  CirSim.needAnalyze()

CirSim.unstackScope = (s) ->
  if s is 0
    return  if CirSim.scopeCount < 2
    s = 1
  return  unless CirSim.scopes[s].position is CirSim.scopes[s - 1].position
  while s < CirSim.scopeCount
    CirSim.scopes[s].position++
    s++

CirSim.stackAll = ->
  i = undefined
  i = 0
  while i isnt CirSim.scopeCount
    CirSim.scopes[i].position = 0
    CirSim.scopes[i].showMax = CirSim.scopes[i].showMin = false
    i++

CirSim.unstackAll = ->
  i = undefined
  i = 0
  while i isnt CirSim.scopeCount
    CirSim.scopes[i].position = i
    CirSim.scopes[i].showMax = true
    i++

CirSim.doEdit = (target) ->
  
  #CirSim.clearSelection();
  CirSim.pushUndo()
  
  #if(CirSim.editDialog) {
  #CirSim.editDialog.setVisible(false);
  #CirSim.editDialog = null;
  #}
  CirSim.editDialog = new EditDialog(target)


#CirSim.editDialog.show();
CirSim.dumpCircuit = ->
  i = undefined
  f = (if (CirSim.dotsCheckItem) then 1 else 0)
  f |= (if (CirSim.smallGridCheckItem) then 2 else 0)
  f |= (if (CirSim.voltsCheckItem) then 0 else 4)
  f |= (if (CirSim.powerCheckItem) then 8 else 0)
  f |= (if (CirSim.showValuesCheckItem) then 0 else 16)
  
  # 32 = linear scale in a filter
  dump = "$ " + f + " " + CirSim.timeStep + " " + CirSim.getIterCount() + " " + CirSim.currentBar + " " + CircuitElement.voltageRange + " " + CirSim.powerBar + "\n"
  i = 0
  while i isnt CirSim.elementList.length
    dump += CirSim.getElm(i).dump() + "\n"
    i++
  
  # TODO: Implement scope
  i = 0
  while i isnt CirSim.scopeCount
    d = CirSim.scopes[i].dump()
    dump += d + "\n"  if d?
    i++
  dump += "h " + CirSim.hintType + " " + CirSim.hintItem1 + " " + CirSim.hintItem2 + "\n"  unless CirSim.hintType is -1
  dump

CirSim.selectArea = (x, y) ->
  x1 = Math.min(x, CirSim.initDragX)
  x2 = Math.max(x, CirSim.initDragX)
  y1 = Math.min(y, CirSim.initDragY)
  y2 = Math.max(y, CirSim.initDragY)
  CirSim.selectedArea = new Rectangle(x1, y1, x2 - x1, y2 - y1)
  i = undefined
  i = 0
  while i isnt CirSim.elementList.length
    ce = CirSim.getElm(i)
    ce.selectRect CirSim.selectedArea
    i++

CirSim.removeZeroLengthElements = ->
  i = undefined
  changed = false
  i = CirSim.elementList.length - 1
  while i >= 0
    ce = CirSim.getElm(i)
    if ce.x1 is ce.x2 and ce.y is ce.y2
      
      # TODO: Make sure this works
      CirSim.elementList.splice i, 1
      ce.destroy()
      changed = true
    i--
  CirSim.needAnalyze()

CirSim.pushUndo = ->
  CirSim.redoStack = new Array()
  s = CirSim.dumpCircuit()
  return  if CirSim.undoStack.length > 0 and s is CirSim.undoStack[CirSim.undoStack.length - 1]
  CirSim.undoStack.push s
  CirSim.enableUndoRedo()

CirSim.doUndo = ->
  return  if CirSim.undoStack.length is 0
  CirSim.redoStack.push CirSim.dumpCircuit()
  s = CirSim.undoStack.remove(CirSim.undoStack.size() - 1)
  
  #CirSim.readSetup(s);
  CirSim.readCircuitFromString s
  CirSim.enableUndoRedo()


# TODO: Test
CirSim.doRedo = ->
  return  if CirSim.redoStack.size() is 0
  CirSim.undoStack.add CirSim.dumpCircuit()
  s = CirSim.redoStack.remove(CirSim.redoStack.size() - 1)
  CirSim.readCircuitFromString s
  CirSim.enableUndoRedo()

CirSim.enableUndoRedo = ->


#CirSim.redoMenuItem.setEnabled(CirSim.redoStack.size() > 0);
#CirSim.undoMenuItem.setEnabled(CirSim.undoStack.size() > 0);
CirSim.setMenuSelection = ->
  if CirSim.menuElm?
    return  if CirSim.menuElm.selected
    CirSim.clearSelection()
    CirSim.menuElm.setSelected true


###
TODO: NOT YET IMPLEMENTED
###
CirSim.doCut = ->
  i = undefined
  CirSim.pushUndo()
  
  #setMenuSelection();
  CirSim.clipboard = ""
  i = CirSim.elementList.length - 1
  while i >= 0
    ce = CirSim.getElm(i)
    if ce.isSelected()
      CirSim.clipboard += ce.dump() + "\n"
      ce.destroy()
      CirSim.elementList.removeElementAt i
    i--
  CirSim.enablePaste()
  CirSim.needAnalyze()


###
TODO: NOT YET IMPLEMENTED
###
CirSim.doCopy = ->
  i = undefined
  CirSim.clipboard = ""
  
  #setMenuSelection();
  i = CirSim.elementList.length - 1
  while i >= 0
    ce = CirSim.getElm(i)
    CirSim.clipboard += ce.dump() + "\n"  if ce.isSelected()
    i--
  CirSim.enablePaste()


###
Removes all circuit elements and scopes from the workspace and resets time to zero.
###
CirSim.clearAll = ->
  
  # reset the interface
  i = 0

  while i < CirSim.elementList.length
    ce = CirSim.getElm(i)
    ce.destroy()
    i++
  CirSim.elementList = []
  CirSim.hintType = -1
  CirSim.timeStep = 5e-6
  CirSim.dotsCheckItem = true
  CirSim.smallGridCheckItem = false
  CirSim.powerCheckItem = false
  CirSim.voltsCheckItem = true
  CirSim.showValuesCheckItem = true
  CirSim.setGrid()
  CirSim.speedBar = 117 # 57
  CirSim.currentBar = 100
  CirSim.powerBar = 50
  CircuitElement.voltageRange = 5
  CirSim.scopeCount = 0
  CirSim.errorStack = new Array()
  CirSim.warningStack = new Array()


###
Clears current states, graphs, and errors then Restarts the circuit from time zero.
###
CirSim.reset = ->
  i = 0

  while i < CirSim.elementList.length
    CirSim.getElm(i).reset()
    i++
  i = 0
  while i isnt CirSim.scopeCount
    CirSim.scopes[i].resetGraph()
    i++
  CirSim.stopMessage = ""
  CirSim.analyzeFlag = true
  CirSim.t = 0
  CirSim.stoppedCheck = false


#cv.repaint();

###
Stops the circuit when an error occurs
###
CirSim.halt = (s, ce) ->
  CirSim.stopMessage = s
  CirSim.stopElm = ce
  CirSim.circuitMatrix = null
  CirSim.stoppedCheck = true
  CirSim.analyzeFlag = false
  CirSim.error "[FATAL] " + s
  CirSim.error "\n[SOURCE] " + ce


###
Returns the y position of the bottom of the circuit
###
CirSim.calcCircuitBottom = ->
  i = undefined
  CirSim.circuitBottom = 0
  i = 0
  while i isnt CirSim.elementList.length
    rect = CirSim.getElm(i).boundingBox
    bottom = rect.height + rect.y
    CirSim.circuitBottom = bottom  if bottom > CirSim.circuitBottom
    i++


###
Deletes a circuit element
###

# TODO: Test!
CirSim.doDelete = ->
  i = undefined
  CirSim.pushUndo()
  CirSim.setMenuSelection()
  i = CirSim.elementList.length - 1
  while i >= 0
    ce = CirSim.getElm(i)
    if ce.isSelected()
      ce.destroy()
      CirSim.elementList.splice i, 1
    i--
  CirSim.needAnalyze()

CirSim.enablePaste = ->


#pasteMenuItem.setEnabled(CirSim.clipboard.length() > 0);
# TODO: NOT YET IMPLEMENTED

###
Not yet ported
###
CirSim.doPaste = ->


# TODO: NOT YET IMPLEMENTED
CirSim.clearSelection = ->
  i = undefined
  i = 0
  while i isnt CirSim.elementList.length
    ce = CirSim.getElm(i)
    ce.setSelected false
    i++

CirSim.doSelectAll = ->
  i = undefined
  i = 0
  while i isnt CirSim.elementList.length
    ce = CirSim.getElm(i)
    ce.setSelected true
    i++

CirSim.setGrid = ->
  CirSim.gridSize = (if (CirSim.smallGridCheckItem) then 8 else 16)
  CirSim.gridMask = ~(CirSim.gridSize - 1)
  CirSim.gridRound = CirSim.gridSize / 2 - 1

CirSim.drawGrid = ->
  CanvasBounds = getCanvasBounds()
  numCols = (CanvasBounds.width / CirSim.gridSize)
  numRows = (CanvasBounds.height / CirSim.gridSize)
  
  # Draw cols:
  i = 0

  while i < numCols
    j = 0

    while j < numRows
      ++j
    i++


#            paper.rect(CirSim.gridSize * i, CirSim.gridSize * j, 1, 1).attr({
#                'stroke':Color.color2HexString(Color.DEEP_YELLOW),
#                'stroke-width':.2
#            });
CirSim.handleResize = ->
  
  #TODO: Probably not needed.
  CirSim.needAnalyze()
  CirSim.circuitBottom = 0

CirSim.destroyFrame = ->


#TODO: Probably not needed.
CirSim.snapGrid = (x) ->
  (x + CirSim.gridRound) & CirSim.gridMask

CirSim.toggleSwitch = (n) ->
  i = undefined
  i = 0
  while i isnt CirSim.elementList.length
    ce = CirSim.getElm(i)
    if ce instanceof SwitchElm
      n--
      if n is 0
        (ce).toggle()
        CirSim.analyzeFlag = true
        
        #cv.repaint();
        return
    i++

CirSim.doSwitch = (x, y) ->
  return false  if not CirSim.mouseElm? or (CirSim.mouseElm not instanceof SwitchElm) or (CirSim.mouseElm not instanceof Switch2Elm)
  se = CirSim.mouseElm # as SwitchElm;
  se.toggle()
  CirSim.heldSwitchElm = se  if se.momentary
  CirSim.needAnalyze()
  true

CirSim.getIterCount = ->
  return 0  if CirSim.speedBar is 0
  
  #return (Math.exp((speedBar.getValue()-1)/24.) + .5);
  .1 * Math.exp((CirSim.speedBar - 61) / 24.)

CirSim.needAnalyze = ->
  CirSim.analyzeFlag = true

CirSim.getCircuitNode = (n) ->
  return new CircuitNode()  if n >= CirSim.nodeList.length
  CirSim.nodeList[n] #[n] as CircuitNode;

CirSim.getElm = (n) ->
  return null  if n >= CirSim.elementList.length
  CirSim.elementList[n] # as CircuitElement;


###
Returns the index of a specified element. -1 is returned if that element is not found
###
CirSim.locateElm = (elm) ->
  i = undefined
  i = 0
  while i isnt CirSim.elementList.length
    return i  if elm is CirSim.elementList[i]
    i++
  -1


###
Todo: Check if working
###
CirSim.getCodeBase = ->
  ""


###
initializes the values of scalefactors for performance reasons
###
CirSim.initScaleFactors = ->
  numScaleFactors = 200
  i = 0

  while i < numScaleFactors
    CirSim.scaleFactors[i] = 0
    ++i


###
Configures and places all scopes on the stage
###
CirSim.setupScopes = ->
  i = undefined
  
  # check scopes to make sure the elements still exist, and remove unused scopes/columns
  pos = -1
  i = 0
  while i < CirSim.scopeCount
    CirSim.scopes[i].setElm null  if CirSim.locateElm(CirSim.scopes[i].elm) < 0
    unless CirSim.scopes[i].elm?
      j = undefined
      j = i
      while j isnt CirSim.scopeCount
        CirSim.scopes[j] = CirSim.scopes[j + 1]
        j++
      CirSim.scopeCount--
      i--
      continue
    CirSim.scopes[i].position = pos + 1  if CirSim.scopes[i].position > pos + 1
    pos = CirSim.scopes[i].position
    i++
  CirSim.scopeCount--  while CirSim.scopeCount > 0 and not CirSim.scopes[CirSim.scopeCount - 1].elm?
  
  #var h = winSize.height - circuitArea.height;
  h = 120
  pos = 0
  i = 0
  while i isnt CirSim.scopeCount
    CirSim.scopeColCount[i] = 0
    i++
  i = 0
  while i isnt CirSim.scopeCount
    pos = Math.max(CirSim.scopes[i].position, pos)
    CirSim.scopeColCount[CirSim.scopes[i].position]++
    i++
  colct = pos + 1
  iw = CirSim.infoWidth
  iw = iw * 3 / 2  if colct <= 2
  w = (getCanvasBounds().width - iw) / colct
  marg = 10
  w = marg * 2  if w < marg * 2
  pos = -1
  colh = 0
  row = 0
  speed = 0
  i = 0
  while i isnt CirSim.scopeCount
    s = CirSim.scopes[i]
    if s.position > pos
      pos = s.position
      colh = h / CirSim.scopeColCount[pos]
      row = 0
      speed = s.speed
    unless s.speed is speed
      s.speed = speed
      s.resetGraph()
    r = new Rectangle(pos * w, getCanvasBounds().height - h + colh * row, w - marg, colh)
    row++
    s.setRect r  unless r.equals(s.rect)
    i++


###
control voltage source vs with voltage from n1 to n2 (must also call stampVoltageSource())
###
CirSim.stampVCVS = (n1, n2, coef, vs) ->
  vn = CirSim.nodeList.length + vs
  CirSim.stampMatrix vn, n1, coef
  CirSim.stampMatrix vn, n2, -coef


###
stamp independent voltage source #vs, from n1 to n2, amount v
###
CirSim.stampVoltageSource = (n1, n2, vs, v) ->
  vn = CirSim.nodeList.length + vs
  CirSim.stampMatrix vn, n1, -1
  CirSim.stampMatrix vn, n2, 1
  CirSim.stampRightSide vn, v
  CirSim.stampMatrix n1, vn, 1
  CirSim.stampMatrix n2, vn, -1

CirSim.updateVoltageSource = (n1, n2, vs, v) ->
  vn = CirSim.nodeList.length + vs
  CirSim.stampRightSide vn, v

CirSim.stampResistor = (n1, n2, r) ->
  r0 = 1 / r
  if isNaN(r0) or isInfinite(r0)
    CirSim.error "bad resistance"
    a = 0
    a /= a
  CirSim.stampMatrix n1, n1, r0
  CirSim.stampMatrix n2, n2, r0
  CirSim.stampMatrix n1, n2, -r0
  CirSim.stampMatrix n2, n1, -r0

CirSim.stampConductance = (n1, n2, r0) ->
  CirSim.stampMatrix n1, n1, r0
  CirSim.stampMatrix n2, n2, r0
  CirSim.stampMatrix n1, n2, -r0
  CirSim.stampMatrix n2, n1, -r0


###
current from cn1 to cn2 is equal to voltage from vn1 to 2, divided by g
###
CirSim.stampVCCurrentSource = (cn1, cn2, vn1, vn2, g) ->
  CirSim.stampMatrix cn1, vn1, g
  CirSim.stampMatrix cn2, vn2, g
  CirSim.stampMatrix cn1, vn2, -g
  CirSim.stampMatrix cn2, vn1, -g

CirSim.stampCurrentSource = (n1, n2, i) ->
  CirSim.stampRightSide n1, -i
  CirSim.stampRightSide n2, i


###
stamp a current source from n1 to n2 depending on current through vs
###
CirSim.stampCCCS = (n1, n2, vs, gain) ->
  vn = CirSim.nodeList.length + vs
  CirSim.stampMatrix n1, vn, gain
  CirSim.stampMatrix n2, vn, -gain


###
stamp value x in row i, column j, meaning that a voltage change
of dv in node j will increase the current into node i by x dv.
(Unless i or j is a voltage source node.)
###
CirSim.stampMatrix = (i, j, x) ->
  if i > 0 and j > 0
    if CirSim.circuitNeedsMap
      i = CirSim.circuitRowInfo[i - 1].mapRow
      ri = CirSim.circuitRowInfo[j - 1]
      if ri.type is RowInfo.ROW_CONST
        
        #console.log("Stamping constant " + i + " " + j + " " + x);
        CirSim.circuitRightSide[i] -= x * ri.value
        return
      j = ri.mapCol
    
    #console.log("stamping " + i + " " + j + " " + x);
    else
      i--
      j--
    CirSim.circuitMatrix[i][j] += x


###
Stamp value x on the right side of row i, representing an
independent current source flowing into node i
###
CirSim.stampRightSide = (i, x) ->
  if isNaN(x)
    
    #console.log("rschanges true " + (i-1));
    CirSim.circuitRowInfo[i - 1].rsChanges = true  if i > 0
  else
    if i > 0
      if CirSim.circuitNeedsMap
        i = CirSim.circuitRowInfo[i - 1].mapRow
      
      #console.log("stamping rs " + i + " " + x);
      else
        i--
      CirSim.circuitRightSide[i] += x


###
Indicate that the values on the left side of row i change in doStep()
###
CirSim.stampNonLinear = (i) ->
  CirSim.circuitRowInfo[i - 1].lsChanges = true  if i > 0

CirSim.getHint = ->
  c1 = CirSim.getElm(CirSim.hintItem1)
  c2 = CirSim.getElm(CirSim.hintItem2)
  return null  if not c1? or not c2?
  if CirSim.hintType is CirSim.HINT_LC
    return null  unless c1 instanceof InductorElm
    return null  unless c2 instanceof CapacitorElm
    ie = c1
    
    # as InductorElm;
    ce = c2
    
    # as CapacitorElm;
    return "res.f = " + CircuitElement.getUnitText(1 / (2 * Math.PI * Math.sqrt(ie.inductance * ce.capacitance)), "Hz")
  if CirSim.hintType is CirSim.HINT_RC
    return null  unless c1 instanceof ResistorElm
    return null  unless c2 instanceof CapacitorElm
    re = c1
    
    # as ResistorElm;
    ce = c2
    
    # as CapacitorElm;
    return "RC = " + CircuitElement.getUnitText(re.resistance * ce.capacitance, "s")
  if CirSim.hintType is CirSim.HINT_3DB_C
    return null  unless c1 instanceof ResistorElm
    return null  unless c2 instanceof CapacitorElm
    re = c1
    
    # as ResistorElm;
    ce = c2
    
    # as CapacitorElm;
    return "f.3db = " + CircuitElement.getUnitText(1 / (2 * Math.PI * re.resistance * ce.capacitance), "Hz")
  if CirSim.hintType is CirSim.HINT_3DB_L
    return null  unless c1 instanceof ResistorElm
    return null  unless c2 instanceof InductorElm
    re = c1
    
    # as ResistorElm;
    ie = c2
    
    # as InductorElm;
    return "f.3db = " + CircuitElement.getUnitText(re.resistance / (2 * Math.PI * ie.inductance), "Hz")
  if CirSim.hintType is CirSim.HINT_TWINT
    return null  unless c1 instanceof ResistorElm
    return null  unless c2 instanceof CapacitorElm
    re = c1 # as ResistorElm;
    ce = c2 # as CapacitorElm;
    return "fc = " + CircuitElement.getUnitText(1 / (2 * Math.PI * re.resistance * ce.capacitance), "Hz")
  null


# ****************************************************************
# ****************************************************************
#    Core simulation
# ****************************************************************
# ***************************************************************

###
UpdateCircuit: Outermost method in event loops

Called once each frame
###
CirSim.updateCircuit = ->
  startTime = (new Date()).getTime()
  
  # Reset the page:
  paper.clearRect 0, 0, CANVAS.width(), CANVAS.height()
  
  #CirSim.drawGrid();
  
  # CircuitElement
  realMouseElm = CirSim.mouseElm
  
  # Render Warning and error messages:
  #CirSim.drawError();
  #CirSim.drawWarning();
  if CirSim.analyzeFlag
    CirSim.analyzeCircuit()
    CirSim.analyzeFlag = false
  
  # TODO
  #	if(CirSim.editDialog != null && CirSim.editDialog.elm instanceof CircuitElement)
  #		CirSim.mouseElm = CirSim.editDialog.elm;
  # as CircuitElement;
  CirSim.mouseElm = CirSim.stopElm  unless CirSim.mouseElm?
  
  # TODO: test
  CirSim.setupScopes()
  CircuitElement.selectColor = Settings.SELECT_COLOR
  if CirSim.printableCheckItem
    CircuitElement.whiteColor = Color.WHITE
    CircuitElement.lightGrayColor = Color.BLACK
  else
    CircuitElement.whiteColor = Color.WHITE
    CircuitElement.lightGrayColor = Color.LIGHT_GREY
  unless CirSim.stoppedCheck
    try
      CirSim.runCircuit()
    catch e
      console.log "error in run circuit: " + e.message
      CirSim.analyzeFlag = true
      
      #cv.paint(g);
      return
  unless CirSim.stoppedCheck
    sysTime = (new Date()).getTime()
    unless CirSim.lastTime is 0
      inc = Math.floor(sysTime - CirSim.lastTime)
      c = CirSim.currentBar # The value of CirSim number must be carefully set for current to display properly
      
      #console.log("Frame time: " + inc  + "   #: "  + frames);
      c = Math.exp(c / 3.5 - 14.2)
      CircuitElement.currentMult = 1.7 * inc * c
      CircuitElement.currentMult = -CircuitElement.currentMult  unless CirSim.conventionCheckItem
    if sysTime - CirSim.secTime >= 1000
      CirSim.framerate = CirSim.frames
      CirSim.steprate = CirSim.steps
      CirSim.frames = 0
      CirSim.steps = 0
      CirSim.secTime = sysTime
    CirSim.lastTime = sysTime
  else
    CirSim.lastTime = 0
  CircuitElement.powerMult = Math.exp(CirSim.powerBar / 4.762 - 7)
  
  # Draw each circuit element
  i = 0

  while i < CirSim.elementList.length
    CirSim.getElm(i).draw()
    ++i
  
  # Draw the posts for each circuit
  if CirSim.tempMouseMode is CirSim.MODE_DRAG_ROW or CirSim.tempMouseMode is CirSim.MODE_DRAG_COLUMN or CirSim.tempMouseMode is CirSim.MODE_DRAG_POST or CirSim.tempMouseMode is CirSim.MODE_DRAG_SELECTED
    i = 0
    while i < CirSim.elementList.length
      ce = CirSim.getElm(i)
      ce.drawPost ce.x1, ce.y
      ce.drawPost ce.x2, ce.y2
      ++i
  badNodes = 0
  
  # find bad connections. Nodes not connected to other elements which intersect other elements' bounding boxes
  i = 0
  while i < CirSim.nodeList.length
    cn = CirSim.getCircuitNode(i)
    if not cn.intern and cn.links.length is 1
      bb = 0
      cn1 = cn.links[0]
      
      # CircuitNodeLink
      j = 0

      while j < CirSim.elementList.length
        bb++  if cn1.elm isnt CirSim.getElm(j) and CirSim.getElm(j).boundingBox.contains(cn.x1, cn.y)
        ++j
      if bb > 0
        
        # Outline bad nodes
        paper.circle(cn.x1, cn.y, 2 * Settings.POST_RADIUS).attr
          stroke: Color.color2HexString(Color.RED)
          "stroke-dasharray": "--"

        badNodes++
    ++i
  CirSim.dragElm.draw null  if CirSim.dragElm? and (CirSim.dragElm.x1 isnt CirSim.dragElm.x2 or CirSim.dragElm.y isnt CirSim.dragElm.y2)
  ct = CirSim.scopeCount
  ct = 0  if CirSim.stopMessage?
  
  # TODO Implement scopes
  #for(i=0; i!=ct; ++i)
  #    CirSim.scopes[i].draw();
  if CirSim.stopMessage?
    printError CirSim.stopMessage
  else
    CirSim.calcCircuitBottom()  if CirSim.circuitBottom is 0
    info = []
    
    # Array of messages to be displayed at the bottom of the canvas
    if CirSim.mouseElm?
      if CirSim.mousePost is -1
        CirSim.mouseElm.getInfo info
      else
        info[0] = "V = " + CircuitElement.getUnitText(CirSim.mouseElm.getPostVoltage(CirSim.mousePost), "V")
    else
      CircuitElement.showFormat.fractionalDigits = 2
      info[0] = "t = " + CircuitElement.getUnitText(CirSim.t, "s") + "\nf.t.: " + (CirSim.lastTime - CirSim.lastFrameTime) + "\n"
    unless CirSim.hintType is -1
      i = 0
      while info[i]?
        ++i
      s = CirSim.getHint()
      unless s?
        CirSim.hintType = -1
      else
        info[i] = s
    x = 0
    
    # TODO: Implement scopes
    x = CirSim.scopes[ct - 1].rightEdge() + 20  unless ct is 0
    CanvasBounds = getCanvasBounds()
    x = 0  unless x
    x = Math.max(x, CanvasBounds.width * 2 / 3)
    i = 0
    while info[i]?
      ++i
    info[++i] = badNodes + ((if (badNodes is 1) then " bad connection" else " bad connections"))  if badNodes > 0
    bottomTextOffset = 100
    
    # Find where to show data; below circuit, not too high unless we need it
    ybase = CanvasBounds.height - 15 * i - bottomTextOffset
    ybase = Math.min(ybase, CanvasBounds.height)
    ybase = Math.max(ybase, CirSim.circuitBottom)
    
    # TODO: CANVAS
    i = 0
    while info[i]?
      paper.fillStyle = Color.color2HexString(Settings.TEXT_COLOR)
      paper.fillText info[i], x, ybase + 15 * (i + 1)
      ++i
  
  # Draw selection outline:
  if CirSim.selectedArea?
    
    #paper.strokeStyle = Color.color2HexString(Settings.SELECTION_MARQUEE_COLOR);
    paper.beginPath()
    paper.strokeStyle = Settings.SELECT_COLOR
    paper.strokeRect @selectedArea.x1, @selectedArea.y, @selectedArea.width, @selectedArea.height
    paper.closePath()
  CirSim.mouseElm = realMouseElm
  CirSim.frames++
  endTime = (new Date()).getTime()
  CirSim.lastFrameTime = CirSim.lastTime


###
Analyzes the node structure of the circuit and builds a matrix representation of the circuit. This is done as a
preliminary step prior to computation. However, this is only necessary when the structure of the circuit has
been modified in some way
###
CirSim.analyzeCircuit = ->
  CirSim.calcCircuitBottom()
  return  if CirSim.elementList.length is 0
  CirSim.stopMessage = null
  CirSim.stopElm = null
  i = undefined
  j = undefined
  vscount = 0 # int
  CirSim.nodeList = []
  gotGround = false
  gotRail = false
  volt = null # CircuitElement
  i = 0
  while i < CirSim.elementList.length
    ce = CirSim.getElm(i) # CircuitElement type
    if ce instanceof GroundElm
      gotGround = true
      break
    gotRail = true  if ce instanceof RailElm
    volt = ce  if not volt? and ce instanceof VoltageElm
    ++i
  
  # If no ground and no rails then voltage element's first terminal instanceof referenced to ground:
  if not gotGround and volt? and not gotRail
    cn = new CircuitNode()
    pt = volt.getPost(0)
    cn.x1 = pt.x1
    cn.y = pt.y
    CirSim.nodeList.push cn
  else
    
    # Else allocate extra node for ground
    cn = new CircuitNode()
    cn.x1 = cn.y = -1
    CirSim.nodeList.push cn
  
  # Allocate nodes and voltage sources
  i = 0
  while i < CirSim.elementList.length
    ce = CirSim.getElm(i)
    inodes = ce.getInternalNodeCount()
    ivs = ce.getVoltageSourceCount()
    posts = ce.getPostCount()
    
    # allocate a node for each post and match posts to nodes
    j = 0
    while j isnt posts
      pt = ce.getPost(j)
      k = undefined
      k = 0
      while k isnt CirSim.nodeList.length
        cn = CirSim.getCircuitNode(k)
        break  if pt.x1 is cn.x1 and pt.y is cn.y
        ++k
      if k is CirSim.nodeList.length
        cn = new CircuitNode()
        cn.x1 = pt.x1
        cn.y = pt.y
        cn1 = new CircuitNodeLink()
        cn1.num = j
        cn1.elm = ce
        cn.links.push cn1
        ce.setNode j, CirSim.nodeList.length
        CirSim.nodeList.push cn
      else
        cn1 = new CircuitNodeLink()
        cn1.num = j
        cn1.elm = ce
        CirSim.getCircuitNode(k).links.push cn1
        ce.setNode j, k
        
        # If it's the ground node, make sure the node voltage instanceof 0, because it may not get set later.
        ce.setNodeVoltage j, 0  if k is 0
      ++j
    j = 0
    while j isnt inodes
      cn = new CircuitNode()
      cn.x1 = -1
      cn.y = -1
      cn.intern = true
      cn1 = new CircuitNodeLink()
      cn1.num = j + posts
      cn1.elm = ce
      cn.links.push cn1
      ce.setNode cn1.num, CirSim.nodeList.length
      CirSim.nodeList.push cn
      ++j
    vscount += ivs
    ++i
  CirSim.voltageSources = new Array(vscount)
  vscount = 0
  CirSim.circuitNonLinear = false
  
  # determine if circuit instanceof nonlinear
  i = 0
  while i isnt CirSim.elementList.length
    ce = CirSim.getElm(i) # circuitElement
    CirSim.circuitNonLinear = true  if ce.nonLinear()
    ivs = ce.getVoltageSourceCount()
    j = 0
    while j isnt ivs
      CirSim.voltageSources[vscount] = ce
      ce.setVoltageSource j, vscount++
      ++j
    ++i
  CirSim.voltageSourceCount = vscount
  matrixSize = CirSim.nodeList.length - 1 + vscount
  CirSim.circuitMatrix = initializeTwoDArray(matrixSize, matrixSize)
  CirSim.origMatrix = initializeTwoDArray(matrixSize, matrixSize)
  CirSim.circuitRightSide = new Array(matrixSize)
  
  # Todo: check array length
  #circuitRightSide = 
  zeroArray CirSim.circuitRightSide
  CirSim.origRightSide = new Array(matrixSize)
  
  #origRightSide = 
  zeroArray CirSim.origRightSide
  CirSim.circuitMatrixSize = CirSim.circuitMatrixFullSize = matrixSize
  CirSim.circuitRowInfo = new Array(matrixSize)
  CirSim.circuitPermute = new Array(matrixSize)
  
  # Todo: check
  #circuitRowInfo = 
  zeroArray CirSim.circuitRowInfo
  
  #circuitPermute = 
  zeroArray CirSim.circuitPermute
  i = 0
  while i isnt matrixSize
    CirSim.circuitRowInfo[i] = new RowInfo()
    ++i
  CirSim.circuitNeedsMap = false
  
  # stamp linear circuit elements
  i = 0
  while i isnt CirSim.elementList.length
    ce = CirSim.getElm(i)
    ce.stamp()
    ++i
  closure = new Array(CirSim.nodeList.length)
  changed = true
  closure[0] = true
  while changed
    changed = false
    i = 0
    while i isnt CirSim.elementList.length
      ce = CirSim.getElm(i)
      
      # Loop through all ce's nodes to see if theya are connected to otehr nodes not in closure
      j = 0
      while j < ce.getPostCount()
        unless closure[ce.getNode(j)]
          closure[ce.getNode(j)] = changed = true  if ce.hasGroundConnection(j)
          continue
        k = undefined
        k = 0
        while k isnt ce.getPostCount()
          continue  if j is k
          kn = ce.getNode(k)
          if ce.getConnection(j, k) and not closure[kn]
            closure[kn] = true
            changed = true
          ++k
        ++j
      ++i
    continue  if changed
    
    # connect unconnected nodes
    i = 0
    while i isnt CirSim.nodeList.length
      if not closure[i] and not CirSim.getCircuitNode(i).intern
        CirSim.error "node " + i + " unconnected"
        CirSim.stampResistor 0, i, 1e8
        closure[i] = true
        changed = true
        break
      ++i
  i = 0
  while i isnt CirSim.elementList.length
    ce = CirSim.getElm(i)
    if ce instanceof InductorElm
      fpi = new FindPathInfo(FindPathInfo.INDUCT, ce, ce.getNode(1), CirSim.elementList, CirSim.nodeList.length)
      
      # try findPath with maximum depth of 5, to avoid slowdown
      if not fpi.findPath(ce.getNode(0), 5) and not fpi.findPath(ce.getNode(0))
        console.log ce.toString() + " no path"
        ce.reset()
    
    # look for current sources with no current path
    if ce instanceof CurrentElm
      fpi = new FindPathInfo(FindPathInfo.INDUCT, ce, ce.getNode(1), CirSim.elementList, CirSim.nodeList.length)
      unless fpi.findPath(ce.getNode(0))
        CirSim.halt "No path for current source!", ce
        return
    
    # Look for voltage soure loops:
    if (ce instanceof VoltageElm and ce.getPostCount() is 2) or ce instanceof WireElm
      fpi = new FindPathInfo(FindPathInfo.VOLTAGE, ce, ce.getNode(1), CirSim.elementList, CirSim.nodeList.length)
      if fpi.findPath(ce.getNode(0)) is true
        CirSim.halt "Voltage source/wire loop with no resistance!", ce
        return
    
    # Look for shorted caps or caps with voltage but no resistance
    if ce instanceof CapacitorElm
      fpi = new FindPathInfo(FindPathInfo.SHORT, ce, ce.getNode(1), CirSim.elementList, CirSim.nodeList.length)
      if fpi.findPath(ce.getNode(0))
        console.log ce.toString() + " shorted"
        ce.reset()
      else
        fpi = new FindPathInfo(FindPathInfo.CAP_V, ce, ce.getNode(1), CirSim.elementList, CirSim.nodeList.length)
        if fpi.findPath(ce.getNode(0))
          CirSim.halt "Capacitor loop with no resistance!", ce
          return
    ++i
  i = 0
  while i isnt matrixSize
    qm = -1
    qp = -1
    qv = 0
    re = CirSim.circuitRowInfo[i]
    continue  if re.lsChanges or re.dropRow or re.rsChanges
    rsadd = 0
    
    # look for rows that can be removed
    j = 0
    while j isnt matrixSize
      q = CirSim.circuitMatrix[i][j]
      if CirSim.circuitRowInfo[j].type is RowInfo.ROW_CONST
        
        # Keep a running total of const values that have been removed already
        rsadd -= CirSim.circuitRowInfo[j].value * q
        continue
      continue  if q is 0
      if qp is -1
        qp = j
        qv = q
        continue
      if qm is -1 and q is -qv
        qm = j
        continue
      break
      ++j
    
    #console.log("line " + i + " " + qp + " " + qm + " " + j);
    #if (qp != -1 && circuitRowInfo[qp].lsChanges) {
    #         console.log("lschanges");
    #         continue;
    #         }
    #         if (qm != -1 && circuitRowInfo[qm].lsChanges) {
    #         console.log("lschanges");
    #         continue;
    #         }
    if j is matrixSize
      if qp is -1
        CirSim.halt "Matrix error", null
        return
      elt = CirSim.circuitRowInfo[qp]
      if qm is -1
        
        # We found a row with only one nonzero entry, that value instanceof constant
        k = undefined
        k = 0
        while elt.type is RowInfo.ROW_EQUAL and k < 100
          
          # Follow the chain
          qp = elt.nodeEq
          elt = CirSim.circuitRowInfo[qp]
          ++k
        if elt.type is RowInfo.ROW_EQUAL
          
          # break equal chains
          #console.log("Break equal chain");
          elt.type = RowInfo.ROW_NORMAL
          continue
        unless elt.type is RowInfo.ROW_NORMAL
          console.log "type already " + elt.type + " for " + qp + "!"
          continue
        elt.type = RowInfo.ROW_CONST
        elt.value = (CirSim.circuitRightSide[i] + rsadd) / qv
        CirSim.circuitRowInfo[i].dropRow = true
        
        #console.log(qp + " * " + qv + " = const " + elt.value);
        i = -1 # start over from scratch
      else if CirSim.circuitRightSide[i] + rsadd is 0
        
        # we found a row with only two nonzero entries, and one
        # instanceof the negative of the other; the values are equal
        unless elt.type is RowInfo.ROW_NORMAL
          
          #console.log("swapping");
          qq = qm
          qm = qp
          qp = qq
          elt = CirSim.circuitRowInfo[qp]
          unless elt.type is RowInfo.ROW_NORMAL
            
            # we should follow the chain here, but this hardly ever happens so it's not worth worrying about
            console.log "swap failed"
            continue
        elt.type = RowInfo.ROW_EQUAL
        elt.nodeEq = qm
        CirSim.circuitRowInfo[i].dropRow = true
    ++i
  
  #console.log(qp + " = " + qm);
  # end elseif
  # end if(j==matrixSize)
  # end for(matrixSize)
  
  # find size of new matrix:
  nn = 0
  i = 0
  while i isnt matrixSize
    elt = CirSim.circuitRowInfo[i]
    if elt.type is RowInfo.ROW_NORMAL
      elt.mapCol = nn++
      
      #console.log("col " + i + " maps to " + elt.mapCol);
      continue
    if elt.type is RowInfo.ROW_EQUAL
      e2 = null
      
      # resolve chains of equality; 100 max steps to avoid loops
      j = 0
      while j isnt 100
        e2 = CirSim.circuitRowInfo[elt.nodeEq]
        break  unless e2.type is RowInfo.ROW_EQUAL
        break  if i is e2.nodeEq
        elt.nodeEq = e2.nodeEq
        j++
    elt.mapCol = -1  if elt.type is RowInfo.ROW_CONST
    ++i
  # END for
  i = 0
  while i isnt matrixSize
    elt = CirSim.circuitRowInfo[i]
    if elt.type is RowInfo.ROW_EQUAL
      e2 = CirSim.circuitRowInfo[elt.nodeEq]
      if e2.type is RowInfo.ROW_CONST
        
        # if something instanceof equal to a const, it's a const
        elt.type = e2.type
        elt.value = e2.value
        elt.mapCol = -1
      
      #console.log(i + " = [late]const " + elt.value);
      else
        elt.mapCol = e2.mapCol
    i++
  
  #console.log(i + " maps to: " + e2.mapCol);
  
  # make the new, simplified matrix
  newsize = nn
  newmatx = initializeTwoDArray(newsize, newsize)
  newrs = new Array(newsize)
  
  #var newrs:Array = 
  zeroArray newrs
  ii = 0
  i = 0
  while i isnt matrixSize
    rri = CirSim.circuitRowInfo[i]
    if rri.dropRow
      rri.mapRow = -1
      continue
    newrs[ii] = CirSim.circuitRightSide[i]
    rri.mapRow = ii
    
    #console.log("Row " + i + " maps to " + ii);
    j = 0
    while j isnt matrixSize
      ri = CirSim.circuitRowInfo[j]
      if ri.type is RowInfo.ROW_CONST
        newrs[ii] -= ri.value * CirSim.circuitMatrix[i][j]
      else
        newmatx[ii][ri.mapCol] += CirSim.circuitMatrix[i][j]
      j++
    ii++
    i++
  CirSim.circuitMatrix = newmatx
  CirSim.circuitRightSide = newrs
  matrixSize = CirSim.circuitMatrixSize = newsize
  i = 0
  while i isnt matrixSize
    CirSim.origRightSide[i] = CirSim.circuitRightSide[i]
    i++
  i = 0
  while i isnt matrixSize
    j = 0
    while j isnt matrixSize
      CirSim.origMatrix[i][j] = CirSim.circuitMatrix[i][j]
      j++
    i++
  CirSim.circuitNeedsMap = true
  
  # // For debugging
  #     console.log("matrixSize = " + matrixSize + " " + circuitNonLinear);
  #     for (j = 0; j != circuitMatrixSize; j++) {
  #     for (i = 0; i != circuitMatrixSize; i++)
  #     console.log(circuitMatrix[j][i] + " ");
  #     console.log("  " + circuitRightSide[j] + "\n");
  #     }
  #     console.log("\n");
  #     
  
  # if a matrix instanceof linear, we can do the lu_factor here instead of needing to do it every frame
  unless CirSim.circuitNonLinear
    unless CirSim.lu_factor(CirSim.circuitMatrix, CirSim.circuitMatrixSize, CirSim.circuitPermute)
      CirSim.halt "Singular matrix!", null
      return


###
RunCircuit: Called by UpdateCircuit


Called once per frame, runs many iterations
###
CirSim.runCircuit = ->
  if not CirSim.circuitMatrix? or CirSim.elementList.length is 0
    CirSim.circuitMatrix = null
    return
  iter = undefined
  debugPrint = CirSim.dumpMatrix
  CirSim.dumpMatrix = false
  steprate = Math.floor(160 * CirSim.getIterCount())
  tm = (new Date()).getTime()
  lit = CirSim.lastIterTime
  
  # Double-check
  if 1000 >= steprate * (tm - CirSim.lastIterTime)
    console.log "returned: diff: " + (tm - CirSim.lastIterTime)
    return
  
  # Main iteration
  iter = 1
  loop
    i = undefined
    j = undefined
    k = undefined
    subiter = undefined
    
    # Start Iteration for each element in the circuit
    i = 0
    while i < CirSim.elementList.length
      ce = CirSim.getElm(i)
      ce.startIteration()
      ++i
    
    # Keep track of the number of steps
    ++CirSim.steps
    
    # The number of maximum allowable iterations
    subiterCount = 500
    
    # Sub iteration
    subiter = 0
    while subiter isnt subiterCount
      CirSim.converged = true
      CirSim.subIterations = subiter
      i = 0
      while i < CirSim.circuitMatrixSize
        CirSim.circuitRightSide[i] = CirSim.origRightSide[i]
        ++i
      if CirSim.circuitNonLinear
        i = 0
        while i < CirSim.circuitMatrixSize
          j = 0
          while j < CirSim.circuitMatrixSize
            CirSim.circuitMatrix[i][j] = CirSim.origMatrix[i][j]
            ++j
          ++i
      
      # Step each element this iteration
      i = 0
      while i < CirSim.elementList.length
        ce = CirSim.getElm(i)
        ce.doStep()
        ++i
      return  if CirSim.stopMessage?
      printit = debugPrint
      debugPrint = false
      j = 0
      while j < CirSim.circuitMatrixSize
        i = 0
        while i < CirSim.circuitMatrixSize
          x = CirSim.circuitMatrix[i][j]
          if isNaN(x) or isInfinite(x)
            console.log "Matrix is invalid " + isNaN(x)
            CirSim.halt "Invalid matrix", null
            return
          ++i
        ++j
      
      #            if(printit) {
      #                for(j=0; i<circuitMatrixSize; j++) {
      #                    for( i=0; i<circuitMatrixSize; ++i)
      #                        console.log(circuitMatrix[j][i] + ",");
      #                    console.log(" " + circuitRightSide[j] + "\n");
      #                }
      #                console.log("\n");
      #            }
      if CirSim.circuitNonLinear
        break  if CirSim.converged and subiter > 0
        unless CirSim.lu_factor(CirSim.circuitMatrix, CirSim.circuitMatrixSize, CirSim.circuitPermute)
          CirSim.halt "Singular matrix!", null
          return
      CirSim.lu_solve CirSim.circuitMatrix, CirSim.circuitMatrixSize, CirSim.circuitPermute, CirSim.circuitRightSide
      j = 0
      while j < CirSim.circuitMatrixFullSize
        ri = CirSim.circuitRowInfo[j]
        res = 0
        if ri.type is RowInfo.ROW_CONST
          res = ri.value
        else
          res = CirSim.circuitRightSide[ri.mapCol]
        if isNaN(res)
          CirSim.converged = false
          break
        if j < (CirSim.nodeList.length - 1)
          cn = CirSim.getCircuitNode(j + 1)
          k = 0
          while k < cn.links.length
            cn1 = cn.links[k] # as CircuitNodeLink;
            cn1.elm.setNodeVoltage cn1.num, res
            ++k
        else
          ji = j - (CirSim.nodeList.length - 1)
          
          #console.log("setting vsrc " + ji + " to " + res);
          CirSim.voltageSources[ji].setCurrent ji, res
        ++j
      break  unless CirSim.circuitNonLinear
      subiter++
    # End for
    console.log "converged after " + subiter + " iterations"  if subiter > 5
    if subiter >= subiterCount
      CirSim.halt "Convergence failed: " + subiter, null
      break
    CirSim.t += CirSim.timeStep
    i = 0
    while i < CirSim.scopeCount
      CirSim.scopes[i].timeStep()
      ++i
    tm = (new Date()).getTime()
    lit = tm
    
    #console.log("diff: " + (tm-CirSim.lastIterTime) + " iter: " + iter + " ");
    #console.log(iterCount + " breaking from iteration: " + " sr: " + steprate + " iter: " + subiter + " time: " + (tm - CirSim.lastIterTime)+ " lastFrametime: " + CirSim.lastFrameTime );
    #iterCount++;
    if iter * 1000 >= steprate * (tm - CirSim.lastIterTime)
      
      #console.log("1 breaking from iteration: " + " sr: " + steprate + " iter: " + subiter + " time: " + (tm - CirSim.lastIterTime)+ " lastFrametime: " + CirSim.lastFrameTime );
      break
    
    #console.log("2 breaking from iteration: " + " sr: " + steprate + " iter: " + iter + " time: " + (tm - CirSim.lastIterTime) + " lastFrametime: " + CirSim.lastFrameTime );
    else break  if tm - CirSim.lastFrameTime > 500
    ++iter
  CirSim.lastIterTime = lit


###
lu_factor: finds a solution to a factored matrix through LU (Lower-Upper) factorization

Called once each frame for resistive circuits, otherwise called many times each frame

@param a 2D matrix to be solved
@param n dimension
@param ipvt pivot index
###
CirSim.lu_factor = (a, n, ipvt) ->
  i = 0
  j = 0
  k = 0
  
  # Divide each row by largest element in that row and remember scale factors
  i = 0
  while i < n
    largest = 0
    j = 0
    while j < n
      x = Math.abs(a[i][j])
      largest = x  if x > largest
      ++j
    
    # Check for singular matrix:
    return false  if largest is 0
    CirSim.scaleFactors[i] = 1.0 / largest
    ++i
  
  # Crout's method: Loop through columns first
  j = 0
  while j < n
    
    # Calculate upper trangular elements for this column:
    i = 0
    while i < j
      q = a[i][j]
      k = 0
      while k isnt i
        q -= a[i][k] * a[k][j]
        ++k
      a[i][j] = q
      ++i
    
    # Calculate lower triangular elements for this column
    largest = 0
    largestRow = -1
    i = j
    while i < n
      q = a[i][j]
      k = 0
      while k < j
        q -= a[i][k] * a[k][j]
        ++k
      a[i][j] = q
      x = Math.abs(q)
      if x >= largest
        largest = x
        largestRow = i
      ++i
    
    # Pivot
    unless j is largestRow
      x = undefined
      k = 0

      while k < n
        x = a[largestRow][k]
        a[largestRow][k] = a[j][k]
        a[j][k] = x
        ++k
      CirSim.scaleFactors[largestRow] = CirSim.scaleFactors[j]
    
    # keep track of row interchanges
    ipvt[j] = largestRow
    
    # avoid zeros
    
    #console.log("avoided zero");
    a[j][j] = 1e-18  if a[j][j] is 0
    unless j is n - 1
      mult = 1 / a[j][j]
      i = j + 1
      while i isnt n
        a[i][j] *= mult
        ++i
    ++j
  true


###
Step 2: lu_solve: Called by lu_factor

finds a solution to a factored matrix through LU (Lower-Upper) factorization

Called once each frame for resistive circuits, otherwise called many times each frame

@param a matrix to be solved
@param n dimension
@param ipvt pivot index
@param b factored matrix
###
CirSim.lu_solve = (a, n, ipvt, b) ->
  i = undefined
  
  # find first nonzero b element
  i = 0
  while i < n
    row = ipvt[i]
    swap = b[row]
    b[row] = b[i]
    b[i] = swap
    break  unless swap is 0
    ++i
  bi = i++
  while i < n
    row = ipvt[i]
    j = undefined
    tot = b[row]
    b[row] = b[i]
    
    # Forward substitution by using the lower triangular matrix;
    j = bi
    while j < i
      tot -= a[i][j] * b[j]
      ++j
    b[i] = tot
    ++i
  i = n - 1
  while i >= 0
    tot = b[i]
    
    # back-substitution using the upper triangular matrix
    j = undefined
    j = i + 1
    while j isnt n
      tot -= a[i][j] * b[j]
      ++j
    b[i] = tot / a[i][i]
    i--


###
Local Utility function
###
CirSim.snapGrid = (x) ->
  (x + CirSim.gridRound) & CirSim.gridMask


###
Computes the Euclidean distance between two points
###
CirSim.distanceSq = (x1, y1, x2, y2) ->
  x2 -= x1
  y2 -= y1
  x2 * x2 + y2 * y2

CirSim.readHint = (st) ->
  st = st.split(" ")  if typeof st is "string"
  CirSim.hintType = st[0]
  CirSim.hintItem1 = st[1]
  CirSim.hintItem2 = st[2]


# ****************************************************************
#   ****************************************************************
#       Errors and Warnings
#   ****************************************************************
#   ***************************************************************
CirSim.errorStack = new Array()
CirSim.warningStack = new Array()
CirSim.error = (msg) ->
  console.log "Error: " + msg
  CirSim.errorStack.push msg
  CirSim.drawError()

CirSim.drawError = ->
  msg = ""
  i = 0

  while i < CirSim.errorStack.length
    msg += CirSim.errorStack[i] + "\n"
    ++i
  console.error "Simulation Error: " + msg
  
  # TODO: CANVAS
  #paper.text(150, getCanvasBounds().height - 50, msg).attr('fill', Color.color2HexString(Settings.ERROR_COLOR));
  paper.fillText msg, 150, getCanvasBounds().height - 50

CirSim.warning = (msg) ->
  console.log "Warning: " + msg
  CirSim.warningStack.push msg
  CirSim.drawWarning()

CirSim.drawWarning = ->
  msg = ""
  i = 0

  while i < CirSim.warningStack.length
    msg += CirSim.warningStack[i] + "\n"
    ++i
  
  #paper.text(150, getCanvasBounds().height - 70, msg).attr('fill', Color.color2HexString(Settings.WARNING_COLOR));
  paper.fillText msg, 150, getCanvasBounds().height - 70
