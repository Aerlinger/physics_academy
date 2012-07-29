function EditDialog(ce) {

    this.apply = function () {

    };

    this.einfocount = 0;
    EditDialog.barmax = 1000;

    // Reset the form
    $('#edit_pane').text('');

    this.elm = ce;
    this.einfos = new Array(10);

    var i;
    for (i = 0; ; i++) {

        this.einfos[i] = this.elm.getEditInfo(i);

        if (this.einfos[i] == null)
            break;

        var ei = this.einfos[i];

        // Create the label
        $("#edit_pane").append(createLabelHTML(ei.name, ei.value));

        if (ei.choice != null && (ei.choice.length > 0)) {
            // Add choice widget
            $("#edit_pane").append(createToggleButtonsHTML('', ei.choice, i));

        } else if (ei.checkbox) {
            // Add checkbox here
            $("#edit_pane").append(createCheckboxHTML(ei.checkbox, i));

        } else {
            // Add the editable text field
            ei.textf = this.unitString(ei);

            var textHTML = createTextFieldHTML(ei.text, ei.value);
            $("#edit_pane").append(textHTML);
            if (ei.text) {
                // Add the event handler for the text field

                //ei.textf.addActionListener(this);
                ei.textf.setText(ei.text);
            }
            if (!ei.text) {
                // Add the scrollbar

                $("#edit_pane").append(createSliderHTML('slider'));
                //add(ei.bar = new Scrollbar(Scrollbar.HORIZONTAL, 50, 10, 0, barmax + 2));
                //this.setBar(ei);
            }
        }
    }

    this.einfocount = i;

    // ===========================
    // Add the apply button:
    // ===========================
    var applyHTML = createDivButtonHTML("Apply", "applybtn");
    $('#edit_pane').append(applyHTML);
    //$("#applybtn").button();
    self = this;

    $("#applybtn").click(function () {
        for (i = 0; i != self.einfocount; i++) {

            var ei = self.einfos[i];
            if (ei.textf == null)
                continue;
            if (ei.text == null || ei.text == "") {
                try {
                    var d = self.parseUnits(ei);
                    ei.value = d;
                } catch (ex) {
                }
            }

            self.elm.setEditValue(i, ei);

            if (ei.text == null)
                this.setBar(ei);
        }
        CirSim.needAnalyze();
    });

}
;

EditDialog.prototype.unitString = function (ei) {
    var v = ei.value;
    var va = Math.abs(v);

    if (ei.dimensionless)
        return noCommaFormat(v);
    if (v == 0) return "0";
    if (va < 1e-9)
        return noCommaFormat(v * 1e12) + "p";
    if (va < 1e-6)
        return noCommaFormat(v * 1e9) + "n";
    if (va < 1e-3)
        return noCommaFormat(v * 1e6) + "u";
    if (va < 1 && !ei.forceLargeM)
        return noCommaFormat(v * 1e3) + "m";
    if (va < 1e3)
        return noCommaFormat(v);
    if (va < 1e6)
        return noCommaFormat(v * 1e-3) + "k";
    if (va < 1e9)
        return noCommaFormat(v * 1e-6) + "M";

    return noCommaFormat(v * 1e-9) + "G";
};

EditDialog.prototype.parseUnits = function (ei) {

    var s = $('#textField').val();//ei.textf.getText();
    s = s.trim();

    var len = s.length;
    var uc = s.charAt(len - 1);
    var mult = 1;

    switch (uc) {
        case 'p':
        case 'P':
            mult = 1e-12;
            break;
        case 'n':
        case 'N':
            mult = 1e-9;
            break;
        case 'u':
        case 'U':
            mult = 1e-6;
            break;

        // for ohm values, we assume mega for lowercase m, otherwise milli
        case 'm':
            mult = (ei.forceLargeM) ? 1e6 : 1e-3;
            break;

        case 'k':
        case 'K':
            mult = 1e3;
            break;
        case 'M':
            mult = 1e6;
            break;
        case 'G':
        case 'g':
            mult = 1e9;
            break;
    }
    if (mult != 1)
        s = s.substring(0, len - 1).trim();
    return parseFloat(noCommaFormat(s)) * mult;

};


/*
 public void actionPerformed(e) {
 int i;
 Object src = e.getSource();
 for (i = 0; i != einfocount; i++) {
 EditInfo ei = this.einfos[i];
 if (src == ei.textf) {
 if (ei.text == null) {
 try {
 double d = parseUnits(ei);
 ei.value = d;
 } catch (Exception ex) { }  // Ignored
 }
 elm.setEditValue(i, ei);
 if (ei.text == null)
 setBar(ei);
 cframe.needAnalyze();
 }
 }
 if (e.getSource() == okButton) {
 apply();
 cframe.main.requestFocus();
 setVisible(false);
 cframe.editDialog = null;
 }
 if (e.getSource() == applyButton)
 this.apply();
 }
 */

EditDialog.prototype.adjustmentValueChanged = function (e) {
    var src = e.getSource();
    var i;
    for (i = 0; i != this.einfocount; i++) {
        var ei = this.einfos[i];
        if (ei.bar == src) {
            var v = ei.bar.getValue() / 1000.;
            if (v < 0)
                v = 0;
            if (v > 1)
                v = 1;
            ei.value = (ei.maxval - ei.minval) * v + ei.minval;
            /*if (ei.maxval-ei.minval > 100)
             ei.value = Math.round(ei.value);
             else
             ei.value = Math.round(ei.value*100)/100.;*/
            ei.value = Math.round(ei.value / ei.minval) * ei.minval;
            this.elm.setEditValue(i, ei);
            ei.textf.setText(this.unitString(ei));
            CirSim.needAnalyze();
        }
    }
};

EditDialog.prototype.itemStateChanged = function (e) {
    // TODO: implement
//    Object src = e.getItemSelectable();
//    var i;
//
//    var changed = false;
//    for (i = 0; i != einfocount; i++) {
//        var ei = this.einfos[i];
//
//        if (ei.choice == src || ei.checkbox == src) {
//            this.elm.setEditValue(i, ei);
//            if (ei.newDialog)
//                changed = true;
//            CirSim.needAnalyze();
//        }
//    }
//    if (changed) {
//        //setVisible(false);
//        //cframe.editDialog = new EditDialog(elm, cframe);
//        //cframe.editDialog.show();
//    }
};

EditDialog.prototype.handleEvent = function (ev) {
// TODO: Implement
// if (ev.id == Event.WINDOW_DESTROY) {
//        cframe.main.requestFocus();
//        setVisible(false);
//        cframe.editDialog = null;
//        return true;
//    }
//    return super.handleEvent(ev);
};

EditDialog.prototype.setBar = function (ei) {
    var x = Math.floor(this.barmax * (ei.value - ei.minval) / (ei.maxval - ei.minval));
    //ei.bar.setValue(x);
};