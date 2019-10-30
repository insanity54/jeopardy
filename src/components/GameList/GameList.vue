<template>
  <div class="game-list">
    <NewGameButton/>
    <GameBadge v-for="game in games" :key="game.id" :game="game"/>
  </div>
</template>


<script>
import GameBadge from './GameBadge';
import NewGameButton from './NewGameButton';
export default {
  name: 'GameList',
  components: {
    GameBadge,
    NewGameButton
  },
  props: {
  },
  computed: {
    games: function () {
      return this.$store.state.game.games;
    },
    // downloadLink: function () {
    //   let contentType = 'application/json';
    //   let dData = JSON.stringify(this.game);
    //   let blob = new Blob([dData], { type: contentType });
    //   let url = window.URL.createObjectURL(blob);
    //   return url;
    // }
  },
  methods: {
  }
}
</script>


<style scoped>
.game-list {
  color: white;
  display: flex;
  flex-direction: row;
  flex-wra: wrap;
}
</style>
