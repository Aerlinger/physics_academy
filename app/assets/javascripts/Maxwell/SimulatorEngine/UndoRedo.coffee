class UndoRedoHandler

  constructor: ->
    clear()

  pushRedo: (action) ->
    redoStack.push(action)

  popRedo: ->
    redoStack.pop()

  pushUndo: (action) ->
    undoStack.push(action)

  popUndo: ->
    redoStack.pop()

  clearUndo: ->
    undoStack = new Array()

  clearRedo: ->
    redoStack = new Array()

  clear: ->
    undoStack = new Array()
    redoStack = new Array()
