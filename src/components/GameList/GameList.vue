<template>
  <div class="game-list">
    <NewGameBadge/>
    <ImportGameBadge/>
    <GameBadge v-for="game in games" :key="game.id" :game="game"/>
  </div>
</template>


<script>
import GameBadge from './GameBadge';
import NewGameBadge from './NewGameBadge';
import ImportGameBadge from './ImportGameBadge';
export default {
  name: 'GameList',
  components: {
    GameBadge,
    NewGameBadge,
    ImportGameBadge,
  },
  props: {
  },
  computed: {
    games: function () {
      return this.$store.state.game.games;
    },
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
  flex-wrap: wrap;
}
</style>
