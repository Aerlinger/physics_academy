/**
 * loadBox2dFromJSON
 *
 * Imports a .JSON file from Physics Body Editor (http://www.aurelienribon.com/blog/projects/physics-body-editor/)
 * and populates a box2d world with the data.
 *
 * @param json The .json object to be loaded
 * @param CanvasElmJQuery The jquery selector of the HTML5 canvas_width element
 */
function loadBox2dFromJSON(json, CanvasElmJQuery) {
  "use strict";

  console.log("Reading Box2D JSON Parameters:");
  CanvasElmJQuery.siblings("a").text(json.description);

  console.log(json.description);

  var scale = 5;

  /*------------------------------------------------------------------
   [1. Load and create the world from JSON
   */
  if (json.hasOwnProperty("World")) {
    var worldParamsJSON = json["World"];
    var world = readAndCreateWorld(worldParamsJSON, CanvasElmJQuery);
  } else {
    throw new Error("No world defined in b2params object.")
  }

  /*------------------------------------------------------------------
   [Step 2. Get the JSON for this specific body
   */
  var rigidBodyIndex = 0;
  var bodyElemJSON = json.rigidBodies[rigidBodyIndex];

  /*------------------------------------------------------------------
   [Step 3. Create user-specific data
   */
  var imgPath = bodyElemJSON["imagePath"] ? bodyElemJSON["imagePath"] : null;

  // Body Model (merged from multiple convex polygons via a weld joint)
  var PolyBodyDef = new b2BodyDef();

  PolyBodyDef.position.Set(3, 3);

  // TODO: In the future these parameters may need to be set through JSON as well
  PolyBodyDef.type = b2Body.b2_dynamicBody;
  PolyBodyDef.restitution = 1.0;
  PolyBodyDef.mass = 500;
  PolyBodyDef.friction = 1;
  PolyBodyDef.angularDamping = 0;

  var model = world.CreateBody(PolyBodyDef);
  model.SetUserData({
    name:bodyElemJSON.name,
    imagePath:imgPath,
    imgObj:new Image()
  });

  /*------------------------------------------------------------------
   [Step 4. Read and create polygons and circles from JSON data
   */
  var polygonsElemJSON = bodyElemJSON.polygons;

  for (var ii = 0; ii < polygonsElemJSON.length; ii++)
    readAndCreatePolygon(model, polygonsElemJSON[ii], scale);

  // Load each circle from the JSON data
  var circlesElemJSON = bodyElemJSON.circles;

  for (var ii = 0; ii < circlesElemJSON.length; ii++)
    readAndCreateCircle(world, circlesElemJSON[ii], scale);

  var modelDim = getDimensionInMeters(model);
  model.GetUserData().width   = modelDim.width;
  model.GetUserData().height  = modelDim.height;

  return world;
}

function getDimensionInMeters(PolygonBody) {
  "use strict";

  var position = PolygonBody.GetPosition();
  var FixtureNode = PolygonBody.GetFixtureList();

  var minX = Number.MAX_VALUE;
  var minY = Number.MAX_VALUE;
  var maxX = Number.MIN_VALUE;
  var maxY = Number.MIN_VALUE;

  // Loop through each Fixture in this polygon definition
  while(FixtureNode) {

    var CurrentFixtureNode = FixtureNode;
    FixtureNode = FixtureNode.GetNext();

    var vertices = CurrentFixtureNode.GetShape().GetVertices();

    // Loop through each vertex within this polygon draw the line from the previous vertex to this one.
    for (var i = 0; i < vertices.length; i++) {
      var v = b2Math.AddVV(position, b2Math.MulMV(PolygonBody.m_xf.R, vertices[i]));

      minX = Math.min(v.x, minX);
      minY = Math.min(v.y, minY);
      maxX = Math.max(v.x, maxX);
      maxY = Math.max(v.y, maxY);

    }

    var poly_width = Math.abs(maxX-minX);
    var poly_height = Math.abs(maxY-minY);

  }

  return {width: poly_width, height: poly_height};

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

  CanvasElmJQuery.siblings("a").css("maxWidth", world.widthInPixels - 30);

  console.log("Height: " + world.heightInPixels);

  world.widthInMeters = world.widthInPixels / world.pixelsToMeters;
  world.heightInMeters = world.heightInPixels / world.pixelsToMeters;

  console.log("Pixels to meters: " + world.pixelsToMeters);
  console.log("Width in pixels: " + world.widthInPixels);
  console.log("Height in pixels: " + world.heightInPixels);
  console.log("Time Step: " + world.timeStep);
  console.log("Debug: " + world.debug);

  world.destroyAllBodies();

  return world;
}


/**
 * readAndCreatePolygon Creates a new concave polygon fixture from a list of vertices (x,y pairs) stored in JSON.
 * Vertices must be listed in clockwise order based on their position. There are usually many concave polygons per
 * Rigid body.
 *
 * @param world world object for this polygon to be placed
 * @param polygonsElemJSON Array of x, y pairs from which to create this polygon
 */
function readAndCreatePolygon(polyBodyDef, polygonsElemJSON, scale) {
  "use strict";

  var polyFixDef = new b2FixtureDef;

  polyFixDef.shape = new b2PolygonShape;

  // Array of vertex X, Y pairs (ex. [[x1, y1],[x2, y2], [x3, y3], ... ])
  var vertices = new Array();

  polyFixDef.density = 1.0;
  polyFixDef.friction = 0.0;
  polyFixDef.restitution = 1.0;

  var minX = Number.MAX_VALUE;
  var minY = Number.MAX_VALUE;
  var maxX = Number.MIN_VALUE;
  var maxY = Number.MIN_VALUE;

  // for each vertex in this polygon
  for (var iii = 0; iii < polygonsElemJSON.length; iii++) {
    var vertexElem = polygonsElemJSON[iii];

    var vx = vertexElem.x * scale;
    var vy = vertexElem.y * scale;

    minX = Math.min(vx, minX);
    minY = Math.min(vy, minY);
    maxX = Math.max(vx, maxX);
    maxY = Math.max(vy, maxY);

    vertices.push(new b2Vec2(vx, vy));
  }

  var poly_width = Math.abs(maxX-minX);
  var poly_height = Math.abs(maxY-minY);

  // Create a new Box2d fixture definition from the loaded vertices.
  polyFixDef.shape.SetAsArray(vertices);

  polyBodyDef.CreateFixture(polyFixDef);

  return new Point(poly_width, poly_height);
}


/**
 * readAndCreateCircle Creates a new static circle element from a position (x,y) and radius.
 *
 * @param world world object for this circle to be placed
 * @param polygonsElemJSON JSON Data for circle's position and radius
 */
function readAndCreateCircle(world, circleElemJSON, scale) {
  "use strict";

  var circleFixDef = new b2FixtureDef;
  var circleBodyDef = new b2BodyDef;

  circleFixDef.density = 1.0;
  circleFixDef.friction = 0.0;
  circleFixDef.restitution = 1.0;
  circleFixDef.shape = new b2CircleShape(circleElemJSON.r * scale);

  circleBodyDef.position.x = circleElemJSON.cx * scale;
  circleBodyDef.position.y = circleElemJSON.cy * scale;
  circleBodyDef.mass = 1;

  world.CreateBody(circleBodyDef).CreateFixture(circleFixDef);

}

/**
 * destroyAllBodies Destroys all bodies and removes them from the world, as its name implies.
 */
b2World.prototype.destroyAllBodies = function () {

  var node = this.GetBodyList();
  while (node) {
    var body = node;
    node = node.GetNext();
    this.DestroyBody(body);
  }

}