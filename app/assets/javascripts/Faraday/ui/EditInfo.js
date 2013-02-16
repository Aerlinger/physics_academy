function EditInfo(n, val, minVal, maxVal) {

    this.text = '';

    this.name = n;    // Element unit Variable name (e.g. capacitance, resistance, etc...)
    this.value = val;  // Value of the unit (e.g. Farads, Ohms, etc...)

    this.textf = null;         // TextFields textf;
    this.bar = null;         // Scrollbar bar;
    this.choice = new Array();  // Choice choice;
    this.checkbox = null;         // Checkbox checkbox;
    //this.newDialog  = new Array();   // boolean newDialog;

    if ((!minVal || !maxVal) || (minVal == 0 && maxVal == 0 && val > 0)) {
        this.minval = 1e10;
        while (this.minval > val / 100)
            this.minval /= 10.;
        this.maxval = this.minval * 1000;
    } else {
        this.minval = minVal;
        this.maxval = maxVal;
    }
    this.forceLargeM = name.indexOf("(ohms)") > 0 || name.indexOf("(Hz)") > 0;

    this.dimensionless = false;

    this.setDimensionless = function () {
        this.dimensionless = true;
        return this;
    };

}
;

