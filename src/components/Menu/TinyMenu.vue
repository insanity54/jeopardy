<template>
  <div v-if="isHostRole" class="tiny-menu" :class="{'collapsed': isCollapsed}">
    <div class="tiny-menu-content">
      <div @click="gotoHome" class="tiny-menu-item nav">
        <i class="material-icons">home</i>
      </div>
      <div @click="gotoPlayers" class="tiny-menu-item nav">
        <i class="material-icons">people</i>
      </div>
      <div @click="gotoBuzzerTest" class="tiny-menu-item nav">
        <i class="material-icons">touch_app</i>
      </div>
      <div @click="gotoGames" class="tiny-menu-item nav">
        <i class="material-icons">videogame_asset</i>
      </div>
      <div @click="gotoEpisodes" class="tiny-menu-item nav">
        <i class="material-icons">tv</i>
      </div>
      <div @click="gotoSettings" class="tiny-menu-item nav">
        <i class="material-icons">settings</i>
      </div>
      <div @click="collapseMenu" class="tiny-menu-item collapser">
        <i class="material-icons">{{ collapseIcon }}</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  props: {
  },
  data: function () {
    return {
      isCollapsed: true
    }
  },
  components: {
  },
  computed: {
    collapseIcon: function () {
      return (this.isCollapsed === true) ? 'menu' : 'close';
    },
    houseId: function () {
      return this.$store.state.meta.houseId;
    },
    isHostRole: function () {
      return this.$store.state.meta.role === 'host';
    }
  },
  methods: {
    collapseMenu: function () {
      this.isCollapsed = !this.isCollapsed;
    },
    gotoHome: function () {
      this.$socket.emit('routeToScreen', { screenName: 'home' });
      this.$router.push('/');
    },
    gotoPlayers: function() {
      this.$socket.emit('routeToScreen', { screenName: 'players' });
      this.$router.push('/players');
    },
    gotoBuzzerTest: function () {
      this.$socket.emit('routeToScreen', { screenName: 'buzzerTest' });
      this.$router.push('/host/buzzerTest');
    },
    gotoGames: function() {
      this.$socket.emit('lockBuzzer');
      this.$router.push('/games');
    },
    gotoEpisodes: function() {
      this.$router.push('/episodes');
    },
    gotoSettings: function() {
      this.$router.push('/settings');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.collapsed .tiny-menu-item.nav {
  display: none;
}
.collapsed .collapser {
  font-size: 1pt;
  padding: 0;
  margin: 0;
  opacity: 0.25;
}
.collapsed .tiny-menu-content {
  justify-content: flex-end;
}
.tiny-menu {
  overflow: hidden;
  width: 100vw;
  z-index: 9000;
}
.tiny-menu-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.tiny-menu-item {
  z-index: 9999;
  display: flex;
  flex-direction: column;
  color: black;
  background: white;
  padding: 0.5em;
  border-radius: 5px;
  cursor: pointer;
}
</style>
