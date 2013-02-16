// Constants
Scope.FLAG_YELM = 32;
Scope.VAL_POWER = 1;
Scope.VAL_IB = 1;
Scope.VAL_IC = 2;
Scope.VAL_IE = 3;
Scope.VAL_VBE = 4;
Scope.VAL_VBC = 5;
Scope.VAL_VCE = 6;
Scope.VAL_R = 2;


this.minV = [];
this.maxV = [];
this.minMaxV = [];
this.minI = [];
this.maxI = [];
this.minMaxI = [];


Scope.prototype.scopePointCount = 128;

Scope.prototype.ptr = 0;
Scope.prototype.ctr = 0;
Scope.prototype.speed = 0;
Scope.prototype.position = 0;

Scope.prototype.value = 0;
Scope.prototype.ivalue = 0;
Scope.prototype.text = "";
Scope.prototype.rect;

// Circuit Elements to scope
Scope.prototype.elm;
Scope.prototype.xElm;
Scope.prototype.yElm;

Scope.prototype.imageSource; // Memory image source

Scope.prototype.image; // Image object

// IMAGE DATA!
Scope.prototype.pixels = [];  // Int array
Scope.prototype.dpixels = [];
Scope.prototype.draw_ox;
Scope.prototype.draw_oy;


Scope.prototype.showI = false;
Scope.prototype.showV = false;
Scope.prototype.showMax = false;
Scope.prototype.showMin = false;
Scope.prototype.showFreq = false;
Scope.prototype.lockScale = false;
Scope.prototype.plot2d = false;
Scope.prototype.plotXY = false;


function Scope() {
    this.rect = new Rectangle(0, 0, 100, 50);
    this.reset();
}
;

Scope.prototype.showCurrent = function (b) {
    this.showI = b;
    this.value = this.ivalue = 0;
};

Scope.prototype.showVoltage = function (b) {

    this.showV = b;
    this.value = this.ivalue = 0;
};

Scope.prototype.showMax = function (b) {
    this.showMax = b;
};

Scope.prototype.showMin = function (b) {
    this.showMin = b;
};

Scope.prototype.showFreq = function (b) {
    this.showFreq = b;
};

Scope.prototype.setLockScale = function (b) {
    this.lockScale = b;
};

Scope.prototype.resetGraph = function () {
    this.scopePointCount = 1;
    while (this.scopePointCount <= this.rect.width)
        this.scopePointCount *= 2;
    this.minV = new Array(this.scopePointCount);
    this.maxV = new Array(this.scopePointCount);
    this.minI = new Array(this.scopePointCount);
    this.maxI = new Array(this.scopePointCount);
    this.ptr = this.ctr = 0;

    paper.beginPath();
    paper.strokeRect(this.rect.x1, this.rect.y, this.rect.width, this.rect.height);
    paper.closePath();

    this.allocImage();
};

Scope.prototype.active = function () {
    if (this.elm)
        return true;

    return false;
};

Scope.prototype.reset = function () {
    this.resetGraph();
    this.minMaxV = 5;
    this.minMaxI = .1;
    this.speed = 64;
    this.showI = this.showV = this.showMax = true;
    this.showFreq = this.lockScale = this.showMin = false;
    this.plot2d = false;
    // no showI for Output
    if (this.elm != null && (this.elm instanceof OutputElm ||
        this.elm instanceof LogicOutputElm ||
        this.elm instanceof ProbeElm))
        this.showI = false;
    this.value = this.ivalue = 0;
    if (this.elm instanceof TransistorElm)
        this.value = this.VAL_VCE;
};

Scope.prototype.setRect = function (r) {
    this.rect = r;
    this.resetGraph();
};

Scope.prototype.getWidth = function () {
    return this.rect.width;
};

Scope.prototype.rightEdge = function () {
    return this.rect.x1 + this.rect.width;
};

Scope.prototype.setElm = function (ce) {
    this.elm = ce;
    this.reset();
};

