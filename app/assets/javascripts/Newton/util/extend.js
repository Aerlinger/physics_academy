b2Body.prototype.name = "";
b2Body.prototype.imagePath = "";
b2Body.prototype.initialBounds = {};
b2Body.prototype.imageObject = null;
b2Body.prototype.massive = false;

b2World.prototype.findBodyByName = function(name) {
  var BodyNode = this.GetBodyList();

  // For each body
  while (BodyNode) {
    var CurrentBodyNode = BodyNode;
    BodyNode = BodyNode.GetNext();

    if(CurrentBodyNode.name === name)
      return CurrentBodyNode;
  }
}