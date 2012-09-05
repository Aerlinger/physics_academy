class CircuitElement

  point1: new Point(50, 100)
  point2: new Point(50, 150)
  lead1: new Point(0, 100)
  lead2: new Point(0, 150)
  volts = [0, 0]

  current = 0
  curcount = 0

  noDiagonal: false
  selected: false


  constructor(@x1, @y1, @x2, @y2, f, st...) ->
    @flags = if isNaN(f) @getDefaultFlags() else f

    @allocNodes()
    @initBoundingBox()

  setCircuit: (circuit) ->
    @circuit = circuit

  allocNodes: ->
    @nodes = new Array(@getPostCount() + @getInternalNodeCount())
    @volts = new Array(@getPostCount() + @getInternalNodeCount())

    @nodes = zeroArray(@nodes)
    @nodes = zeroArray(@nodes)

  setPoints: ->
    @dx = @x2 - @x
    @dy = @y2 - @y
    @dn = Math.sqrt(@dx * @dx + @dy * @dy)
    @dpx1 = @dy / @dn
    @dpy1 = -@dx / @dn
    @dsign = (if (@dy is 0) then sign(@dx) else sign(@dy))
    @point1 = new Point(@x, @y)
    @point2 = new Point(@x2, @y2)

  zeroArray: (array) ->
    array = (0 for element in array)


  setColor: (color) ->
    @color = color

  getDefaultFlags: ->
    0

  getDumpType: ->
    0

  # Todo: implement me
  getDumpClass: ->
    "Needs implementation"

  toString: ->
    "Circuit Element"

  isSelected: ->

  initBoundingBox: ->
    @boundingBox = new Rectangle()

    @boundingBox.x1 = Math.min(@x1, @x2);
    @boundingBox.y = Math.min(@y, @y2);
    @boundingBox.width = Math.abs(@x2 - @x1) + 1;
    @boundingBox.height = Math.abs(@y2 - @y) + 1;

    CircuitElement.ps1 = new Point(0, 0)
    CircuitElement.ps2 = new Point(0, 0)


    #			shortFormat = new flash.globalization.NumberFormatter(LocaleID.DEFAULT);
    #			shortFormat.fractionalDigits = 1;
    #			showFormat = new flash.globalization.NumberFormatter(LocaleID.DEFAULT);
    #			showFormat.fractionalDigits = 2;
    #			showFormat.leadingZero = true;
    #			noCommaFormat = new flash.globalization.NumberFormatter(LocaleID.DEFAULT);
    #			noCommaFormat.fractionalDigits = 10;
    #			noCommaFormat.useGrouping = false;

  dump: ->
    getDumpType() + " " + @x1 + " " + @y + " " + @x2 + " " + @y2 + " " + @flags;

  reset: ->
    volts = 0 for volt in volts
    curcount = 0;

  draw: ->