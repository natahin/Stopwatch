"use strict";

$(document).ready(function() {
    initStopwatch(".stopwatch1");
    initStopwatch(".stopwatch2");
});

var stopwatch;
var lapsText;
var btnStartStop;
var btnClear;
var btnLaps;
var timeInterval = 0;
var countLaps = 0;
var firstStartTime = 0;
var pauseTime = 0;

function initStopwatch(wrap_name) {
    stopwatch = $(wrap_name).find(".stopwatch");
    lapsText = $(wrap_name).find(".laps");
    btnStartStop = $(wrap_name).find(".start_stop_btn");
    btnClear = $(wrap_name).find(".clear_btn");
    btnLaps = $(wrap_name).find(".laps_btn");

    btnClear.on("click", function() {
        clearStopwatch();
    });

    btnStartStop.on("click", function() {
        if (stopwatch.hasClass("notactive")) {
            startStopwatch();
        } else {
            stopStopwatch();
        }
    });

    btnLaps.on("click", function() {
        createLap();
    });
}

function startStopwatch() {
    clearInterval(timeInterval);

    firstStartTime = new Date().getTime();
    timeInterval = setInterval(function() {
        var newTime = (new Date().getTime() - firstStartTime + pauseTime);
        stopwatch.text(formatTimeToString(newTime));
    }, 100);

    btnStartStop.attr("value", "Stop");
    stopwatch.removeClass("notactive");
}

function stopStopwatch() {
    clearInterval(timeInterval);

    if (firstStartTime > 0) {
        pauseTime = pauseTime + new Date().getTime() - firstStartTime;
        firstStartTime = 0;
    }

    btnStartStop.attr("value", "Start");
    stopwatch.addClass("notactive");
}

function createLap() {
    if (!stopwatch.hasClass("notactive")) {
        lapsText.append("Lap #" + (++countLaps) + ":  " + stopwatch.text() + '<br/>');
    }
}

function clearStopwatch() {
    clearInterval(timeInterval);
    btnStartStop.text("Start");
    stopwatch.addClass('notactive');
    stopwatch.text(formatTimeToString(0));
    lapsText.text("");

    firstStartTime = 0;
    pauseTime = 0;
    countLaps = 0;
}

function formatTimeToString(time) {
    var hours, minutes, seconds, milliseconds;

    milliseconds = Math.floor((time % 1000) / 100);
    seconds = Math.floor((time / 1000) % 60);
    minutes = Math.floor((time / (1000 * 60)) % 60);
    hours = Math.floor(time / (1000 * 60 * 60) % 24);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}