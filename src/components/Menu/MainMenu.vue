<template>
  <div class="main-menu">
    <div class="main-menu-content">
      <div @click="gotoPlayers" class="main-menu-item">
        <i class="material-icons">people</i>
        <span>Players</span>
      </div>
      <div @click="gotoGames" class="main-menu-item">
        <i class="material-icons">videogame_asset</i>
        <span>Games</span>
      </div>
      <div @click="gotoEpisodes" class="main-menu-item">
        <i class="material-icons">tv</i>
        <span>Episodes</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  props: {
  },
  components: {
  },
  computed: {
    houseId: function () {
      return this.$store.state.meta.houseId;
    }
  },
  methods: {
    gotoGames: function() {
      this.$socket.emit('unlockBuzzer', { houseId: this.houseId });
      this.$router.push('/games');
    },
    gotoPlayers: function() {
      this.$socket.emit('routeJumbotron', { to: '/players' });
    },
    gotoEpisodes: function() {
      this.$router.push('/episodes');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-menu {
  margin: 2em;
  color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}
.tutorial {

}
.main-menu-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.main-menu-item {
  display: flex;
  flex-direction: column;
  color: black;
  background: white;
  margin: 1em;
  padding: 0.5em 1em;
  border-radius: 5px;
  cursor: pointer;
}
</style>
