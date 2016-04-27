function Stopwatch($container) {
    var self = this;
    var container = $($container);
    this.stopwatch = container.find(".stopwatch");
    this.lapsText = container.find(".laps");
    this.btnStartStop = container.find(".start_stop_btn");
    this.btnClear = container.find('.clear_btn');
    this.btnLaps = container.find(".laps_btn");

    this.timeInterval = 0;
    this.countLaps = 0;
    this.firstStartTime = 0;
    this.pauseTime = 0;

    this.btnClear.on('click', function() {
        self.clear();
    });

    this.btnStartStop.on('click', function() {
        console.log(this.stopwatch);
        if (self.stopwatch.hasClass('notactive')) {
            self.start();
        } else {
            self.stop();
        }
    });
    this.btnLaps.on('click', function() {
        self.createLap();
    });
}

Stopwatch.prototype.start = function() {
    var self = this;
    clearInterval(this.timeInterval);
    var newTime;
    this.firstStartTime = new Date().getTime();
    this.timeInterval = setInterval(function() {
        newTime = (new Date().getTime() - self.firstStartTime + self.pauseTime);
        self.stopwatch.text(formatTimeToString(newTime));
    }, 100);
    this.btnStartStop.attr("value", "Stop");
    this.stopwatch.removeClass("notactive");

};

Stopwatch.prototype.stop = function() {
    clearInterval(this.timeInterval);
    if (this.firstStartTime > 0) {
        this.pauseTime = this.pauseTime + new Date().getTime() - this.firstStartTime;
//        console.log();
        this.firstStartTime = 0;

    }
        this.stopwatch.addClass("notactive");
        this.btnStartStop.attr("value","Start");
};

Stopwatch.prototype.createLap = function() {
    if (!this.stopwatch.hasClass('notactive')) {
        this.lapsText.append("Lap #" + (++this.countLaps) + ":  " + this.stopwatch.text() + '<br/>');
    }
};

Stopwatch.prototype.clear = function() {
    
    clearInterval(this.timeInterval);
    this.btnStartStop.text("Start");
    this.stopwatch.addClass('notactive');
    this.stopwatch.text(formatTimeToString(0));
    this.lapsText.text("");
    this.firstStartTime = 0;
    this.pauseTime = 0;
    this.countLaps = 0;
};

function formatTimeToString(time) {
    var hours;
    var minutes;
    var seconds;
    var milliseconds;

    milliseconds = Math.floor((time % 1000) / 100);
    seconds = Math.floor((time / 1000) % 60);
    minutes = Math.floor((time / (1000 * 60)) % 60);
    hours = Math.floor(time / (1000 * 60 * 60) % 24);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

new Stopwatch('.stopwatch1');
