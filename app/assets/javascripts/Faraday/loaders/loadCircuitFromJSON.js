/**
 * loadCircuitFromJSON
 *
 * Imports a .JSON file representing a circuit and builds a circuit with the data.
 *
 * @param jsonPath The url of the JSON file to be loaded
 * @param CanvasJQueryElm The jQuery selector of the HTML5 element
 * @param onComplete external callback called when loading is complete
 */
function loadCircuitFromJSON(jsonPath, CanvasJQueryElm, onComplete) {
  "use strict";

  $.getJSON(jsonPath, function(jsonData) {

    Circuit.init();

    Circuit.undoStack = new Array();
    //readSetupList(false);

    var simParams = jsonData.shift();
    Circuit.clearAll();

    readSimulationParams(simParams);
    readCircuitFromJSON(jsonData);

    onComplete(jsonData);
  });

  /**
   * Reads the default parameters for the Simulator from the simulation file. Which is the first line starting with a '$'
   *
   * Parameters: flags, time_step, simulation_speed, current_speed, voltage_range, power_range
   *
   * Example:
   *
   * $ 1 5.0E-6 11.251013186076355 50 5.0 50
   *  */
   function readSimulationParams(params) {

    var flags = Math.floor(params.flags);


    Circuit.dotsCheckItem = ((flags & 1) != 0);
    Circuit.smallGridCheckItem = ((flags & 2) != 0);
    Circuit.voltsCheckItem = ((flags & 4) == 0);
    Circuit.powerCheckItem = ((flags & 8) == 8);
    Circuit.showValuesCheckItem = ((flags & 16) == 0);

    Circuit.timeStep = Number(params.time_step);

    var sp = Number(params.sim_speed);
    var sp2 = Math.floor(24*Math.log(10*sp) + 1.5);

    Circuit.speedBar = sp2;
    Circuit.currentBar = Math.floor(params.current_speed);

    var vrange = Number(params.voltage_range);
    CircuitElement.voltageRange = vrange;

    var powerBar;
    if (powerBar = params.power_range)
      Circuit.powerBar = Math.floor(powerBar);

    Circuit.setGrid();
  };

  function readCircuitFromJSON(jsonData) {

    for (var i=0; i<jsonData.length; i++) {
      var circuitElementJSON = jsonData[i];

      var type = circuitElementJSON.sym;

      if (type == ('$')) {
        Error("Options should be declared in the first line of the circuit file.");
        break;
      }

      if (type == 'o') {
        //var sc = new Scope();
        //sc.position = Circuit.scopeCount;
        //sc.undump(circuitElementJSON);
        //Circuit.scopes[Circuit.scopeCount++] = sc;
        break;
      }
      if (type == ('h')) {
        Circuit.readHint(circuitElementJSON);
        break;
      }
      if (type == ('%') || type == ('?') || type == ('B')) {
        // ignore filter-specific stuff
        break;
      }

      if (type >= ('0') && type <= ('9'))
        type = parseInt(type);

      var x1 = Math.floor(circuitElementJSON.x1);
      var y1 = Math.floor(circuitElementJSON.y1);
      var x2 = Math.floor(circuitElementJSON.x2);
      var y2 = Math.floor(circuitElementJSON.y2);
      var f = Math.floor(circuitElementJSON.flags);

      var cls = Circuit.dumpTypes[type];

      if (cls == null) {
        Circuit.error("unrecognized dump type: " + type);
        break;
      }

      // ===================== NEW ELEMENTS ARE INSTANTIATED HERE ============================================
      var newElm = Circuit.constructElement(cls, x1, y1, x2, y2, f, circuitElementJSON.params);
      console.log(newElm);
      newElm.setPoints();
      // =====================================================================================================

      // Add the element to the Element list
      Circuit.elementList.push(newElm);
    }

    Circuit.needAnalyze();
    Circuit.handleResize();
  }

  /** Retrieves string data from a circuit text file (via AJAX GET) */
  function readCircuitFromFile (circuitFileName, retain) {

    var result = $.get(js_asset_path + 'circuits/'+circuitFileName, function (b) {

      if (!retain)
        Circuit.clearAll();

      Circuit.readCircuitFromString(b);

      if (!retain)
        Circuit.handleResize(); // for scopes
    });

  }

  /** Reads a circuit from a string buffer after loaded from from file.
   * Called when the defaultCircuitFile is finished loading */
  function readCircuitFromString(b) {
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

  }

}