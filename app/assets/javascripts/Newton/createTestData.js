function createBalls(world) {
  "use strict";

  for (var i = 0; i < 40; ++i) {

    var circleFixDef = new b2FixtureDef;
    var circleBodyDef = new b2BodyDef;

    var radius = .05 * Math.random() + 0.2;
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
      circleBodyDef.linearVelocity.Set(20, 0);
    else
      circleBodyDef.linearVelocity.Set(0, 0);

    world.CreateBody(circleBodyDef).CreateFixture(circleFixDef);
  }
}

function createBounds(world) {
  "use strict";

  var bodyDef = new b2BodyDef;
  var fixDef = new b2FixtureDef;
  fixDef.density = 1.0;
  fixDef.friction = 0.0;
  fixDef.restitution = 1.0;

  // Create definitions for the borders
  bodyDef.type = b2Body.b2_staticBody;
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(20, 2);
  bodyDef.position.Set(10, world.heightInMeters + 1.8);

  world.CreateBody(bodyDef).CreateFixture(fixDef);
  bodyDef.position.Set(10, -1.8);
  world.CreateBody(bodyDef).CreateFixture(fixDef);
  fixDef.shape.SetAsBox(2, 14);
  bodyDef.position.Set(-1.8, 13);
  world.CreateBody(bodyDef).CreateFixture(fixDef);
  bodyDef.position.Set(world.widthInMeters + 1.8, 13);
  world.CreateBody(bodyDef).CreateFixture(fixDef);

}