/** Advance scope by one frame */
Scope.prototype.timeStep = function () {

    if (this.elm == null)
        return;

    var v = this.elm.getScopeValue(this.value);

    // Clip values if out of range
    if (v < this.minV[this.ptr])
        this.minV[this.ptr] = v;
    if (v > this.maxV[this.ptr])
        this.maxV[this.ptr] = v;

    var i = 0;
    if (this.value == 0 || this.ivalue != 0) {
        i = (this.ivalue == 0) ? this.elm.getCurrent() : this.elm.getScopeValue(this.ivalue);
        if (i < this.minI[this.ptr])
            this.minI[this.ptr] = i;
        if (i > this.maxI[this.ptr])
            this.maxI[this.ptr] = i;
    }

    if (this.plot2d && this.dpixels != null) {
        var newscale = false;
        while (v > this.minMaxV || v < -this.minMaxV) {
            this.minMaxV *= 2;
            newscale = true;
        }
        var yval = i;
        if (this.plotXY)
            yval = (this.yElm == null) ? 0 : this.yElm.getVoltageDiff();
        while (yval > this.minMaxI || yval < -this.minMaxI) {
            this.minMaxI *= 2;
            newscale = true;
        }
        if (newscale)
            this.clear2dView();
        var xa = v / this.minMaxV;
        var ya = yval / this.minMaxI;
        var x = Math.floor(this.rect.width * (1 + xa) * .499);
        var y = Math.floor(this.rect.height * (1 - ya) * .499);
        this.drawTo(x, y);
    } else {
        this.ctr++;
        if (this.ctr >= this.speed) {
            this.ptr = (this.ptr + 1) & (this.scopePointCount - 1);
            this.minV[this.ptr] = this.maxV[this.ptr] = v;
            this.minI[this.ptr] = this.maxI[this.ptr] = i;
            this.ctr = 0;
        }
    }

};

Scope.prototype.drawTo = function (x2, y2) {
    if (this.draw_ox == -1) {
        this.draw_ox = x2;
        this.draw_oy = y2;
    }
    // need to draw a line from x1,y1 to x2,y2
    if (this.draw_ox == x2 && this.draw_oy == y2) {
        this.dpixels[x2 + this.rect.width * y2] = 1;
    } else if (Math.abs(y2 - this.draw_oy) > Math.abs(x2 - this.draw_ox)) {
        // y difference is greater, so we step along y's from min to max y and calculate x for each step
        var sgn = sign(y2 - this.draw_oy);
        var x, y;
        for (y = this.draw_oy; y != y2 + sgn; y += sgn) {
            x = this.draw_ox + (x2 - this.draw_ox) * (y - this.draw_oy) / (y2 - this.draw_oy);
            this.dpixels[x + this.rect.width * y] = 1;
        }
    } else {
        // x difference is greater, so we step along x's from min to max x and calculate y for each step
        var sgn = sign(x2 - this.draw_ox);
        var x, y;
        for (x = this.draw_ox; x != x2 + sgn; x += sgn) {
            y = this.draw_oy + (y2 - this.draw_oy) * (x - this.draw_ox) / (x2 - this.draw_ox);
            this.dpixels[x + this.rect.width * y] = 1;
        }
    }
    this.draw_ox = x2;
    this.draw_oy = y2;
};

Scope.prototype.clear2dView = function () {
    var i;
    for (i = 0; i != this.dpixels.length; i++)
        this.dpixels[i] = 0;
    this.draw_ox = this.draw_oy = -1;
};

Scope.prototype.adjustScale = function (x) {
    this.minMaxV *= x;
    this.minMaxI *= x;
};

