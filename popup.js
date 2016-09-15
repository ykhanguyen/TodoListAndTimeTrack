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
        createNewTask($('#chat-input')[0].value, $('#project-input')[0].value);

        $('#chat-input')[0].value = '';
        $('#project-input')[0].value = '';
        $("#add").fadeToggle();
    };

    $("#plus").click(function() {
        $("#add").fadeToggle();
    });

    $(".prior").each(function() {
       $(this).click(prior_func);
    });
    $(".remove").each(function() {
        $(this).click(remove_func);
    });
    $(".finished").each(function() {
        $(this).click(finished_func);
    });
};

function createNewTask(chatInput, projectInput) {
    var task = jQuery("<div/>", {
        "class": "sliders"
    });
    
    var todo = document.createElement("p");
    todo.className = "todo";
    todo.innerHTML = chatInput;
    task[0].appendChild(todo);

    var prior = jQuery("<button/>", {
        "class": "glyphicon glyphicon-chevron-down prior"
    });


    prior.appendTo(task);

    //prior.click(prior_func);
    prior.click(prior_func);



    var remove = jQuery("<button/>", {
        "class": "glyphicon glyphicon-remove remove"
    });

    remove.appendTo(task);
    remove.click(remove_func);


    var finished = jQuery("<button/>", {
        "class": "finished glyphicon glyphicon-ok"
    });

    finished.appendTo(task);
    finished.click(finished_func);




    task.appendTo(".whole-page");

    //$(prior).attr("onclick", "prior_func()");
    localStorage.setItem("page", $(".whole-page").html() );
}

function prior_func() {
    alert("hellow");
}
function finished_func() {
    alert("hellow");
}
function remove_func() {
    console.log("remove");
    $(this).parent().remove();
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

