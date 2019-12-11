<template>
  <div class="buzzer-selector">
    <BuzzerButton v-for="player in players" :key="player.id" :player="player"></BuzzerButton>
  </div>
</template>

<script>
import BuzzerButton from './BuzzerButton';
export default {
  name: 'BuzzerSelector',
  components: {
    BuzzerButton
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
    }
  }
}
</script>

<style>
.buzzer-selector {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.selected {
  text-decoration: underline overline;
}
.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
