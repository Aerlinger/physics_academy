/**
 * Creates balls with random positions in the world
 * */
function createBalls(world) {
  "use strict";

  for (var i = 0; i < 40; ++i) {

    var circleFixDef = new b2FixtureDef;
    var circleBodyDef = new b2BodyDef;

    var radius = 0.3;
    circleFixDef.shape = new b2CircleShape( radius );
    circleBodyDef.type = b2Body.b2_dynamicBody;
    circleFixDef.density = 0.0;
    circleFixDef.friction = 0.0;
    circleFixDef.restitution = 1.0;
    circleBodyDef.position.x = Math.random() * world.widthInMeters;
    circleBodyDef.position.y = Math.random() * world.heightInMeters;
    circleBodyDef.mass = circleBodyDef.radius * 10;

    // Set the velocity of the first ball to a fixed amount.
    if (i == 0)
      circleBodyDef.linearVelocity.Set(50, 0);
    else
      circleBodyDef.linearVelocity.Set(0, 0);

    world.CreateBody(circleBodyDef).CreateFixture(circleFixDef);
  }
}

/**
 * * Creates bounding box of static bodies for this world.
 * */
function createBounds(world) {
  "use strict";

  var thickness = .1;

  // Create definitions for the borders
  var bodyDef = new b2BodyDef;
  bodyDef.type = b2Body.b2_staticBody;

  var fixDef = new b2FixtureDef;

  fixDef.density = 0.0;
  fixDef.friction = 0.0;
  fixDef.restitution = 0.0;
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(world.widthInMeters, thickness);

  // TOP
  bodyDef.position.Set(0, world.heightInMeters);
  world.CreateBody(bodyDef).CreateFixture(fixDef);

  // BOTTOM
  bodyDef.position.Set(0, 0);
  world.CreateBody(bodyDef).CreateFixture(fixDef);

  fixDef.shape.SetAsBox(thickness, world.heightInMeters);

  // LEFT
  bodyDef.position.Set(0, world.heightInMeters);
  world.CreateBody(bodyDef).CreateFixture(fixDef);

  // RIGHT
  bodyDef.position.Set(world.widthInMeters, 0);
  world.CreateBody(bodyDef).CreateFixture(fixDef);

}