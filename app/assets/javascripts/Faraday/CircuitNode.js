function CircuitNode() {
    this.x = 0;
    this.y = 0;

    this.links = new Array();
    this.intern = false;
}
;

function CircuitNodeLink() {
    this.num = 0;
    this.elm = null;    // CircuitElement
}
;