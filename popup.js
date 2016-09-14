/**
 * Created by ykha on 9/14/16.
 */
window.onload = function() {
    // if any of the slider change, this will sort the list and update it
    document.getElementById("1").onchange = showValue;

    document.getElementById("2").onchange = showValue;

    document.getElementById("3").onchange = showValue;
};

// create the array and sort it
function showValue() {
    var elements = [document.getElementById("1"), document.getElementById("2"), document.getElementById("3")];
    sort(elements);
}

// sort the array of slider
function sort(elements) {
    elements.sort(function (a,b) {return b.value - a.value});
    redecorate(elements);
}

// display the value
function redecorate(elements) {
    document.getElementById("first").innerHTML = elements[0].name;
    document.getElementById("second").innerHTML = elements[1].name;
    document.getElementById("third").innerHTML = elements[2].name;
}