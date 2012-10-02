class Log

  errorStack = new Array()
  warningStack = new Array()

  error: (msg) ->
    console.log "Error: " + msg
    errorStack.push msg
    drawError()

  warn: (msg) ->
    console.log "Warning: " + msg
    warningStack.push msg
    drawWarning()

  drawWarning: (context) ->
    msg = ""

    for warning in warningStack
      msg += warning + "\n"

    console.error "Simulation Error: " + msg
    context.fillText msg, 150, 70

  drawError: (context) ->
    msg = ""

    for error in errorStack
      msg += error + "\n"

    console.error "Simulation Error: " + msg
    context.fillText msg, 150, 50