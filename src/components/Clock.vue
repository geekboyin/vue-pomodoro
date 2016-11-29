<template>
  <div class="clock-wrapper item-flex">
    <div class="clock">
      <div class="clock-countdown">
        <span class="min" v-text="mins"></span>
        <span class="sep">:</span>
        <span class="sec" v-text="secs"></span>
      </div><!-- end .clock-countdown -->

      <div class="clock-action">
        <button class="start vp-button vp-button--full" @click="start"><i class="ion-play pos-left"></i>Start</button>
        <button class="reset vp-button"><i class="ion-refresh pos-left"></i>Reset</button>
      </div><!-- end .clock-action -->
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        duration: 25 * 60,
        mins: '25',
        secs: '00',
        running: false,
        pause: false
      }
    },
    methods: {
      start () {
        var timer = this.duration
        setInterval(() => {
          this.mins = parseInt(timer / 60, 10)
          this.secs = parseInt(timer % 60, 10)

          if (--timer < 0) {
            console.log('done')
          }
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .clock-wrapper {
    align-self: center;
    text-align: center;
    &:before {
      content: '';
      position: fixed;
      background: #EB3349; /* fallback for old browsers */
      background: -webkit-linear-gradient(to left, #EB3349 , #F45C43); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to left, #EB3349 , #F45C43); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      top: 0;
      left: 0;
      bottom: 0;
      width: 50%;
      z-index: -1;
    }
    .clock {
      &-countdown {
        font-size: 10em;
        font-weight: bold;
        color: #fff;
      }
      &-action {
        button {
          margin: 0 5px;
        }
      }
    }
  }
</style>
