/**
* Created by ykha on 9/14/16.
*/

"use strict";





window.onload = function () {
    // if any of the slider change, this will sort the list and update it
    if (localStorage.getItem("page") !== null) {
        $(".whole-page").html(localStorage.getItem("page"));

        $(".sliders").css("top", "0px");
        $(".sliders").children().not("p").not(".project").not(".slider-for-each-todo").hide();
        $(".slider-for-each-todo").hide();
    }
    console.log(localStorage.getItem("map"));
    if (localStorage.getItem("map") === null) {


        var map = new Object();
        map["kha"] = "cool";

        localStorage.setItem("map", JSON.stringify(map));
    }
    $('#chat-form')[0].onsubmit = function (e) {
        e.preventDefault();

        createNewTask($('#chat-input')[0].value, $('#project-input')[0].value, $('#prior-input')[0].value);

        $('#chat-input')[0].value = '';
        $('#project-input')[0].value = '';
        showValue();
        $("#add").fadeToggle();
    };
    $("#plus").click(function () {
        $("#add").fadeToggle();
    });

    $("#all-down").click(function() {
       $(".sliders").each(function() {
           $(this).children("input").fadeToggle();
    })});


    //console.log(get("kha"));

    setUpButton();
};

function setUpSlide() {
    //$(".whole-page").html(localStorage.getItem("page"));
    //$(".sliders").css("top", "0px");
    $(".sliders").draggable({ axis: "y",
        cursor: "crosshair",
        scope: "drop",
        stack: "div",
        revert : true
    });

    $('.sliders').droppable({
        scope: "drop",
        drop: function(event, ui) {
            console.log(ui.draggable.children("input")[0].value);
            //ui.draggable.draggable('option','revert',false);
            //ui.draggable.children("input")[0].value = $(this).children("input")[0].value -1;
            ui.draggable.children("input").attr("value", $(this).children("input")[0].value );
            console.log(parseInt($(this).children("input")[0].value) + 1 );
            $(this).children("input").attr("value",parseInt($(this).children("input")[0].value) + 1 );

            showValue();
            setUpButton();
            console.log($(this).children("input")[0].value);
        },
        greedy: true
    });
}

function setUpButton() {

    $(".sliders").hover(function () {
        $(this).children().not("p").not(".project").not(".slider-for-each-todo").fadeIn();
    }, function() {
        $(this).children().not("p").not(".project").not(".slider-for-each-todo").hide();
    });

    setUpSlide();

    /*
    $(".sliders").mousedown(function() {
        this.dragging = true;
        this.atY = parseInt(event.clientY);
        console.log("hello");
    });

    $(".sliders").mouseup(function() {
        this.dragging = false;
        console.log("bye");
    });

    $(".sliders").mousemove(function() {
        if (this.dragging) {
            //console.log("i'm here");
            var newLocationY = parseInt(event.clientY);
            var dy = newLocationY - this.atY;
            this.atY = newLocationY;
            //console.log(this.style.top);
            //$(this).offset({top: this.style.top + dy});
            var position = $(this).position();
            console.log(position.top);
            //console.log($(this).css("top"));
            console.log($(this).css("background-color"));
            var newY = position.top + dy;

            $(this).css("top", newY);

            console.log(this.style.top);
        }
    });
    */
    /*, function () {
        $(this).children().not("p").not(".project").not(".slider-for-each-todo").hide();
    });
    */
    $(".prior").each(function () {
        $(this).click(prior_func);
    });
    $(".remove").each(function () {
        $(this).click(remove_func);
    });
    $(".finished").each(function () {
        $(this).click(finished_func);
    });

    $(".slider-for-each-todo").each(function () {
        $(this).change(adjustValue);
        //$(this).attr("style", "display: none;");
    });

}


function createNewTask(chatInput, projectInput, priorInput) {
    var task = jQuery("<div/>", {
        "class": "sliders container ui-widget-content"
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
        "class": "glyphicon glyphicon-chevron-down prior btn-xs btn-warning",
        "style": "display: none"

    });

    prior.appendTo(task);

    //prior.click(prior_func);
    prior.click(prior_func);


    var remove = jQuery("<button/>", {
        "class": "glyphicon glyphicon-remove remove btn-danger btn-xs",

        "style": "display: none"
    });

    remove.appendTo(task);
    remove.click(remove_func);

    var finished = jQuery("<button/>", {
        "class": "finished glyphicon glyphicon-ok btn-success btn-xs",

        "style": "display: none"
    });

    finished.appendTo(task);
    finished.click(finished_func);

    var slider_bar = jQuery("<input/>", {
        "class": "slider-for-each-todo",
        "style": "display: none;",
        "value": priorInput,
        "type": "range",
        "min": "0",
        "max": "1000"
    });

    slider_bar.appendTo(task);
    slider_bar.change(adjustValue);

    task.appendTo(".whole-page");

    //$(prior).attr("onclick", "prior_func()");
    localStorage.setItem("page", $(".whole-page").html());
}



function prior_func() {
    $(this).next().next().next().fadeToggle();
    localStorage.setItem("page", $(".whole-page").html());
}

function finished_func() {
    var form_input = $("<form>");
    form_input.appendTo($(this).parent());

    var input = $("<input>", {
        type: "number",
        name: "hours",
        placeholder: "input total hours",
    });

    input.appendTo(form_input);

    $(form_input).submit(function() {
        $(this).parent().fadeOut().remove();
        var map_json = localStorage.getItem("map");
        var map = JSON.parse(map_json);
        map["kha"] = "yeah" + 3;

        var key = $(this).parent().children(".project").html();

        map[key] = ($(this).children("input"))[0].value;
        localStorage.setItem("map", JSON.stringify(map));
        console.log(localStorage.getItem("map"));

        //console.log(map);
        //map["kha"] = "cool";
        //localStorage.setItem("map", map);
        //console.log(map["kha"]);
        //console.log(localStorage.getItem("map").get("kha"));
        localStorage.setItem("page", $(".whole-page").html());
    });

    $(this).parent().children("button").not(".project").remove();
}

function remove_func() {
    $(this).parent().fadeOut().remove();
    localStorage.setItem("page", $(".whole-page").html());
}

// adjust value
function adjustValue() {
    $(this).attr("value", this.value);
    showValue();
    localStorage.setItem("page", $(".whole-page").html());
}

// create the array and sort it
function showValue() {
    var elements = $(".whole-page").children();
    sort(elements);
    localStorage.setItem("page", $(".whole-page").html());
}

// sort the array of slider
function sort(elements) {
    elements.sort(function (a, b) {
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

