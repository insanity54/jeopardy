<template>
  <div class="player-selector">
    <PlayerButton v-for="player in players" :key="player.id" :player="player"></PlayerButton>
  </div>
</template>

<script>
import PlayerButton from './PlayerButton';
export default {
  name: 'PlayerSelector',
  components: {
    PlayerButton
  },
  props: {
  },
  computed: {
    players: function () {
      return this.$store.state.players;
    },
    selectedPlayer: function () {
      return this.players.find((p) => {
        return p.selected === true;
      })
    },
    isSelected: function () {
      if (this.isAnswerScreen) return (this.selected);
      return false;
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
</style>
