<template>
  <div class="game-list">
    <NewGameBadge/>
    <ImportGameBadge/>
    <GameBadge v-for="game in games" :key="game.id" :game="game"/>
    <BlobTester/>
  </div>
</template>


<script>
import GameBadge from './GameBadge';
import NewGameBadge from './NewGameBadge';
import ImportGameBadge from './ImportGameBadge';
import BlobTester from '@/components/debug/BlobTester';
export default {
  name: 'GameList',
  components: {
    GameBadge,
    NewGameBadge,
    ImportGameBadge,
    BlobTester
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
  flex-wrap: wrap;
}
</style>
