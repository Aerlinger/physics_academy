/**
 * loadBox2dFromJSON
 *
 * Imports a .JSON file from Physics Body Editor (http://www.aurelienribon.com/blog/projects/physics-body-editor/)
 * and populates a box2d world with the data.
 *
 * @param jsonPath The url of the JSON file to be loaded
 * @param CanvasJQueryElm The jQuery selector of the HTML5 element
 * @param onComplete external callback called when loading is complete
 */
function loadBox2dFromJSON(jsonPath, CanvasJQueryElm, onComplete) {
  "use strict";

  console.log("\tLoading " + jsonPath);

  $.getJSON(jsonPath, function (jsonData) {

    console.log("\tJSON loaded: " + jsonData.description);

    /*------------------------------------------------------------------
     [1. Load and create the world from JSON
     */
    if (jsonData.hasOwnProperty("World"))
      var world = readAndCreateWorld(jsonData["World"], CanvasJQueryElm);
    else
      throw new Error("No world defined.")

    /*------------------------------------------------------------------
     [Step 2. Read and create polygons and circles from JSON data
     */
    var bodiesJSON = jsonData.bodies;

    if (bodiesJSON) {
      // Load each Polygon from JSON
      for (var i = 0; i < bodiesJSON.polygons.length; ++i) {

        var currentPolygonJSON = bodiesJSON.polygons[i];
        var verticesElemJSON = currentPolygonJSON.vertices;

        if (!verticesElemJSON || verticesElemJSON.length == 0)
          continue;

        var PolyBodyDef = new b2BodyDef();
        PolyBodyDef.type = b2Body.b2_dynamicBody;

        var newBody = world.CreateBody(PolyBodyDef);
        newBody.initialBounds = {minX:Number.MAX_VALUE, minY:Number.MAX_VALUE,
          maxX:Number.MIN_VALUE, maxY:Number.MIN_VALUE};
        newBody.name = currentPolygonJSON.name;
        newBody.imagePath = util.splicePaths(jsonPath, currentPolygonJSON.imagePath);

        // For each Polygon within each rigid body:
        for (var ii = 0; ii < verticesElemJSON.length; ii++)
          readAndCreatePolygon(newBody, verticesElemJSON[ii]);

        newBody.SetPosition(new b2Vec2(currentPolygonJSON.origin.x, currentPolygonJSON.origin.y));
        alignPolygon(newBody);
      }

      // Load Each circle from JSON
      var circlesElemJSON = bodiesJSON.circles;
      for (var i = 0; i < circlesElemJSON.length; i++)
        readAndCreateCircle(world, circlesElemJSON[i], 1);

    }

    /*------------------------------------------------------------------
     [Step 3. Read and create joints from JSON data
     */
    var jointsJSON = jsonData.joints;
    if(jointsJSON) {
      for(var i=0; i<jointsJSON.length; ++i) {
        readAndCreateJoint(world, jointsJSON);
      }
    }

    onComplete(world, jsonData);
    return world;

  });


  /**
   * readAndCreatePolygon Creates a new concave polygon fixture from a list of vertices (x,y pairs) stored in JSON.
   * Vertices must be listed in clockwise order based on their position. There are usually many concave polygons per
   * Rigid body.
   *
   * @param world world object for this polygon to be placed
   * @param polygonsElemJSON Array of x, y pairs from which to create this polygon
   */
  function readAndCreatePolygon(polyBodyDef, polygonsElemJSON) {
    "use strict";

    var polyFixDef = new b2FixtureDef;

    polyFixDef.shape = new b2PolygonShape;

    // Array of vertex X, Y pairs (ex. [[x1, y1],[x2, y2], [x3, y3], ... ])
    var vertices = new Array();

    polyFixDef.density = 1.0;
    polyFixDef.friction = 0.0;
    polyFixDef.restitution = 1.0;

    var scale = 10;

    // for each vertex in this polygon
    for (var i = 0; i < polygonsElemJSON.length; i++) {
      var vertexElem = polygonsElemJSON[i];

      var vx = vertexElem.x * scale;
      var vy = vertexElem.y * scale;

      polyBodyDef.initialBounds.minX = Math.min(vx, polyBodyDef.initialBounds.minX);
      polyBodyDef.initialBounds.minY = Math.min(vy, polyBodyDef.initialBounds.minY);
      polyBodyDef.initialBounds.maxX = Math.max(vx, polyBodyDef.initialBounds.maxX);
      polyBodyDef.initialBounds.maxY = Math.max(vy, polyBodyDef.initialBounds.maxY);

      vertices.push(new b2Vec2(vx, vy));
    }

    // Create a new Box2d fixture definition from the loaded vertices.
    polyFixDef.shape.SetAsArray(vertices);

    polyBodyDef.CreateFixture(polyFixDef);
  }


  function alignPolygon(PolygonBody) {
    "use strict";

    var minX = PolygonBody.initialBounds.minX;
    var minY = PolygonBody.initialBounds.minY;
    var maxX = PolygonBody.initialBounds.maxX;
    var maxY = PolygonBody.initialBounds.maxY;

    var FixtureNode = PolygonBody.GetFixtureList();

    var offsetX = (maxX - minX) / 2 + minX;
    var offsetY = (maxY - minY) / 2 + minY;

    // Loop through each Fixture in this polygon definition
    while (FixtureNode) {
      var CurrentFixtureNode = FixtureNode;
      FixtureNode = FixtureNode.GetNext();

      var vertices = CurrentFixtureNode.GetShape().GetVertices();

      // Loop through each vertex within this polygon draw the line from the previous vertex to this one.
      for (var i = 0; i < vertices.length; i++) {
        vertices[i].x -= offsetX;
        vertices[i].y -= offsetY;
      }
    }

    PolygonBody.width = Math.abs(maxX - minX);
    PolygonBody.height = Math.abs(maxY - minY);

    PolygonBody.ResetMassData();
  }


  /**
   * readAndCreateCircle Creates a new static circle element from a position (x,y) and radius.
   *
   * @param world world object for this circle to be placed
   * @param polygonsElemJSON JSON Data for circle's position and radius
   */
  function readAndCreateCircle(world, circleElemJSON, scale) {
    "use strict";

    if (!scale)
      scale = 1;

    var circleFixDef = new b2FixtureDef;
    var circleBodyDef = new b2BodyDef;

    circleFixDef.density = circleElemJSON.density;
    circleFixDef.friction = 0.0;
    circleFixDef.restitution = circleElemJSON.restitution;
    circleFixDef.shape = new b2CircleShape(circleElemJSON.radius * scale);

    circleBodyDef.type = b2Body.b2_dynamicBody;
    circleBodyDef.position.x = circleElemJSON.origin.x * scale;
    circleBodyDef.position.y = circleElemJSON.origin.y * scale;

    circleBodyDef.linearVelocity = circleElemJSON.velocity;

    var newCircle = world.CreateBody(circleBodyDef);
    newCircle.CreateFixture(circleFixDef);

    newCircle.width = newCircle.height = 2 * circleFixDef.shape.GetRadius();

    newCircle.massive = circleElemJSON.massive;

    newCircle.name = circleElemJSON.name;
    newCircle.imagePath = util.splicePaths(jsonPath, circleElemJSON.imagePath);
  }

  /**
   * Loads and creates a joint from JSON data.
   *
   * @param world
   * @param jointsJSON
   */
  function readAndCreateJoint(world, jointsJSON) {

    if(jointsJSON) {

      for(var i=0; i<jointsJSON.length; ++i) {
        var jointData = jointsJSON[i];
        var jointType = jointData.type;

        switch(jointType) {
          case("b2RevoluteJoint"):
            console.log("Creating b2RevoluteJoint");
            jointLoader.loadRevoluteJoint(world, jointData);
            break;
          case("b2DistanceJoint"):
            console.log("Creating b2DistanceJoint");
            jointLoader.loadDistanceJoint(world, jointData);
            break;
          case("b2PrismaticJoint"):
            jointLoader.loadPrismaticJoint(world, jointData);
            console.log("Creating b2PrismaticJoint");
            break;
          case("b2PulleyJoint"):
            jointLoader.loadPulleyJoint(world, jointData);
            console.log("Creating b2PulleyJoint");
            break;
        }
      }
    }
  }


  /**
   * readAndCreateWorld Creates a new world from JSON Data
   *
   * @param worldParamsJSON JSON parameters for the newly created world
   * @param CanvasElmJQuery jQuery element of the HTML5 canvas where this world is being created
   * @return {b2World} Newly created Box2d world.
   */
  function readAndCreateWorld(worldParamsJSON, CanvasElmJQuery) {
    "use strict";

    // 30 pixels per meter is the default in Box2dJS
    var BOX2D_PIXELS_TO_METERS_DEFAULT = 30;

    var GravityVector = new b2Vec2(worldParamsJSON.gravity[0], worldParamsJSON.gravity[1])
    var doSleep = worldParamsJSON["doSleep"];

    var world = new b2World(GravityVector, doSleep);

    world.debug = worldParamsJSON.debug;

    if (worldParamsJSON.timeStep)
      world.timeStep = worldParamsJSON.timeStep;

    if (worldParamsJSON.velocityIterations)
      world.velocityIterations = worldParamsJSON.velocityIterations;

    if (worldParamsJSON.positionIterations)
      world.positionIterations = worldParamsJSON.positionIterations;

    // Set application-specific parameters
    world.pixelsToMeters = BOX2D_PIXELS_TO_METERS_DEFAULT;

    // Get the dimensions of the canvas in pixels (toFixed(1) is used to convert from an int to a float)
    world.widthInPixels = CanvasElmJQuery.width();
    world.heightInPixels = CanvasElmJQuery.height();

    console.log("Height: " + world.heightInPixels);

    world.widthInMeters = world.widthInPixels / world.pixelsToMeters;
    world.heightInMeters = world.heightInPixels / world.pixelsToMeters;

    world.destroyAllBodies();
    world.backgroundURL = worldParamsJSON.backgroundURL;

    if (worldParamsJSON.bounded)
      createBounds(world);
    if (worldParamsJSON.createBalls)
      createBalls(world);

    return world;
  }
}


/**
 * destroyAllBodies Destroys all bodies and removes them from the world.
 */
b2World.prototype.destroyAllBodies = function () {
  var node = this.GetBodyList();

  while (node) {
    var body = node;
    node = node.GetNext();
    this.DestroyBody(body);
  }
}