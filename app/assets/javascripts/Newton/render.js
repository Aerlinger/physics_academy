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
  var context = CanvasElmJQuery.get(0).getContext("2d");
  var hasTextures = false;
  var interval_id = null;

  if(world.debug) {
    console.log("\tIn debug mode");
    loadDebug();
    start();
  } else {
    preloadTextures();
    if(!hasTextures)
      start();
  }


  /** Starts the render loop through a setInterval function. Rendering is not started until this function is called.
   *
   * @return the intervalId of window.setInterval (used for pausing/clearing).
    */
  function start() {
    "use strict";
    console.log("Starting render: " + CanvasElmJQuery.attr('class'));
    interval_id = window.setInterval(updateAndRender, world.timeStep);
  }


  /**
   * Fetches the image data for each Body (if it exists) and preloads it for rendering.
   */
  function preloadTextures() {
    "use strict";

    var BodyNode = world.GetBodyList();
    var numTextures = 0;

    // For each body in the world
    while (BodyNode) {

      var CurrentBodyNode = BodyNode;
      BodyNode = BodyNode.GetNext();

      // If this body has an image, preload that image
      if (CurrentBodyNode.GetUserData() && CurrentBodyNode.GetUserData().imagePath) {
        preloadImageFromBody(CurrentBodyNode);
        numTextures++;
      }

    }

    return numTextures;
  }


  /**
   * Fetches the image data for each Body (if it exists) and preloads it for rendering.
   */
  function preloadImageFromBody(Body) {
    "use strict";

    var imageObj = new Image();
    imageObj.onload = start;
    imageObj.src = Body.GetUserData().imagePath;

    Body.GetUserData().imageObj = imageObj;
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

    context.clearRect(0, 0, world.widthInPixels, world.heightInPixels);

    if(mouseResponder)
      mouseResponder.queryMouseAndUpdateWorld();

    world.Step(world.timeStep, world.velocityIterations, world.positionIterations);

    if (world.debug)
      world.DrawDebugData();
    else
      render();

    world.ClearForces();
  }


  /**
   * Iterates through list of objects in the world, drawing each one based on its type (circle, image, or polygon)
   */
  function render() {

    var BodyNode = world.GetBodyList();

    // For each body
    while (BodyNode) {

      var CurrentBodyNode = BodyNode;
      BodyNode = BodyNode.GetNext();

      // Canvas Y coordinates start at opposite location, so we flip
      var FixtureNode = CurrentBodyNode.GetFixtureList();
      if (!FixtureNode)
        continue;

      var shape = FixtureNode.GetShape();

      // If this body is an image
      if (CurrentBodyNode.GetUserData() && CurrentBodyNode.GetUserData().imagePath)
        drawImage(CurrentBodyNode);

      // If this body is a circle
      if (shape.GetType() == b2Shape.e_circleShape)
        drawCircle(CurrentBodyNode, shape.GetRadius());

      // If this body is a polygon
      else if (shape.GetType() == b2Shape.e_polygonShape)
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

    var position = Body.GetPosition();

    context.strokeStyle = "#FF1100";
    context.fillStyle = "#FF8800";
    context.beginPath();
    context.arc(position.x * world.pixelsToMeters, (-position.y + world.heightInMeters) * world.pixelsToMeters,
      radius * world.pixelsToMeters, 0, Math.PI * 2, true);
    context.closePath();
    context.lineWidth = 3;
    //context.stroke();
    context.fill();
  }


  /**
   * Draws an image from the UserData on a body.
   *
   * @param Body body containing the image to be drawn.
   */
  function drawImage(Body) {
    "use strict";

    var position = Body.GetPosition();

    var bodyWidthPixels   = Body.GetUserData().width * world.pixelsToMeters;
    var bodyHeightPixels  = Body.GetUserData().height * world.pixelsToMeters;

    context.save();

    var imageObj = Body.GetUserData().imageObj;

    var scaleX = bodyWidthPixels/imageObj.width;
    var scaleY = bodyHeightPixels/imageObj.height;

    // Translate to the center of the object, then flip and scale appropriately
    context.translate(position.x * world.pixelsToMeters, (-position.y + world.heightInMeters) * world.pixelsToMeters);
    context.rotate(-Body.GetAngle());

    // TODO: The image sprite and box2d object don't line up perfectly. Find out why (xOffset and yOffset should be 0).
    var xOffset = -4;
    var yOffset = -4;

    // Draw the bounding box:
    context.scale(scaleX, scaleY);
    context.rect(imageObj.width/2*scaleX+xOffset, yOffset, bodyWidthPixels/scaleX, -bodyHeightPixels/scaleY);
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();

    context.drawImage(imageObj, imageObj.width/2*scaleX+xOffset, -imageObj.height+yOffset);

    context.restore();
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

    var position = PolygonBody.GetPosition();
    var FixtureNode = PolygonBody.GetFixtureList();

    // Loop through each Fixture in this polygon definition
    while(FixtureNode) {

      var CurrentFixtureNode = FixtureNode;
      FixtureNode = FixtureNode.GetNext();

      var vertices = CurrentFixtureNode.GetShape().GetVertices();

      context.beginPath();

      // Find first vertex of this fixture, and move to that position for drawing
      b2Math.MulMV(PolygonBody.m_xf.R, vertices[0]);
      var tV = b2Math.AddVV(position, b2Math.MulMV(PolygonBody.m_xf.R, vertices[0]));
      context.moveTo(tV.x * world.pixelsToMeters, (world.heightInMeters - tV.y) * world.pixelsToMeters);

      // Loop through each vertex within this polygon draw the line from the previous vertex to this one.
      for (var i = 0; i < vertices.length; i++) {
        var v = b2Math.AddVV(position, b2Math.MulMV(PolygonBody.m_xf.R, vertices[i]));
        context.lineTo(v.x * world.pixelsToMeters, (world.heightInMeters - v.y) * world.pixelsToMeters);
      }

      // Draw line connecting the last vertex to the first vertex
      context.lineTo(tV.x * world.pixelsToMeters, (world.heightInMeters - tV.y) * world.pixelsToMeters);

      context.closePath();
      context.strokeStyle = "#CCC";
      context.fillStyle = "#88A";
      context.stroke();
      context.fill();
    }
  }


  /**
   * Sets drawing parameters for debug mode.
   */
  function loadDebug() {
    "use strict";

    var debugDraw = new b2DebugDraw();

    debugDraw.SetSprite(context);
    debugDraw.SetDrawScale(world.pixelsToMeters);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

    world.SetDebugDraw(debugDraw);
  }

  return interval_id;
}

