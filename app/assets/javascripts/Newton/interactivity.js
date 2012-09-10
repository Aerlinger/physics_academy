/*********************************************************************
 * Input Events
 */

function MouseResponder(world, CanvasElmJQuery) {

  var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
  var canvasPosition = getElementPosition(document.getElementById(CanvasElmJQuery.get(0)));

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


  this.queryMouseAndUpdateWorld = function() {
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
  }

}