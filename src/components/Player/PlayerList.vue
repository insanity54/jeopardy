<template>
  <div class="player-list">
    <div class="player-list-heading">
      <h1>Player List</h1>
    </div>
    <div class="player-list-content">
      <NewPlayerButton/>
      <PlayerBadge v-for="player in players" :key="player.id" :playerId="player.id"/>
    </div>
  </div>
</template>

<script>
import PlayerBadge from './PlayerBadge';
import NewPlayerButton from './NewPlayerButton';
export default {
  name: 'PlayerList',
  components: {
    PlayerBadge,
    NewPlayerButton,
  },
  props: {
  },
  sockets: {
    kickPlayer: function (player) {
      this.$store.commit('deletePlayer', player);
    }
  },
  computed: {
    players: function () {
      return this.$store.state.players;
    }
  },
}
</script>

<style scoped>
.player-list {
  color: white;
}
.player-list-heading {
}
.player-list-content {
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