Scope.prototype.draw2d = function () {
    console.log("Draw2D!");
    var i;
    if (this.pixels == null || this.dpixels == null)
        return;
    var col = (Circuit.printableCheckItem) ? 0xFFFFFFFF : 0;
    for (i = 0; i != this.pixels.length; i++)
        this.pixels[i] = col;

    for (i = 0; i != this.rect.width; i++)
        this.pixels[i + this.rect.width * (this.rect.height / 2)] = 0xFF00FF00;
    var ycol = (this.plotXY) ? 0xFF00FF00 : 0xFFFFFF00;
    for (i = 0; i != this.rect.height; i++)
        this.pixels[this.rect.width / 2 + this.rect.width * i] = ycol;
    for (i = 0; i != this.pixels.length; i++) {
        var q = Math.floor(255 * this.dpixels[i]);
        if (q > 0)
            this.pixels[i] = 0xFF000000 | (0x10101 * q);
        this.dpixels[i] *= .997;
    }

    //g.drawImage(this.image, this.rect.x, this.rect.y, null);
    //g.setColor(this.elm.whiteColor);
    //g.fillOval(this.rect.x + this.draw_ox - 2, this.rect.y + this.draw_oy - 2, 5, 5);

    // todo: canvas
//    paper.ellipse(this.rect.x + this.draw_ox - 2, this.rect.y + this.draw_oy - 2, 5, 5).attr({
//        stroke:Color.color2HexString(CircuitElement.whiteColor)
//    });

    paper.beginPath();
    paper.arc(this.rect.x1 + this.draw_ox - 2, this.rect.y + this.draw_oy - 2, 5, 0, 2*Math.PI,false);
    paper.closePath();

    var yt = this.rect.y + 10;
    var x = this.rect.x1;
    if (this.text != null && this.rect.y + this.rect.height > yt + 5) {
        // Todo: draw text
        //g.drawString(this.text, x, yt);
        //paper.text(x, yt, this.text);
        yt += 15;
    }
};

