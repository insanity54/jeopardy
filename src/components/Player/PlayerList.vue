<template>
  <div class="player-list">
    <div class="player-list-heading">
      <HomeButton/><h1>Player List</h1>
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
import HomeButton from '@/components/Controls/HomeButton';
export default {
  name: 'PlayerList',
  components: {
    PlayerBadge,
    NewPlayerButton,
    HomeButton
  },
  props: {
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
