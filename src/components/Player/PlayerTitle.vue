<template>
  <div v-if="playerId" class="player-title-heading" :style="{ backgroundColor: player.color }">
    <h1>{{ player.name }}</h1>
  </div>
</template>

<script>
export default {
  name: 'PlayerTitle',
  components: {
  },
  data: function () {
    return {
    }
  },
  props: {
    playerId: {
      type: String,
      required: false
    }
  },
  methods: {
  },
  computed: {
    player: function () {
      if (!this.playerId) return {};
      return this.$store.state.players.find((p) => p.id === this.playerId);
    }
  },
  created: function () {
    console.log(`playerId:${this.playerId}, player:${this.player}`)
  }
}
</script>

<style scoped>
  @media screen and (min-width: 601px) {
    .player-title-heading h1 {
      font-size: 30pt;
    }
    .player-title-heading {
      padding: 0;
    }
  }
  .player-title-heading {
    box-sizing: border-box;
    padding: 1em;
    width: 100%;
    -moz-text-fill-color: #000;
    -webkit-text-fill-color: #000;
    -moz-text-stroke-color: grey;
    -webkit-text-stroke-color: grey;
    -moz-text-stroke-width: 1px;
    -webkit-text-stroke-width: 1px;
  }
</style>
