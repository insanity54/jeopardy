<template>
  <div class="final-wager-display">
    <div v-for="player in finalPlayers" :style="{ backgroundColor: player.color }" :key="player.id">
      {{ player.name }} {{ player.finalWager }} {{ player.finalQuestion }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'FinalWagerDisplay',
  components: {
  },
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'finalPlayers',
      'isFinalJepurdee',
      'isFinalStateIntro',
      'isFinalStateCategory',
      'isFinalStateAnswer',
      'isFinalStateReveal',
    ])
  },
  props: {
  },
  methods: {
  }
}
</script>

<style scoped>
.final-player-list {
  display: flex;
  flex-wrap: wrap;
}
.button.player {
  color: white;
}
.button.reveal {
  background-color: red;
}
.button.final {
  background-color: orange;
}
.button.start {
  background-color: green;
}
.revealer {
  display: flex;
  flex-direction: row;
  z-index: 9999;
}
.revealer .button:nth-child(1) {
  background-color: purple;
}
.revealer .button:nth-child(2) {
  background-color: green;
}
.final-lifecycle {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