Scope.prototype.draw = function () {
    if (this.elm == null)
        return;
    if (this.plot2d) {
        this.draw2d();
        return;
    }

    if (this.pixels == null)
        return;

    console.log("starting draw");

    var i;
    var col = (Circuit.printableCheckItem) ? 0xFFFFFFFF : 0;

    for (i = 0; i != this.pixels.length; i++)
        this.pixels[i] = col;

    var x = 0;
    var maxy = (this.rect.height - 1) / 2;
    var y = maxy;

    var gotI = false;
    var gotV = false;
    var minRange = 4;
    var realMaxV = -1e8;
    var realMaxI = -1e8;
    var realMinV = 1e8;
    var realMinI = 1e8;
    var curColor = '#FFFF00';
    var voltColor = (this.value > 0) ? '#FFFFFF' : '#00FF00';

    if (Circuit.scopeSelected == -1 && this.elm == Circuit.mouseElm)
        curColor = voltColor = 0xFF00FFFF;

    var ipa = this.ptr + this.scopePointCount - this.rect.width;

    for (i = 0; i != this.rect.width; i++) {
        var ip = (i + ipa) & (this.scopePointCount - 1);
        while (this.maxV[ip] > this.minMaxV)
            this.minMaxV *= 2;
        while (minV[ip] < -this.minMaxV)
            this.minMaxV *= 2;
        while (this.maxI[ip] > this.minMaxI)
            this.minMaxI *= 2;
        while (this.minI[ip] < -this.minMaxI)
            this.minMaxI *= 2;
    }

    var gridStep = 1e-8;
    var gridMax = (this.showI ? this.minMaxI : this.minMaxV);
    while (gridStep * 100 < gridMax)
        gridStep *= 10;
    if (maxy * gridStep / gridMax < .3)
        gridStep = 0;

    var ll;
    var sublines = (maxy * gridStep / gridMax > 3);
    for (ll = -100; ll <= 100; ll++) {
        // don't show gridlines if plotting multiple values, or if lines are too close together (except for center line)
        if (ll != 0 && ((this.showI && this.showV) || gridStep == 0))
            continue;
        var yl = maxy - Math.floor(maxy * ll * gridStep / gridMax);
        if (yl < 0 || yl >= this.rect.height - 1)
            continue;
        col = ll == 0 ? 0xFF909090 : 0xFF404040;
        if (ll % 10 != 0) {
            col = 0xFF101010;
            if (!sublines)
                continue;
        }
        // Draw sublines
        //for (i = 0; i != this.rect.width; i++)
        //this.pixels[i + yl * this.rect.width] = col;
        //paper.path( 'M'+ (this.rect.x + yl) + ' ' + this.rect.y + 'L' + (this.rect.x + yl) + ' ' + (this.rect.y+this.rect.height) );

        //console.log(yl);
    }

    gridStep = 1e-15;
    var ts = Circuit.timeStep * this.speed;
    while (gridStep < ts * 5)
        gridStep *= 10;
    var tstart = Circuit.t - Circuit.timeStep * this.speed * this.rect.width;
    var tx = Circuit.t - (Circuit.t % gridStep);
    var first = 1;
    for (ll = 0; ; ll++) {
        var tl = tx - gridStep * ll;
        var gx = Math.floor((tl - tstart) / ts);
        if (gx < 0)
            break;
        if (gx >= this.rect.width)
            continue;
        if (tl < 0)
            continue;
        col = '#202020';
        first = 0;
        if (((tl + gridStep / 4) % (gridStep * 10)) < gridStep) {
            col = '#909090';
            if (((tl + gridStep / 4) % (gridStep * 100)) < gridStep)
                col = '#4040D0';
        }
        //for (i = 0; i < this.pixels.length; i += this.rect.width)
        //    this.pixels[i + gx] = col;
        //paper.path('M' + (gx) + ' ' + this.rect.y + 'L' + (gx) + ' ' + (this.rect.y + this.rect.height)).attr('stroke', col, 'stroke-width', 0);
        paper.beginPath();
        paper.moveTo(gx, this.rect.y);
        paper.lineTo(gx, this.rect.y + this.rect.height);
        paper.closePath();
    }

    // these two loops are pretty much the same, and should be combined!
    if (this.value == 0 && this.showI) {
        var ox = -1;
        var oy = -1;
        var j;
        for (i = 0; i != this.rect.width; i++) {
            var ip = (i + ipa) & (this.scopePointCount - 1);
            var miniy = Math.floor((maxy / this.minMaxI) * this.minI[ip]);
            var maxiy = Math.floor((maxy / this.minMaxI) * this.maxI[ip]);
            if (this.maxI[ip] > realMaxI)
                realMaxI = this.maxI[ip];
            if (this.minI[ip] < realMinI)
                realMinI = this.minI[ip];
            if (miniy <= maxy) {
                if (miniy < -minRange || maxiy > minRange)
                    gotI = true;
                if (ox != -1) {
                    if (miniy == oy && maxiy == oy)
                        continue;
                    for (j = ox; j != x + i; j++) {
                        console.log("(y - oy):  " + (y - oy));

                        //paper
                        //paper.path('M' + this.rect.width * (y - oy) + ' ' + this.rect.y + 'L' + this.rect.width * (y - oy) + ' ' + (this.rect.y + this.rect.height)).attr('stroke', curColor, 'stroke-width', 0);
                        //this.pixels[j + this.rect.width * (y - oy)] = curColor;

                        paper.beginPath();
                        paper.moveTo(this.rect.width * (y - oy), this.rect.y);
                        paper.lineTo(this.rect.width * (y - oy), (this.rect.y + this.rect.height));
                        paper.closePath();
                    }
                    ox = oy = -1;
                }
                if (miniy == maxiy) {
                    ox = x + i;
                    oy = miniy;
                    continue;
                }
                for (j = miniy; j <= maxiy; j++) {
                    console.log("(y - j):  " + (y - j));
                    paper.path('M' + (x + i) + ' ' + this.rect.y + 'L' + (x + i + 1) + ' ' + (this.rect.y + this.rect.height)).attr('stroke', curColor, 'stroke-width', 0);

                    paper.beginPath();
                    paper.moveTo((x + i), this.rect.y);
                    paper.lineTo((x + i + 1), (this.rect.y + this.rect.height));
                    paper.closePath();

                    //this.pixels[x + i + this.rect.width * (y - j)] = curColor;
                }
            }
        }
        if (ox != -1) {
            for (j = ox; j != x + i; j++) {
                //this.pixels[j + this.rect.width * (y - oy)] = curColor;
                console.log("(y - oy):  " + (y - oy));
                //paper.path('M' + this.rect.width * (y - oy) + ' ' + this.rect.y + 'L' + this.rect.width * (y - oy) + ' ' + (this.rect.y + this.rect.height)).attr('stroke', curColor, 'stroke-width', 0);
                paper.beginPath();
                paper.moveTo(this.rect.width * (y - oy), this.rect.y);
                paper.lineTo(this.rect.width * (y - oy), (this.rect.y + this.rect.height));
                paper.closePath();
            }
        }
    }

    if (this.value != 0 || this.showV) {
        var ox = -1, oy = -1, j;
        for (i = 0; i != this.rect.width; i++) {
            var ip = (i + ipa) & (this.scopePointCount - 1);
            var minvy = Math.floor((maxy / this.minMaxV) * this.minV[ip]);
            var maxvy = Math.floor((maxy / this.minMaxV) * this.maxV[ip]);
            if (this.maxV[ip] > realMaxV)
                realMaxV = this.maxV[ip];
            if (this.minV[ip] < realMinV)
                realMinV = this.minV[ip];
            if ((this.value != 0 || this.showV) && minvy <= maxy) {
                if (minvy < -minRange || maxvy > minRange)
                    gotV = true;
                if (ox != -1) {
                    if (minvy == oy && maxvy == oy)
                        continue;
                    for (j = ox; j != x + i; j++) {
                        //console.log("(y - oy):  " + (y-oy));
                        //paper.path( 'M'+ this.rect.width * (y - oy) + ' ' + this.rect.y + 'L' + this.rect.width * (y - oy) + ' ' + (this.rect.y+this.rect.height) ).attr('stroke', voltColor, 'stroke-width', 0);
                        //this.pixels[j + this.rect.width * (y - oy)] = voltColor;
                        //paper.path('M' + (j) + ' ' + (y - oy) + 'L' + (j + 1) + ' ' + (y - oy) + 1).attr('stroke', voltColor);

                        paper.beginPath();
                        paper.moveTo(this.rect.width * (y - oy), this.rect.y);
                        paper.lineTo(this.rect.width * (y - oy), (this.rect.y + this.rect.height));
                        paper.closePath();
                    }
                    ox = oy = -1;
                }
                if (minvy == maxvy) {
                    ox = x + i;
                    oy = minvy;
                    continue;
                }
                for (j = minvy; j <= maxvy; j++) {
                    //console.log("(y - j) voltcolor1:  " + (y-j) + " " + voltColor + " j= " + j);
                    //paper.path('M' + (x + i) + ' ' + (y - j) + 'L' + (x + i + 1) + ' ' + (y - j + 1)).attr('stroke', voltColor);

                    paper.beginPath();
                    paper.moveTo((x + i), (y - j));
                    paper.lineTo((x + i + 1), (y - j + 1));
                    paper.closePath();
                    //this.pixels[x + i + this.rect.width * (y - j)] = voltColor;
                }
            }
        }
        if (ox != -1) {
            for (j = ox; j != x + i; j++) {
                console.log("(y - oy) voltcolor:  " + (y - oy) + " j= " + j);
                //this.pixels[j + this.rect.width * (y - oy)] = voltColor;
                //paper.path( 'M'+ j + ' ' + (y-oy) + 'L' + j+ ' ' + 3*(y-oy)).attr('stroke', curColor);

                paper.beginPath();
                paper.moveTo(j, (y-oy));
                paper.lineTo(j, 3*(y-oy));
                paper.closePath();
            }
        }
    }

    var freq = 0;
    if (this.showFreq) {
        // try to get frequency get average
        var avg = 0;
        for (i = 0; i != this.rect.width; i++) {
            var ip = (i + ipa) & (this.scopePointCount - 1);
            avg += this.minV[ip] + this.maxV[ip];
        }
        avg /= i * 2;
        var state = 0;
        var thresh = avg * .05;
        var oi = 0;
        var avperiod = 0;
        var periodct = -1;
        var avperiod2 = 0;
        // count period lengths
        for (i = 0; i != this.rect.width; i++) {
            var ip = (i + ipa) & (this.scopePointCount - 1);
            var q = this.maxV[ip] - avg;
            var os = state;
            if (q < thresh)
                state = 1;
            else if (q > -thresh)
                state = 2;
            if (state == 2 && os == 1) {
                var pd = i - oi;
                oi = i;
                // short periods can't be counted properly
                if (pd < 12)
                    continue;
                // skip first period, it might be too short
                if (periodct >= 0) {
                    avperiod += pd;
                    avperiod2 += pd * pd;
                }
                periodct++;
            }
        }
        avperiod /= periodct;
        avperiod2 /= periodct;
        var periodstd = Math.sqrt(avperiod2 - avperiod * avperiod);
        freq = 1 / (avperiod * Circuit.timeStep * this.speed);
        // don't show freq if standard deviation is too great
        if (periodct < 1 || periodstd > 2)
            freq = 0;
        // console.log(freq + " " + periodstd + " " + periodct);
    }

    //TODO: CANVAS
    // paper.rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height).attr({stroke:'red'});
    paper.beginPath();
    paper.strokeRect(this.rect.x1, this.rect.y, this.rect.width, this.rect.height);
    paper.closePath();

    //////////////////////////////////////////////////
    // RENDERING
    //////////////////////////////////////////////////
    /*
     g.drawImage(this.image, this.rect.x, this.rect.y, null);
     g.setColor(this.elm.whiteColor);
     var yt = this.rect.y + 10;
     x += this.rect.x;
     if (this.showMax) {
     if (this.value != 0)
     g.drawString(this.elm.getUnitText(realMaxV,
     this.elm.getScopeUnits(this.value)),
     x, yt);
     else if (this.showV)
     g.drawString(this.elm.getVoltageText(realMaxV), x, yt);
     else if (this.showI)
     g.drawString(this.elm.getCurrentText(realMaxI), x, yt);
     yt += 15;
     }
     if (this.showMin) {
     var ym = this.rect.y + this.rect.height - 5;
     if (this.value != 0)
     g.drawString(this.elm.getUnitText(realMinV,
     this.elm.getScopeUnits(this.value)),
     x, ym);
     else if (this.showV)
     g.drawString(this.elm.getVoltageText(realMinV), x, ym);
     else if (this.showI)
     g.drawString(this.elm.getCurrentText(realMinI), x, ym);
     }
     if (this.text != null && this.rect.y + this.rect.height > yt + 5) {
     g.drawString(this.text, x, yt);
     yt += 15;
     }
     if (this.showFreq && freq != 0 && this.rect.y + this.rect.height > yt + 5)
     g.drawString(this.elm.getUnitText(freq, "Hz"), x, yt);
     if (this.ptr > 5 && !this.lockScale) {
     if (!gotI && this.minMaxI > 1e-4)
     this.minMaxI /= 2;
     if (!gotV && this.minMaxV > 1e-4)
     this.minMaxV /= 2;
     }
     */
};

