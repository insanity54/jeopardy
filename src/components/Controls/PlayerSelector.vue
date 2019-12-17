<template>
  <div class="player-selector" :class="{ highlighted: isPlayerSelectionRequired }">
    <div class="button random-player-selector" @click="selectRandomPlayer">
      <i class="material-icons">shuffle</i>
      <p>Random</P>
    </div>
    <PlayerButton v-for="player in players" :key="player.id" :player="player"></PlayerButton>
  </div>
</template>

<script>
import { randomIntFromInterval } from '@/util/util'
import { mapGetters, mapState } from 'vuex';
import PlayerButton from './PlayerButton';
export default {
  name: 'PlayerSelector',
  components: {
    PlayerButton
  },
  props: {
  },
  computed: {
    ...mapState({
      players: state => state.players
    }),
    ...mapGetters([
      'selectedPlayer'
    ]),
    isPlayerSelectionRequired: function () {
      if (typeof this.selectedPlayer === 'undefined') return true;
      else return false;
    }
  },
  methods: {
    selectRandomPlayer: function () {
      let randomPlayerIndex = randomIntFromInterval(0, (this.players.length-1));
      let randomPlayer = this.players[randomPlayerIndex];
      this.$store.commit('setSelectedPlayer', randomPlayer);
      this.$socket.emit('setSelectedPlayer', randomPlayer);
    }
  }
}
</script>

<style>
.player-selector {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.selected {
  text-decoration: underline overline;
}
.highlighted {
  animation: 0.5s infinite alternate strobe;
}
.random-player-selector {
  background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet);
}

@keyframes strobe {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

</style>
