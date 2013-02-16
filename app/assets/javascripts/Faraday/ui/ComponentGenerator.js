function createLabelHTML(labelText, id) {
    if (!id)
        id = 'label';

    return '<label for=\"' + id + '\">' + labelText + '</label>';
}
;

function createTextFieldHTML(labelText, value, id) {
    if (!id)
        id = 'textField';
    if (!value)
        value = "";

    return '<div class="ui-widget">' +
        '<label for=\"' + id + '\">' + labelText + '</label>' +
        '<input id=\"' + id + '\" value=\"' + value + '\">' + '</div>';
}
;

function createSliderHTML(labelText, id) {
    if (!id)
        id = 'horizSlider';

    return '<h2 class="demoHeaders">' + labelText + '</h2>' +
        '<div id=\"' + id + '\"></div>';
}
;

// Buttons
function createDivButtonHTML(text, id) {
    if (!id)
        id = "divButton";

    return '<div id=\"' + id + '\" style="margin:.1em">' + text + '</div>';
}
;


function createButtonHTML(text, id) {
    if (!id)
        id = 'button';

    return '<div type="button" id="inputButton" style="margin:.5em" value=\"' + text + '\" />';
}
;

function createLinkButtonHTML(text, target, id) {
    if (!id)
        id = 'linkButton';

    return '<a id=\"' + id + '\" href=\"' + target + '\">' + text + '</a>';
}
;

function createSubmitButtonHTML(Text, id) {
    if (!id)
        id = 'submitButton';

    return '<input type="submit" id=\"' + id + '\" value=\"' + Text + '\" />';
}
;

function createRangedSliderHTML(labelText, id) {
    if (!id)
        id = 'rangedslider';

    return '<div class="ui-widget">' +
        '<label for=\"' + id + '\">' + labelText + '</label>' +
        '<input id=\"' + id + '\">' +
        '</div>';
}
;

function createToggleButtonsHTML(labelText, names, id) {
    if (!id)
        id = 'radio1';

    if (typeof names == 'string')
        names = names.split(' ');

    var html = '<h2 class="demoHeaders">' + labelText + '</h2>\n' +
        '<div id=\"' + id + '\">\n';

    for (var i = 0; i < names.length; ++i)
        html += '<input type="radio" id=\"radio' + (i + 1) + '\" name="radio" />\n <label for=\"radio' + (i + 1) + '\">\n' + names[i] + '\n</label>\n';

    html += '</div>';

    return html;

}
;

function createCheckboxHTML(labelText, id) {
    if (!id)
        id = 'checkbox';

    return '<input type="checkbox" />' + labelText + '<br />';
}
;