Scope.prototype.speedUp = function () {
    if (this.speed > 1) {
        this.speed /= 2;
        this.resetGraph();
    }
};

Scope.prototype.slowDown = function () {
    this.speed *= 2;
    this.resetGraph();
};

/*
 // Todo: implement
 Scope.prototype.getMenu = function() {
 if (elm == null)
 return null;
 if (elm instanceof TransistorElm) {
 sim.scopeIbMenuItem.setState(value == VAL_IB);
 sim.scopeIcMenuItem.setState(value == VAL_IC);
 sim.scopeIeMenuItem.setState(value == VAL_IE);
 sim.scopeVbeMenuItem.setState(value == VAL_VBE);
 sim.scopeVbcMenuItem.setState(value == VAL_VBC);
 sim.scopeVceMenuItem.setState(value == VAL_VCE && ivalue != VAL_IC);
 sim.scopeVceIcMenuItem.setState(value == VAL_VCE && ivalue == VAL_IC);
 return sim.transScopeMenu;
 } else {
 sim.scopeVMenuItem.setState(showV && value == 0);
 sim.scopeIMenuItem.setState(showI && value == 0);
 sim.scopeMaxMenuItem.setState(showMax);
 sim.scopeMinMenuItem.setState(showMin);
 sim.scopeFreqMenuItem.setState(showFreq);
 sim.scopePowerMenuItem.setState(value == VAL_POWER);
 sim.scopeVIMenuItem.setState(plot2d && !plotXY);
 sim.scopeXYMenuItem.setState(plotXY);
 sim.scopeSelectYMenuItem.setEnabled(plotXY);
 sim.scopeResistMenuItem.setState(value == VAL_R);
 sim.scopeResistMenuItem.setEnabled(elm instanceof MemristorElm);
 return sim.scopeMenu;
 }
 }
 */
