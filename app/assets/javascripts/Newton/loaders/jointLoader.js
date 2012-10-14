/**
 * Namespace for
 * @type {Object}
 */
var jointLoader = {

  loadRevoluteJoint: function(world, revoluteJointJSON) {

  },


  loadDistanceJoint: function(world, distanceJointJSON) {

    var bodyA = world.findBodyByName(distanceJointJSON.bodyA);
    var bodyB = world.findBodyByName(distanceJointJSON.bodyB);

    var distanceJointDef = new b2DistanceJointDef();

    var anchor = distanceJointJSON.anchor;

    var anchor1 = new b2Vec2(anchor[0].x, anchor[0].y);
    var anchor2 = new b2Vec2(anchor[1].x, anchor[1].y);

    distanceJointDef.Initialize(bodyA, bodyB, anchor1, anchor2);

    if(distanceJointJSON.collideConnected)
      distanceJointDef.collideConnected = distanceJointJSON.collideConnected;
    if(distanceJointJSON.frequencyHz)
      distanceJointDef.frequencyHz = 4.0;
    if(distanceJointJSON.dampingRatio)
      distanceJointDef.dampingRatio = 0.5;

    world.CreateJoint(distanceJointDef);
  },


  loadPrismaticJoint: function(world, prismaticJointJSON) {

    var bodyA = world.findBodyByName(prismaticJointJSON.bodyA);
    var bodyB = world.findBodyByName(prismaticJointJSON.bodyB);

    var prismaticJointDef = new b2PrismaticJointDef();

    var anchor = prismaticJointJSON.anchor;

    var anchor1 = new b2Vec2(anchor[0].x, anchor[0].y);
    var anchor2 = new b2Vec2(anchor[1].x, anchor[1].y);

    prismaticJointDef.Initialize(bodyA, bodyB, anchor1, anchor2);

    if(prismaticJointJSON.collideConnected)
      prismaticJointDef.collideConnected = prismaticJointJSON.collideConnected;
    if(prismaticJointJSON.frequencyHz)
      prismaticJointDef.frequencyHz = 4.0;
    if(prismaticJointJSON.dampingRatio)
      prismaticJointDef.dampingRatio = 0.5;

    world.CreateJoint(prismaticJointDef);
  },


  loadPulleyJoint: function(world, pulleyJointJSON) {

  }
};