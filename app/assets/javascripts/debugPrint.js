function printHash(HashObj) {
  "use strict";
  if(HashObj.hasOwnProperty("id")) {
    console.log( HashObj["id"] + ":" );
  }
  for( var key in HashObj ) {

    if(HashObj[key] instanceof Array) {
      printArray(HashObj);
    } else {
      console.log(key + " -> " + HashObj[key]);
    }

  }
}

/**
 * Recursively traverses an array, outputting the value of each element
 * @param ArrayObj
 */
function printArray(ArrayObj, indentLevel) {
  "use strict";

  if(!indentLevel)
    indentLevel = "";

  if((ArrayObj instanceof Object)) {
    printHash(ArrayObj);
  }

  // Base case
  if(!(ArrayObj instanceof Array)) {
    console.log(indentLevel + ArrayObj);
    return;
  }

  for(var i=0; i<ArrayObj.length; ++i) {
    printArray(ArrayObj[i], indentLevel + "\t");
  }
}