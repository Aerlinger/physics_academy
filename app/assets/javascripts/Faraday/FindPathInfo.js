FindPathInfo.INDUCT = 1;
FindPathInfo.VOLTAGE = 2;
FindPathInfo.SHORT = 3;
FindPathInfo.CAP_V = 4;

// Constructor
function FindPathInfo(type, firstElm, dest, elementList, numNodes) {


    this.dest = dest;
    this.type = type;
    this.firstElm = firstElm;
    this.elementList = elementList;

    this.used = new Array(numNodes);
    //zeroArray(this.used);
}
;




FindPathInfo.prototype.findPath = function (n1, depth) {

    if (n1 == this.dest)
        return true;
    if (depth-- == 0)
        return false;
    if (this.used[n1]) {
        //console.log("used " + n1);
        return false;
    }

    this.used[n1] = true;
    var i;

    for (i = 0; i != Circuit.elementList.length; i++) {
        var ce = Circuit.elementList[i];
        if (ce == this.firstElm)
            continue;
        if (this.type == FindPathInfo.INDUCT) {
            if (ce instanceof CurrentElm)
                continue;
        }
        if (this.type == FindPathInfo.VOLTAGE) {
            if (!(ce.isWire() || ce instanceof VoltageElm))
                continue;
        }
        if (this.type == FindPathInfo.SHORT && !ce.isWire())
            continue;
        if (this.type == FindPathInfo.CAP_V) {
            if (!(ce.isWire() || ce instanceof CapacitorElm ||
                ce instanceof VoltageElm))
                continue;
        }
        if (n1 == 0) {
            // look for posts which have a ground connection;
            // our path can go through ground
            var j;
            for (j = 0; j != ce.getPostCount(); j++)
                if (ce.hasGroundConnection(j) &&
                    this.findPath(ce.getNode(j), depth)) {
                    this.used[n1] = false;
                    return true;
                }
        }
        var j;
        for (j = 0; j != ce.getPostCount(); j++) {
            //console.log(ce + " " + ce.getNode(j));
            if (ce.getNode(j) == n1)
                break;
        }
        if (j == ce.getPostCount())
            continue;
        if (ce.hasGroundConnection(j) && this.findPath(0, depth)) {
            //console.log(ce + " has ground");
            this.used[n1] = false;
            return true;
        }
        if (this.type == FindPathInfo.INDUCT && ce instanceof InductorElm) {
            var c = ce.getCurrent();
            if (j == 0)
                c = -c;
            //console.log("matching " + c + " to " + firstElm.getCurrent());
            //console.log(ce + " " + firstElm);
            if (Math.abs(c - this.firstElm.getCurrent()) > 1e-10)
                continue;
        }
        var k;
        for (k = 0; k != ce.getPostCount(); k++) {
            if (j == k)
                continue;
            //console.log(ce + " " + ce.getNode(j) + "-" + ce.getNode(k));
            if (ce.getConnection(j, k) && this.findPath(ce.getNode(k), depth)) {
                //console.log("got findpath " + n1);
                this.used[n1] = false;
                return true;
            }
            //console.log("back on findpath " + n1);
        }
    }

    this.used[n1] = false;
    //console.log(n1 + " failed");
    return false;
};