

class Pomodoro {
    constructor(timerDiv) {
        this.timer //Timeout
        this.timerDiv = timerDiv //Element
        this.cycleType = "Session"
        this.cycleTypeElement = document.querySelector("#cycle-type")
        this.sessionTime = 25 * 60
        this.breakTime = 5 * 60
        this.time = this.sessionTime //current time in seconds on timer

        // Buttons
        this.startButton = document.querySelector("#start") //start button element
        this.pauseButton = document.querySelector("#pause")
        this.stopButton = document.querySelector("#stop")
        this.pauseButton.disabled = true
        this.stopButton.disabled = true
        this.resetButton = document.querySelector("#reset")
        let that = this
        this.startButton.addEventListener("click", function () {
            that.startTimer()
            that.startButton.disabled = true
            that.pauseButton.disabled = false
            that.stopButton.disabled = false
        })
        this.pauseButton.addEventListener("click", function () {
            that.pauseTimer()
        })
        this.stopButton.addEventListener("click", function () {
            that.stopTimer()
        })
        this.resetButton.addEventListener("click", function () {
            that.resetTimer()
        })
    }

    resetTimer() {
        this.sessionTime = 25 * 60
        this.breakTime = 5 * 60
        this.stopTimer()
    }

    stopTimer() {
        clearTimeout(this.timer)

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
        this.stopButton.disabled = true
    }

    updateTime() {
        console.log(this.time)
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
        console.log(this.time)
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

// function updateTime(timeElement, time) {
//     let minutes = Math.floor(time / 60)
//     let seconds = time % 60
//     if (seconds < 10) {
//         timeElement.innerHTML = `${minutes}:0${seconds}`;
//     } else {
//         timeElement.innerHTML = `${minutes}:${seconds}`;
//     }
// }

// function startTimer(timeElement) {
//     timer = setInterval(function(){ decrementTimer(timeElement)}, 1000)
// }

// function decrementTimer(timeElement) {
//     let currTime = getTime(timeElement)
//     updateTime(timeElement, --currTime)
//     // When finished
//     if (currTime ==0) {
//         clearTimeout(timer)
//         alarm()
//     }
// }

// function getTime(timeElement) {
//     let time = timeElement.innerHTML.split(":")
//     time = parseInt(time[0]) * 60 + parseInt(time[1])
//     return time;
// }

// Set up
let timeElement = document.querySelector("#time");
let pomodoro = new Pomodoro(timeElement)