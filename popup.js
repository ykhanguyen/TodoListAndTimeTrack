/**
 * Created by ykha on 9/14/16.
 */
"use strict";
window.onload = function() {
    // if any of the slider change, this will sort the list and update it
    if(localStorage.getItem("page") !== null) {
        console.log("i'm here");
        $(".whole-page").html(localStorage.getItem("page"));
        console.log(localStorage.getItem("page"));
    }
    $("#1").change(adjustValue);
    $("#2").change(adjustValue);
    $("#3").change(adjustValue);
    $("#rearrage").click(showValue);
    $('#chat-form')[0].onsubmit = function(e){
        e.preventDefault();

        console.log($('#chat-input')[0].value);
        createNewTask($('#chat-input'), $('#project-input'));

        $('#chat-input')[0].value = '';
        $('#project-input')[0].value = '';
        $("#add").fadeToggle();
    };

    $("#plus").click(function() {
        $("#add").fadeToggle();
    });
};

function createNewTask(chatInput, projectInput) {
    
}


// adjust value
function adjustValue() {
    $(this).attr("value", this.value);
    localStorage.setItem("page", $(".whole-page").html() );
}

// create the array and sort it
function showValue() {
    var elements = [document.getElementById("1"), document.getElementById("2"), document.getElementById("3")];
    sort(elements);
    localStorage.setItem("page", $(".whole-page").html() );
}
4
// sort the array of slider
function sort(elements) {
    elements.sort(function (a,b) {return b.value - a.value});
    redecorate(elements);
}

// display the value
function redecorate(elements) {
    $(".whole-page").html("");
    for (var i = 0; i < elements.length; i++) {
        $(".whole-page").append($(elements[i])[0].name);
        $(".whole-page").append($(elements[i])[0]);
    }
}

