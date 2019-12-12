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
  },
  methods: {
  }
}
</script>

<style>
.buzzer-selector {
  color: white;
  display: flex;
  flex-wrap: wrap;
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
