<template>
  <div v-if="isJumbotron" class="join-overlay">
    <qrcode :value="playerJoinUrl"></qrcode>
    <p class="hostname">{{ hostname }}</p>
    <p class="house-id">{{ houseId }}</p>
  </div>
</template>

<script>
export default {
  name: 'JoinOverlay',
  components: {
  },
  data: function () {
    return {
      uri: ''
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
.join-overlay {
  position: absolute;
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
}
</style>