Scope.prototype.setValue = function (x) {
    this.reset();
    this.value = x;
};


// TODO: implement
Scope.prototype.dump = function () {
    if (this.elm == null)
        return null;

    var flags = (this.showI ? 1 : 0) | (this.showV ? 2 : 0) |
        (this.showMax ? 0 : 4) | // showMax used to be always on
        (this.showFreq ? 8 : 0) |
        (this.lockScale ? 16 : 0) | (this.plot2d ? 64 : 0) |
        (this.plotXY ? 128 : 0) | (this.showMin ? 256 : 0);

    flags |= Scope.FLAG_YELM; // yelm present

    var eno = Circuit.locateElm(this.elm);

    if (eno < 0)
        return null;

    var yno = this.yElm == null ? -1 : Circuit.locateElm(this.yElm);

    var x = "o " + eno + " " + this.speed + " " + this.value + " " + flags + " " +
        this.minMaxV + " " + this.minMaxI + " " + this.position + " " + yno;

    if (this.text)
        x += " " + this.text;

    return x;
};


Scope.prototype.undump = function (st) {
    this.reset();

    if (typeof st == 'string') {
        st = st.split(' ');
    }

    var e = parseInt(st.shift());
    if (!e || e == -1)
        return;

    this.elm = Circuit.getElm(e);

    if (speed = st.shift())
        this.speed = parseInt(speed);

    if (value = st.shift())
        this.value = parseInt(value);

    var flags
    if (flags = st.shift())
        flags = parseInt(st.shift());
    else
        flags = 0;

    if (minMaxV = st.shift())
        this.minMaxV = parseFloat(minMaxV);

    if (minMaxI = st.shift())
        this.minMaxI = parseFloat(minMaxI);

    if (this.minMaxV == 0)
        this.minMaxV = .5;
    if (this.minMaxI == 0)
        this.minMaxI = 1;

    this.text = null;
    this.yElm = null;

    try {
        if (position = st.shift())
            this.position = parseInt(position);
        var ye = -1;
        if ((this.flags & Scope.FLAG_YELM) != 0) {
            ye = parseInt(st.shift());
            if (ye != -1)
                this.yElm = Circuit.getElm(ye);
        }
        while (st.length > 0) {
            if (this.text == null)
                this.text = st.shift();
            else
                this.text += " " + st.shift();
        }
    } catch (ee) {
    }

    this.showI = (flags & 1) != 0;
    this.showV = (flags & 2) != 0;
    this.showMax = (flags & 4) == 0;
    this.showFreq = (flags & 8) != 0;
    this.lockScale = (flags & 16) != 0;
    this.plot2d = (flags & 64) != 0;
    this.plotXY = (flags & 128) != 0;
    this.showMin = (flags & 256) != 0;
};


