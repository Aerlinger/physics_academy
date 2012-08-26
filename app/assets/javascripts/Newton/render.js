var imgObj = new Image();


function render(world, CanvasElmJQuery) {

  console.log("starting initialization");

  // The context is derived from the DOM element of the canvas jQuery selector
  var context = CanvasElmJQuery.get(0).getContext("2d");

  start();

  function start() {
    this.intervalId = window.setInterval(updateAndRender, world.timeStep);
  }

  /*********************************************************************
   * Input Events
   */
  var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
  var canvasPosition = getElementPosition(document.getElementById("box2d"));

  document.addEventListener("mousedown", function (e) {
    isMouseDown = true;
    handleMouseMove(e);
    document.addEventListener("mousemove", handleMouseMove, true);
  }, true);

  document.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", handleMouseMove, true);
    isMouseDown = false;
    mouseX = undefined;
    mouseY = undefined;
  }, true);

  if(world.debug)
    loadDebug();


  function updateAndRender() {

    context.clearRect(0, 0, world.widthInPixels, world.heightInPixels);

    if (isMouseDown && (!mouseJoint)) {
      var body = getBodyAtMouse();
      if (body) {
        var md = new b2MouseJointDef();
        md.bodyA = world.GetGroundBody();
        md.bodyB = body;
        md.target.Set(mouseX, mouseY);
        md.collideConnected = true;
        md.maxForce = 300.0 * body.GetMass();
        mouseJoint = world.CreateJoint(md);
        body.SetAwake(true);
      }
    }

    if (mouseJoint) {
      if (isMouseDown) {
        mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
      } else {
        world.DestroyJoint(mouseJoint);
        mouseJoint = null;
      }
    }

    world.Step(world.timeStep, world.velocityIterations, world.positionIterations);

    if (world.debug)
      world.DrawDebugData();
    else
      render();

    world.ClearForces();
  }


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

      // If this body is a circle
      if (shape.GetType() == b2Shape.e_circleShape)
        drawCircle(CurrentBodyNode, shape);

      // If this body is an image
      if (CurrentBodyNode.GetUserData() && CurrentBodyNode.GetUserData().imagePath)
        drawImage(CurrentBodyNode);

      // If this body is a polygon
      if (shape.GetType() == b2Shape.e_polygonShape)
        drawPolygon(CurrentBodyNode, FixtureNode);

    }

  }

  function drawForces(Body) {
    "use strict";

  }


  function drawCircle(Body, shape) {
    "use strict";

    var position = Body.GetPosition();

    context.strokeStyle = "#FF1100";
    context.fillStyle = "#FF8800";
    context.beginPath();
    context.arc(position.x * world.pixelsToMeters, (-position.y + world.heightInMeters) * world.pixelsToMeters, shape.GetRadius() * world.pixelsToMeters, 0, Math.PI * 2, true);
    context.closePath();
    context.lineWidth = 3;
    context.stroke();
    context.fill();
  }


  function drawImage(Body) {
    "use strict";

    var position = Body.GetPosition();

    var size = 0;

    context.save();

    // Translate to the center of the object, then flip and scale appropriately
    context.translate(position.x * world.pixelsToMeters + size/2, (-position.y + world.heightInMeters) * world.pixelsToMeters);
    context.rotate(-Body.GetAngle());
    var s2 = -1 * (size/2);

    context.scale(.6, .6);

    imgObj = new Image();

    //imgObj.onload = function(s2) {
      //console.log("Image Loaded " + s2);
      context.drawImage(imgObj, 30, 30);
    //};


    imgObj.src = Body.GetUserData().imagePath;

    context.restore();
  }


  function drawPolygon(Body, FixtureNode) {
    "use strict";

    var position = Body.GetPosition();

    // Loop through each Fixture in this polygon definition
    while(FixtureNode) {

      var CurrentFixtureNode = FixtureNode;
      FixtureNode = FixtureNode.GetNext();

      var shape = CurrentFixtureNode.GetShape();

      // draw a polygon
      var vert = shape.GetVertices();
      context.beginPath();

      // Handle the possible rotation of the polygon and draw it
      b2Math.MulMV(Body.m_xf.R, vert[0]);
      var tV = b2Math.AddVV(position, b2Math.MulMV(Body.m_xf.R, vert[0]));

      context.moveTo(tV.x * world.pixelsToMeters, (world.heightInMeters - tV.y) * world.pixelsToMeters);

      for (var i = 0; i < vert.length; i++) {
        var v = b2Math.AddVV(position, b2Math.MulMV(Body.m_xf.R, vert[i]));
        context.lineTo(v.x * world.pixelsToMeters, (world.heightInMeters - v.y) * world.pixelsToMeters);
      }

      context.lineTo(tV.x * world.pixelsToMeters, (world.heightInMeters - tV.y) * world.pixelsToMeters);

      context.closePath();
      context.strokeStyle = "#CCC";
      context.fillStyle = "#88A";
      context.stroke();
      context.fill();
    }
  }


  function handleMouseMove(e) {
    mouseX = (e.clientX - canvasPosition.x) / world.pixelsToMeters;
    mouseY = -(e.clientY - canvasPosition.y) / world.pixelsToMeters + world.heightInPixels;
  }


  function getBodyAtMouse() {
    mousePVec = new b2Vec2(mouseX, mouseY);
    var aabb = new b2AABB();
    aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
    aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);

    // Query the world for overlapping shapes.
    selectedBody = null;
    world.QueryAABB(getBodyCB, aabb);
    return selectedBody;
  }


  function getBodyCB(fixture) {
    if (fixture.GetBody().GetType() != b2Body.b2_staticBody) {
      if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
        selectedBody = fixture.GetBody();
        return false;
      }
    }
    return true;
  }


  function getElementPosition(element) {
    var elem = element, tagname = "", x = 0, y = 0;

    while (elem && (typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {

      y += elem.offsetTop;
      x += elem.offsetLeft;
      tagname = elem.tagName.toUpperCase();

      if (tagname == "BODY")
        elem = 0;

      if (typeof(elem) == "object") {
        if (typeof(elem.offsetParent) == "object")
          elem = elem.offsetParent;
      }
    }

    return {x:x, y:y};
  }


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

  return this.intervalId;
}

