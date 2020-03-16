

class Pomodoro {
    constructor(timerDiv) {
        this.timer //Timeout
        this.timerDiv = timerDiv //Element
        this.cycleType = "Session"
        this.cycleTypeElement = document.querySelector("#cycle-type")
        this.sessionTime = 25 * 60
        this.sessionTimeElement = document.querySelector("#session-length")
        this.breakTimeElement = document.querySelector("#break-length")
        this.breakTime = 5 * 60
        this.time = this.sessionTime //current time in seconds on timer
        this.active = false

        // Buttons
        this.startButton = document.querySelector("#start")
        this.pauseButton = document.querySelector("#pause")
        this.stopButton = document.querySelector("#stop")
        this.pauseButton.disabled = true
        this.stopButton.disabled = true
        this.resetButton = document.querySelector("#reset")

        this.incrementSessionButton = document.querySelector("#session-increment")
        this.decrementSessionButton = document.querySelector("#session-decrement")
        this.incrementBreakButton = document.querySelector("#break-increment")
        this.decrementBreakButton = document.querySelector("#break-decrement")

        let that = this
        this.startButton.addEventListener("click", function () {
            that.startTimer()
            that.startButton.disabled = true
            that.pauseButton.disabled = false
            that.stopButton.disabled = false
            that.active = true;
        })
        this.pauseButton.addEventListener("click", function () {
            that.pauseTimer()
        })
        this.stopButton.addEventListener("click", function () {
            that.stopTimer()
            that.active = false;
        })
        this.resetButton.addEventListener("click", function () {
            that.resetTimer()
        })
        this.incrementSessionButton.addEventListener("click", function () {
            that.incrementSession()
        })
        this.decrementSessionButton.addEventListener("click", function () {
            that.decrementSession()
        })
        this.incrementBreakButton.addEventListener("click", function () {
            that.incrementBreak()
        })
        this.decrementBreakButton.addEventListener("click", function () {
            that.decrementBreak()
        })
    }

    incrementSession() {
        this.sessionTime = this.sessionTime + 60
        this.sessionTimeElement.innerHTML = this.sessionTime / 60
        if (!this.active) {
            this.stopTimer()
        }
    }

    decrementSession() {
        // Only decrement to 1
        if (this.sessionTime > 60) {
            this.sessionTime = this.sessionTime - 60
            this.sessionTimeElement.innerHTML = this.sessionTime / 60
        }
        if (!this.active) {
            this.stopTimer()
        }
    }

    incrementBreak() {
        this.breakTime = this.breakTime + 60
        this.breakTimeElement.innerHTML = this.breakTime / 60
        if (!this.active) {
            this.stopTimer()
        }
    }

    decrementBreak() {
        // Only decrement to 1
        if (this.breakTime > 60) {
            this.breakTime = this.breakTime - 60
            this.breakTimeElement.innerHTML = this.breakTime / 60
        }
        if (!this.active) {
            this.stopTimer()
        }
    }

    resetTimer() {
        this.sessionTime = 25 * 60
        this.breakTime = 5 * 60
        this.breakTimeElement.innerHTML = 5
        this.sessionTimeElement.innerHTML = 25
        this.stopTimer()
    }

    stopTimer() {
        clearTimeout(this.timer)
        this.active = false;

        this.cycleType = "Session"
        this.cycleTypeElement.innerHTML = "Session"

        this.time = this.sessionTime
        this.updateTime()

        this.startButton.disabled = false
        
        this.pauseButton.disabled = true
        this.stopButton.disabled = true
    }

    pauseTimer() {
        clearTimeout(this.timer)
        this.startButton.disabled = false
        this.pauseButton.disabled = true
    }

    updateTime() {
        let minutes = Math.floor(this.time / 60)
        let seconds = this.time % 60
        if (seconds < 10) {
            this.timerDiv.innerHTML = `${minutes}:0${seconds}`;
        } else {
            this.timerDiv.innerHTML = `${minutes}:${seconds}`;
        }
    }

    startTimer() {
        let that = this
        this.timer = setInterval(function(){that.decrementTimer()}, 1000)
    }

    decrementTimer() {
        this.time = this.time - 1
        this.updateTime()
        // When finished
        if (this.time == 0) {
            clearTimeout(this.timer)
            this.triggerAlarm()
        }
    }

    changeCycleType() {
        if (this.cycleType == "Session") {
            this.cycleType = "Break"
        } else {
            this.cycleType = "Session"
        }
        this.cycleTypeElement.innerHTML = this.cycleType
    }


    triggerAlarm() {
        // Resets timer based on cycle type Session => Break time, Break => Session time
        if (this.cycleType == "Session") {
            this.time = this.breakTime
        } else {
            this.time = this.sessionTime
        }
        this.changeCycleType()
        this.updateTime()
        this.startTimer()
    }

}

// Set up
let timeElement = document.querySelector("#time");
let pomodoro = new Pomodoro(timeElement)