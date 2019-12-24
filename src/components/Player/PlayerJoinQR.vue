<template>
  <div class="player-join-qr">
    <qrcode :value="playerJoinUrl"></qrcode>
    <p class="hostname">{{ hostname }}</p>
    <p class="house-id">{{ houseId }}</p>
  </div>
</template>

<script>
export default {
  name: 'PlayerJoinQr',
  components: {
  },
  data: function () {
    return {
    }
  },
  computed: {
    isJumbotron: function () {
      return this.role === 'jumbotron'
    },
    hostname: function () {
      return location.origin;
    },
    playerJoinUrl: function () {
      return `${location.origin}/player/join?houseId=${this.houseId}`;
    },
    houseId: function () {
      return this.$store.state.meta.houseId;
    },
    role: function () {
      return this.$store.state.meta.role;
    },
  },
  methods: {
  }
}
</script>

<style scoped>
.player-join-qr {
  color: white;
  font-size: 12pt;
  top: 0;
  right: 0;
  padding: 1em;
  pointer-events: none;
}
.house-id {
  color: yellow;
  font-weight: bold;
  font-size: 50pt;
}
</style>
