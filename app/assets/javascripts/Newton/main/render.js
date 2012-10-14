/**
 * Renders the Box2D world object on an HTML5 canvas.
 *
 * @param world The Box2D world which will be updated and rendered
 * @param mouseResponder Checks mouse position and updates world from mouse clicks/moves each frame.
 * @param CanvasElmJQuery JQuery DOM element of the HTML5 canvas. This is where rendering will occur.
 * @return {*}
 */
function render(world, mouseResponder, CanvasElmJQuery) {
  "use strict";

  // The context is derived from the DOM element of the canvas jQuery selector
  var renderContext = CanvasElmJQuery.get(0).getContext("2d");

  var hasTextures = false;
  var numTexturesLoaded = 0;
  var numTexturesToBeLoaded = 0;
  var interval_id = null;

  preloadTextures();
  if(!hasTextures)
    start();

  if(world.debug) {
    console.log("\tIn debug mode");
    loadDebug();
  }


  /**
   * Sets drawing parameters for debug mode.
   */
  function loadDebug() {
    "use strict";

    var debugDraw = new b2DebugDraw();

    debugDraw.SetSprite(renderContext);
    debugDraw.SetDrawScale(world.pixelsToMeters);
    debugDraw.SetFillAlpha(1);
    debugDraw.SetLineThickness(3.0);
    debugDraw.SetFlags()
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

    world.SetDebugDraw(debugDraw);
  }


  /**
   * Starts the render loop through a setInterval function. Rendering is not started until this function is called.
   *
   * @return the intervalId of window.setInterval (used for pausing/clearing).
    */
  function start() {
    "use strict";
    numTexturesLoaded++;
    if(numTexturesLoaded >= numTexturesToBeLoaded) {
      console.log("Starting render: " + CanvasElmJQuery.attr('class'));
      interval_id = window.setInterval(updateAndRender, world.timeStep);
    }
    return interval_id;
  }


  /**
   * Fetches the image data for each Body (if it exists) and preloads it for rendering.
   */
  function preloadTextures() {
    "use strict";

    var BodyNode = world.GetBodyList();

    // For each body in the world
    while (BodyNode) {

      var CurrentBodyNode = BodyNode;
      BodyNode = BodyNode.GetNext();

      // If this body has an image, preload that image
      if (CurrentBodyNode.imagePath) {
        numTexturesToBeLoaded++;
        preloadImageFromBody(CurrentBodyNode);
      }

    }
  }


  /**
   * Fetches the image data for each Body (if it exists) and preloads it for rendering.
   */
  function preloadImageFromBody(Body) {
    "use strict";

    var imageObj = new Image();
    imageObj.onload = start;
    imageObj.src = Body.imagePath;

    Body.imageObj = imageObj;
    hasTextures = true;
  }


  /**
   * Updates and renders a single frame. This involves four steps:
   *
   * 1. Clear canvas
   * 2. Handle mouse event
   * 3. Call render (loops through every object in the world and draws that object)
   * 4. Clear world forces
   */
  function updateAndRender() {

    renderContext.clearRect(0, 0, world.widthInPixels, world.heightInPixels);

    if(mouseResponder)
      mouseResponder.queryMouseAndUpdateWorld();

    world.Step(world.timeStep, world.velocityIterations, world.positionIterations);
    applyGravity();


    if (world.debug)
      world.DrawDebugData();

    render();

    world.ClearForces();
  }


  /**
   * Iterates through each object in the world, and applies a Newtonian model of gravity (i.e. g*m1*m2/r^2)
   *
   * Note: This function has O(n^2) complexity.
   */
  function applyGravity() {

    //world.ClearForces();

    var BodyNode = world.GetBodyList();

    // For each body
    while (BodyNode) {

      var CurrentBodyNode = BodyNode;
      var SubNode = CurrentBodyNode.GetNext();

      while(SubNode) {

        var CurrentSubNode = SubNode;

        var xDiff = CurrentSubNode.GetPosition().x - CurrentBodyNode.GetPosition().x;
        var yDiff = CurrentSubNode.GetPosition().y - CurrentBodyNode.GetPosition().y;

        var m1 = CurrentBodyNode.GetMass();
        var m2 = CurrentSubNode.GetMass();
        var gravityVec = new b2Vec2(xDiff, yDiff);

        var rMagSquared = gravityVec.LengthSquared();
        var gCoeff = .009;
        var force = gCoeff*m1*m2/(rMagSquared);

        gravityVec.Normalize();
        gravityVec.Multiply(force);

        CurrentBodyNode.ApplyForce(gravityVec, CurrentBodyNode.GetPosition());
        CurrentSubNode.ApplyForce(gravityVec.GetNegative(), CurrentSubNode.GetPosition());

        SubNode = CurrentSubNode.GetNext();

      }

      BodyNode = BodyNode.GetNext();
    }
  }


  /**
   * Iterates through list of objects in the world, drawing each one based on its type (circle, image, or polygon)
   */
  function render() {

    if(!world.backgroundURL)
      drawGrid();

    var BodyNode = world.GetBodyList();

    // For each body
    while (BodyNode) {

      var CurrentBodyNode = BodyNode;
      BodyNode = BodyNode.GetNext();

      // Canvas Y coordinates start at opposite location, so we flip.
      var FixtureNode = CurrentBodyNode.GetFixtureList();
      if (!FixtureNode) {
        throw BodyNode.name + " has no fixture data!";
        continue;
      }

      var shape = FixtureNode.GetShape();

      if (shape.GetType() == b2Shape.e_circleShape)
        drawCircle(CurrentBodyNode, shape.GetRadius());

      if (shape.GetType() == b2Shape.e_polygonShape)
        drawPolygon(CurrentBodyNode);

    }
  }


  /**
   * Draws a circle from a b2Body
   *
   * @param Body The circle object as a b2Body.
   * @param radius radius of the circle in meters.
   */
  function drawCircle(Body, radius) {
    "use strict";

    if (Body.imagePath)
      drawImage(Body);
  }


  /**
   * Iterates through each fixture within a PolygonBody and draws an outline for that fixture. A polygon
   * has many fixtures, and each fixture has many vertices. Each fixture is drawn by connecting the vertices of that
   * fixture.
   *
   * @param PolygonBody The Polygon to be drawn.
   */
  function drawPolygon(PolygonBody) {
    "use strict";

    if (PolygonBody.imagePath)
      drawImage(PolygonBody);
  }


  /**
   * Draws an image from the UserData on a body.
   *
   * @param Body body containing the image to be drawn.
   */
  function drawImage(Body) {
    "use strict";

    var position = Body.GetPosition();

    var bodyWidthPixels   = Body.width * world.pixelsToMeters;
    var bodyHeightPixels  = Body.height * world.pixelsToMeters;

    renderContext.save();

    var imageObj = Body.imageObj;

    var scaleX = bodyWidthPixels/imageObj.width;
    var scaleY = bodyHeightPixels/imageObj.height;

    // Translate to the center of the object, then flip and scale appropriately
    renderContext.translate(position.x * world.pixelsToMeters, (-position.y + world.heightInMeters) * world.pixelsToMeters);
    renderContext.rotate(-Body.GetAngle());

    // Draw the bounding box:
    renderContext.scale(scaleX, scaleY);

    renderContext.drawImage(imageObj, -imageObj.width/2, -imageObj.height/2);

    renderContext.restore();
  }


  /**
   * Draws a 10px spaced grid background on the canvas.
   */
  function drawGrid() {
    renderContext.strokeStyle = "777";
    renderContext.lineWidth = .1;
    for(var i=0; i < world.widthInPixels/10; ++i ) {
      renderContext.beginPath();
      renderContext.moveTo(i*10, 0);
      renderContext.lineTo(i*10, world.widthInPixels);
      renderContext.closePath();
      renderContext.stroke();
    }
    for(var j=0; j < world.widthInPixels/10; ++j ) {
      renderContext.beginPath();
      renderContext.moveTo(0, j*10);
      renderContext.lineTo(world.widthInPixels, j*10);
      renderContext.closePath();
      renderContext.stroke();
    }
  }

  return interval_id;
}

