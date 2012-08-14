function init() {
    var b2Vec2 = Box2D.Common.Math.b2Vec2
        , b2AABB = Box2D.Collision.b2AABB
        , b2BodyDef = Box2D.Dynamics.b2BodyDef
        , b2Body = Box2D.Dynamics.b2Body
        , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        , b2Fixture = Box2D.Dynamics.b2Fixture
        , b2World = Box2D.Dynamics.b2World
        , b2MassData = Box2D.Collision.Shapes.b2MassData
        , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
        , b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef
        ;

    var world = new b2World(
        new b2Vec2(0, 0)    //gravity
        , true                 //allow sleep
    );

    var fixDef = new b2FixtureDef;
    fixDef.density = 0.0;
    fixDef.friction = 0.0;
    fixDef.restitution = 1.0;


    var bodyDef = new b2BodyDef;


    //create ground
    bodyDef.type = b2Body.b2_staticBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(20, 2);
    bodyDef.position.Set(10, 320 / 30 + 1.8);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
    bodyDef.position.Set(10, -1.8);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
    fixDef.shape.SetAsBox(2, 14);
    bodyDef.position.Set(-1.8, 13);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
    bodyDef.position.Set(530 / 30 + 1.8, 13);
    world.CreateBody(bodyDef).CreateFixture(fixDef);


    //create some objects
    bodyDef.type = b2Body.b2_dynamicBody;

    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(
        0.5 //half width
        , 160 / 30 //half height
    );

    bodyDef.position.x = 530/60;
    bodyDef.position.y = Math.random() * 10;
    bodyDef.friction = 0.0;
    bodyDef.restitution = 1.0;
    bodyDef.mass = 50;
    world.CreateBody(bodyDef).CreateFixture(fixDef);

    for (var i = 0; i < 50; ++i) {
        fixDef.shape = new b2CircleShape(
            .05 * Math.random() + 0.2 //radius
        );
        bodyDef.position.x = Math.random() * 530/30;
        bodyDef.position.y = Math.random() * 320/30;
        bodyDef.mass = bodyDef.radius * 10;

        if (i == 0)
            bodyDef.linearVelocity.Set(60, 0);
        else
            bodyDef.linearVelocity.Set(0, 0);

        world.CreateBody(bodyDef).CreateFixture(fixDef);
    }

    //setup debug draw
    var debugDraw = new b2DebugDraw();
    var canvas = document.getElementById("canvas_box2d");
    if (!canvas)
        return;

    debugDraw.SetSprite(canvas.getContext("2d"));
    debugDraw.SetDrawScale(30.0);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    window.setInterval(update, 1000 / 60);

    //mouse

    var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
    var canvasPosition = getElementPosition(document.getElementById("canvas_box2d"));

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
        mouseX = (e.clientX - canvasPosition.x) / 30;
        mouseY = (e.clientY - canvasPosition.y) / 30;
    }

    ;

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

    //update

    function update() {

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

        world.Step(1 / 60, 10, 10);
        world.DrawDebugData();
        world.ClearForces();
    }

    ;

    //helpers

    //http://js-tut.aardon.de/js-tut/tutorial/position.html
    function getElementPosition(element) {
        var elem = element, tagname = "", x = 0, y = 0;

        while ((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
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


}
;


$(document).ready(function (event) {
    init();
});