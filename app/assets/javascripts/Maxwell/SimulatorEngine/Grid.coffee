class Grid
  constructor: (@gridSize=10, @gridMask=10, @gridRound=10) ->

  snapGrid: (x) ->
    (x + @gridRound) & @gridMask;