Scope.prototype.allocImage = function () {
    //this.pixels = null;
    var w = this.rect.width;
    var h = this.rect.height;

    if (w == 0 || h == 0)
        return;

    this.pixels = new Array(w * h);
    this.dpixels = new Array(w * h);
    for (var i = 0; i < w * h; ++i) {
        this.pixels[i] = 0;
        this.dpixels[i] = 0;
    }

    /*
     if (sim.useBufferedImage) {
     try {
     //             simulate the following code using reflection:
     //             dbimage = new BufferedImage(d.width, d.height,
     //             BufferedImage.TYPE_INT_RGB);
     //             DataBuffer db = (DataBuffer)(((BufferedImage)dbimage).
     //             getRaster().getDataBuffer());
     //             DataBufferInt dbi = (DataBufferInt) db;
     //             pixels = dbi.getData();

     Class biclass = Class.forName("java.awt.image.BufferedImage");
     Class dbiclass = Class.forName("java.awt.image.DataBufferInt");
     Class rasclass = Class.forName("java.awt.image.Raster");
     Constructor cstr = biclass.getConstructor(
     new Class[]{int.class, int.class, int.class});
     image = (Image) cstr.newInstance(new Object[]{
     new Integer(w), new Integer(h),
     new Integer(BufferedImage.TYPE_INT_RGB)});
     Method m = biclass.getMethod("getRaster");
     Object ras = m.invoke(image);
     Object db = rasclass.getMethod("getDataBuffer").invoke(ras);
     pixels = (int[])
     dbiclass.getMethod("getData").invoke(db);
     } catch (Exception ee) {
     // ee.printStackTrace();
     console.log("BufferedImage failed");
     }
     }
     if (pixels == null) {
     pixels = new int[w * h];
     int i;
     for (i = 0; i != w * h; i++)
     pixels[i] = 0xFF000000;
     imageSource = new MemoryImageSource(w, h, pixels, 0, w);
     imageSource.setAnimated(true);
     imageSource.setFullBufferUpdates(true);
     image = sim.cv.createImage(imageSource);
     }
     dpixels = new float[w * h];
     */
    this.draw_ox = this.draw_oy = -1;
}


