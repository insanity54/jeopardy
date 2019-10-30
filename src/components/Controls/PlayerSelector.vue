<template>
  <div class="player-selector" :class="{ highlighted: isPlayerSelectionRequired }">
    <PlayerButton v-for="player in players" :key="player.id" :player="player"></PlayerButton>
  </div>
</template>

<script>
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
    selectPlayer: function (p) {
      return this.$store.commit('selectPlayer', p);
    },
    setChooserPlayer: function (p) {
      return this.$store.commit('setChooserPlayer', p);
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
}
.selected {
  text-decoration: underline overline;
}
.highlighted {
  animation: 0.5s infinite alternate strobe;
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
