<template>
  <div class="player-controller">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'PlayerController',
  components: {
  },
  data: function () {
    return {
    }
  },
  props: {
  },
  sockets: {
    connect: function () {
        // this.$store.commit('SOCKET_updatePlayerColor');
    },
    unlockBuzzer: function () {
      this.$store.commit('unlockBuzzer');
    },
    lockBuzzer: function () {
      this.$store.commit('lockBuzzer');
    },
    deletePlayer: function (player) {
      let { id } = player;
      if (
        this.isPlayerPage &&
        this.$route.params.playerId === id
      ) {
        this.$router.replace(`/player/new?houseId=${this.houseId}`);
      }
    },
    kickPlayer: function (player) {
      let { id } = player;
      if (
        this.isPlayerPage &&
        this.$route.params.playerId === id
      ) {
        this.$router.replace('/kicked');
      }
    }
  },
  methods: {
    gotoBuzzer: function () {
      this.$router.push(`/player/${this.player.id}/buzzer`);
    },
    gotoPlayer: function () {
      this.$router.push(`/player/${this.player.id}`);
    }
  },
  computed: {
    isPlayerPage: function () {
      // whether or not component is rendered on /player/:id page
      if (!this.$route.params.playerId) return false;
      return true;
    },
    playerColor: function () {
      return this.player.color
    },
    pid: function () {
      return this.$route.params.playerId;
    },
    player: function () {
      return this.$store.state.players.find((p) => p.id === this.pid);
    }
  }
}
</script>

<style scoped>
  .player-controller {
    color: orange;
  }
</style>