/*
 void handleMenu(ItemEvent e, Object mi) {
 if (mi == sim.scopeVMenuItem)
 showVoltage(sim.scopeVMenuItem.getState());
 if (mi == sim.scopeIMenuItem)
 showCurrent(sim.scopeIMenuItem.getState());
 if (mi == sim.scopeMaxMenuItem)
 showMax(sim.scopeMaxMenuItem.getState());
 if (mi == sim.scopeMinMenuItem)
 showMin(sim.scopeMinMenuItem.getState());
 if (mi == sim.scopeFreqMenuItem)
 showFreq(sim.scopeFreqMenuItem.getState());
 if (mi == sim.scopePowerMenuItem)
 setValue(VAL_POWER);
 if (mi == sim.scopeIbMenuItem)
 setValue(VAL_IB);
 if (mi == sim.scopeIcMenuItem)
 setValue(VAL_IC);
 if (mi == sim.scopeIeMenuItem)
 setValue(VAL_IE);
 if (mi == sim.scopeVbeMenuItem)
 setValue(VAL_VBE);
 if (mi == sim.scopeVbcMenuItem)
 setValue(VAL_VBC);
 if (mi == sim.scopeVceMenuItem)
 setValue(VAL_VCE);
 if (mi == sim.scopeVceIcMenuItem) {
 plot2d = true;
 plotXY = false;
 value = VAL_VCE;
 ivalue = VAL_IC;
 resetGraph();
 }

 if (mi == sim.scopeVIMenuItem) {
 plot2d = sim.scopeVIMenuItem.getState();
 plotXY = false;
 resetGraph();
 }
 if (mi == sim.scopeXYMenuItem) {
 plotXY = plot2d = sim.scopeXYMenuItem.getState();
 if (yElm == null)
 selectY();
 resetGraph();
 }
 if (mi == sim.scopeResistMenuItem)
 setValue(VAL_R);
 }
 */

Scope.prototype.select = function () {
    Circuit.mouseElm = this.elm;
    if (this.plotXY) {
        Circuit.plotXElm = this.elm;
        Circuit.plotYElm = this.yElm;
    }
};

Scope.prototype.selectY = function () {
    var e = this.yElm == null ? -1 : Circuit.locateElm(this.yElm);
    var firstE = e;
    while (true) {
        for (e++; e < Circuit.elementList.size(); e++) {
            var ce = Circuit.getElm(e);
            if ((ce instanceof OutputElm || ce instanceof ProbeElm) &&
                ce != this.elm) {
                this.yElm = ce;
                return;
            }
        }
        if (firstE == -1)
            return;
        e = firstE = -1;
    }
};

