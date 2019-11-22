<template>
  <div class="daily-double">
    <span>DAILY DOUBLE</span>
  </div>
</template>

<script>
export default {
  name: 'DailyDouble',
  components: {
  },
  props: {
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  },
  created () {
    this.$root.$emit('play-audio', 'lazer');
  },
}
</script>

<style scoped>
  .daily-double {
    height: 100vh;
    color: white;
    font-family: arial;
    font-size: 11em;
    text-shadow: 2px 2px black;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-image: linear-gradient(to bottom, navy, purple, orange, purple, navy);
    justify-content: center;
    font-weight: 900;
    overflow: hidden;
    user-select: none;
    padding: 0 10vw 0 10vw;
    position: absolute;
  }





</style>
