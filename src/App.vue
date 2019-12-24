<template>
  <div id="app">
    <RoleDisplay />
    <TinyMenu />
    <router-view />
  </div>
</template>

<script>
import TinyMenu from '@/components/Menu/TinyMenu';
import RoleDisplay from '@/components/debug/RoleDisplay';
export default {
  name: 'app',
  components: {
    TinyMenu,
    RoleDisplay,
  },
  sockets: {
    routeToScreen: function (data) {
      let { screenName, id } = data;
      if (this.role === 'player') {
        if (screenName === 'final') {
          this.$router.push(`/player/${this.playerId}/final`);
        }
        else return;
      }
      else if (this.role === 'jumbotron') {
        if (screenName === 'players') this.$router.push('/players');
        else if (screenName === 'buzzerTest') this.$router.push('/buzzerTest');
        else if (screenName === 'game') {
          this.$store.commit('loadGame', id);
          this.$router.push(`/game/${id}`);
        } else if (screenName === 'reveal') {
          this.$router.push(`/game/${id}/reveal`);
        } else if (screenName === 'final') {
          this.$router.push(`/game/${id}`);
        }
        else return;
      }
    },
    unlockBuzzer: function () {
      this.$store.commit('unlockBuzzer');
    },
    lockBuzzer: function () {
      this.$store.commit('lockBuzzer');
    },
    createPlayer: function (player) {
      this.$store.commit('createPlayer', player);
    },
    setGameStarted: function (evt) {
      this.$store.commit('setGameStarted', evt);
    },
    syncPlayerData: function (evt) {
      this.$store.commit('syncPlayerData', evt);
    },
    unlockFinal: function (evt) {
      this.$store.commit('unlockFinal', evt);
    },
    advanceFinalState: function (evt) {
      this.$store.commit('advanceFinalState', evt);
    },
    setFinalState: function (evt) {
      console.log(`setting ${evt}`);
      this.$store.commit('setFinalState', evt);
    }
  },
  computed: {
    role: function () {
      return this.$store.state.meta.role;
    },
    playerId: function () {
      return this.$store.state.meta.playerId;
    }
  }
}
</script>

<style>
* {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background: black;
  margin: 0;
  user-select: none;
}
.logo {
  width: 50vw;
}
.idk {
  border: 5px solid indigo;
  background-color: purple;
}
</style>
