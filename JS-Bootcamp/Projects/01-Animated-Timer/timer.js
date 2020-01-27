class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        //Lets the interval variable that is declared here to be accessed in the whole class
        this.interval = setInterval(this.tick, 20);
    };

    pause = () => {
        //Clears the interval, by accessing the variable that was declared under start()
        clearInterval(this.interval);
    };

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        //Calls the setter      calls the getter
        this.timeRemaining = this.timeRemaining - 0.05;
        };
    };

    //Retrieves a variable from inside the class
    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    };

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    };
}