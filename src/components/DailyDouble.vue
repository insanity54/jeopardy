<template>
  <div v-if="answer.dailyDouble" class="daily-double rollIn">
    <span>DAILY DOUBLE</span>
  </div>
</template>

<script>
export default {
  name: 'DailyDouble',
  components: {
  },
  props: {
    answer: {
      type: Object,
      required: true
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .daily-double {
    color: white;
    position: absolute;
    font-size: 3em;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-family: arial;
    font-weight: 900;
    background-image: linear-gradient(to bottom, navy, purple, orange, purple, navy);
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-timing-function: linear;
    animation-name: rollIn;
  }



  @keyframes rollIn {
     0% {
        transform: perspective(500px) scale(0.1) rotateX(360deg);
     }
     100% {
        transform: perspective(0);
     }
  }

</style>
