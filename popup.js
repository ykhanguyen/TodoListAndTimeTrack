/**
 * Created by ykha on 9/14/16.
 */
"use strict";
window.onload = function() {
    // if any of the slider change, this will sort the list and update it
    if(localStorage.getItem("page") !== null) {
        $(".whole-page").html(localStorage.getItem("page"));
    }
    $("#rearrage").click(showValue);
    $('#chat-form')[0].onsubmit = function(e){
        e.preventDefault();

        createNewTask($('#chat-input')[0].value, $('#project-input')[0].value, $('#prior-input')[0].value);

        $('#chat-input')[0].value = '';
        $('#project-input')[0].value = '';
        showValue();
        $("#add").fadeToggle();
    };
    $("#plus").click(function() {
        $("#add").fadeToggle();
    });
    setUpButton();
};

function setUpButton() {


    $(".prior").each(function() {
        $(this).click(prior_func);
    });
    $(".remove").each(function() {
        $(this).click(remove_func);
    });
    $(".finished").each(function() {
        $(this).click(finished_func);
    });

    $(".slider-for-each-todo").each(function() {
        $(this).change(adjustValue);
        $(this).attr("style", "display: none;");
    });
}


function createNewTask(chatInput, projectInput, priorInput) {
    var task = jQuery("<div/>", {
        "class": "sliders container"
    });
    if (chatInput == "") {
        chatInput = "N/A";
    }
    var todo = document.createElement("p");
    todo.className = "todo";
    todo.innerHTML = chatInput;
    task[0].appendChild(todo);

    var project = jQuery("<button/>", {
        "class": "project btn-xs btn-info"
    });
    if (projectInput == "") {
        projectInput = "N/A";
    }
    project.html(projectInput);

    project.appendTo(task);

    var prior = jQuery("<button/>", {
        "class": "glyphicon glyphicon-chevron-down prior btn-xs btn-warning"
    });


    prior.appendTo(task);

    //prior.click(prior_func);
    prior.click(prior_func);



    var remove = jQuery("<button/>", {
        "class": "glyphicon glyphicon-remove remove btn-danger btn-xs"
    });

    remove.appendTo(task);
    remove.click(remove_func);


    var finished = jQuery("<button/>", {
        "class": "finished glyphicon glyphicon-ok btn-success btn-xs"
    });


    finished.appendTo(task);
    finished.click(finished_func); 
    
    var slider_bar = jQuery("<input/>", {
        "class": "slider-for-each-todo",
        "style": "display: none;",
        "value": priorInput,
        "type": "range",
        "min": "0",
        "max": "100"
    });


    slider_bar.appendTo(task);
    slider_bar.change(adjustValue);

    task.appendTo(".whole-page");

    //$(prior).attr("onclick", "prior_func()");
    localStorage.setItem("page", $(".whole-page").html() );
}


function prior_func() {
    $(this).next().next().next().fadeToggle();


    localStorage.setItem("page", $(".whole-page").html() );
}
function finished_func() {
    alert("hellow");
}
function remove_func() {
    $(this).parent().remove();
    localStorage.setItem("page", $(".whole-page").html() );
}
// adjust value
function adjustValue() {
    $(this).attr("value", this.value);
    localStorage.setItem("page", $(".whole-page").html() );
}

// create the array and sort it
function showValue() {
    //var elements = [document.getElementById("1"), document.getElementById("2"), document.getElementById("3")];
    var elements = $(".whole-page").children();

    sort(elements);
    localStorage.setItem("page", $(".whole-page").html() );
}

// sort the array of slider
function sort(elements) {
    elements.sort(function (a,b) {
        //return b.value - a.value;
        return $(b).children("input")[0].value - $(a).children("input")[0].value;
    });
    redecorate(elements);
}

// display the value
function redecorate(elements) {
    $(".whole-page").html("");
    for (var i = 0; i < elements.length; i++) {
        $(".whole-page").append($(elements[i])[0]);
    }
    setUpButton();
}

