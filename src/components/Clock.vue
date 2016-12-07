<template>
  <div class="clock-wrapper item-flex">
    <div class="navigation">
      <a href="#" @click.stop.prevent="showTodo">Todo<i class="ion-android-arrow-forward pos-right"></i></a>
    </div>

    <div class="pomodoro-counter">
      <span class="count" v-text="pomodoroCount"></span>
      <span> pomodoro</span>
    </div>
    <div class="clock">
      <div class="clock-timer">
        <span class="min">{{ mins | time }}</span>
        <span class="sep">:</span>
        <span class="sec">{{ secs | time }}</span>
      </div><!-- end .clock-countdown -->

      <div class="clock-action">
        <button class="start vp-button vp-button--full" @click="start" v-if="!running && !done"><i class="ion-play pos-left"></i>Start</button>
        <button class="stop vp-button vp-button--full" @click="stop" v-if="running && !done"><i class="ion-stop pos-left"></i>Stop</button>
        <button class="stop vp-button vp-button--full" @click="stopBeep" v-if="done"><i :class="{ 'shake-rotate': clockShake }" class="ion-android-alarm-clock pos-left shake-constant"></i>Ok</button>
        <button class="reset vp-button" @click="reset"><i class="ion-refresh pos-left"></i>Reset</button>
      </div><!-- end .clock-action -->

      <audio id="timer-beep-sound" loop="loop" style="display: none">
        <source src="/static/beep.mp3" type="audio/mp3">
      </audio>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  const DURATION = 3
  export default {
    computed: {
      mins () {
        return parseInt(this.duration / 60, 10)
      },
      secs () {
        return parseInt(this.duration % 60, 10)
      }
    },
    data () {
      return {
        duration: DURATION,
        running: false,
        done: false,
        timer: null,
        pomodoroCount: 0,
        clockShake: false
      }
    },
    mounted () {
      this.beep = document.getElementById('timer-beep-sound')
    },
    methods: {
      start () {
        this.running = true
        this.timer = this.countdown()
      },
      stop () {
        this.running = false
        clearInterval(this.timer)
      },
      reset () {
        // stop beep if it's sounding
        this.stopBeep()
        // reset duration to default
        this.duration = DURATION
        // reset button state
        this.done = false
        this.running = false
        // clear interval of countdown
        clearInterval(this.timer)
      },
      countdown () {
        var timer = this.duration
        return setInterval(() => {
          this.mins = parseInt(timer / 60, 10)
          this.secs = parseInt(timer % 60, 10)

          if (--timer < 0) {
            this.done = true
            this.clockShake = true
            // start playing beep
            this.playBeep()
            // show notification
            this.showNotification()
            // clear interval of countdown
            clearInterval(this.timer)
            // increasing pomodoro count
            this.pomodoroCount++
          } else {
            this.duration = timer
          }
        }, 1000)
      },
      playBeep () {
        this.beep.play()
      },
      stopBeep () {
        this.clockShake = false
        this.beep.pause()
      },
      showTodo () {
        $('.todo-wrapper').removeClass('slide_right')
        $('.clock-wrapper').removeClass('slide_right')
        $('.clock-wrapper').addClass('slide_left')
        $('.todo-wrapper').addClass('slide_left')
      },
      showNotification () {
        window.Notification.requestPermission((result) => {
          if (result === 'granted') {
            navigator.serviceWorker.ready.then((registration) => {
              console.log(1)
              registration.showNotification('Vibration Sample', {
                body: 'Buzz! Buzz!',
                icon: '../images/touch/chrome-touch-icon-192x192.png',
                vibrate: [200, 100, 200, 100, 200, 100, 200],
                tag: 'vibration-sample'
              })
            })
          }
        })
      }
    },
    filters: {
      time: t => t < 10 ? '0' + t : t
    }
  }
</script>

<style lang="scss" scoped>
  @import './../sass/variable';
  @import './../sass/mixins';
  @import '~csshake/dist/csshake.min.css';
  .clock-wrapper {
    align-self: center;
    text-align: center;
    position: fixed;
    background: #EB3349; /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #EB3349 , #F45C43); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #EB3349 , #F45C43); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    top: 0;
    left: 0;
    bottom: 0;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media all and(max-width: 768px) {
      width: 100%;
      height: 50%
    }
    @media only screen
    and (max-width: 414px) {
      height: 100%;
      left: 0;
      @include transition(all .5s ease);
      &.slide_left {
        left: -100%;
      }
      &.slide_right {
        left: 0;
      }
    }
    .clock {
      &-timer {
        font-size: 10em;
        font-weight: bold;
        color: #fff;
        @media all and (max-width: 1150px) {
          font-size: 7em;
        }
        @media all and (max-width: 414px) {
          font-size: 6em;
        }
      }
      &-action {
        button {
          margin: 0 5px;
        }
      }
    }
    .pomodoro-counter {
      color: #fff;
      font-size: 1.3em;
    }
  }
</style>
