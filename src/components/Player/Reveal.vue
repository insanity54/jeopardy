<template>
  <div class="reveal">
    <h1>Jepurdee</h1>
    <p>FinalRevealState: {{ finalRevealState }}</p>
  </div>
</template>

<script>
export default {
  name: 'Reveal',
  components: {
  },
  data: function () {
    return {
    }
  },
  props: {
    playerId: {
      type: String,
      required: true
    }
  },
  computed: {
    finalRevealState: function () {
      return this.player.finalRevealState;
    },
    isEliminated: function () {
      if (this.score > 0) return false;
      else return true;
    },
    score: function () {
      return this.player.score;
    },
    player: function () {
      return this.$store.state.players.find((p) => p.id === this.playerId);
    },
  },
  methods: {
  },
}
</script>

<style scoped>
  .score {
    border: 3px dashed yellow;
    font-weight: bold;
    background-color: black;
    padding: 0 1em;
    margin: 0.5em;
  }
  .reveal h1 {
    color: white;
    background-color: navy;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
