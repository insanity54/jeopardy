<template>
  <div id="app">
    <RoleDisplay />
    <TinyMenu />
    <JoinOverlay />
    <router-view />
  </div>
</template>

<script>
import TinyMenu from '@/components/Menu/TinyMenu';
import RoleDisplay from '@/components/debug/RoleDisplay';
import JoinOverlay from '@/components/JoinOverlay/JoinOverlay';
export default {
  name: 'app',
  components: {
    TinyMenu,
    RoleDisplay,
    JoinOverlay,
  },
  sockets: {
    routeToScreen: function (data) {
      let { screenName, id } = data;
      if (this.role === 'player') {
        if (screenName === 'players') this.$router.push(`/player/${this.playerId}`);
        if (
          screenName === 'buzzerTest' ||
          screenName === 'game'
        ) this.$router.push(`/player/${this.playerId}/buzzer`);
      }
      else if (this.role === 'jumbotron') {
        if (screenName === 'players') this.$router.push('/players');
        else if (screenName === 'buzzerTest') this.$router.push('/buzzerTest');
        else if (screenName === 'game') {
          this.$store.commit('loadGame', id);
          this.$router.push(`/game/${id}`);
        }
      }
    },
    unlockBuzzer: function () {
      this.$store.commit('unlockBuzzer');
    },
    lockBuzzer: function () {
      this.$store.commit('lockBuzzer');
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
