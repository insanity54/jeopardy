<template>
  <div class="house-id">
    <h1>House ID: <span class="emphasis">{{ houseId }}</span></h1>
    <div class="button" @click="regenerateHouseId"><i class="material-icons">refresh</i>Regenerate</div>
    <p>The house ID is a unique code which must be the same on all devices in the room.</p>
  </div>
</template>

<script>
export default {
  name: 'HouseId',
  data: function () {
    return {
    }
  },
  components: {
  },
  props: {
  },
  computed: {
    houseId: function () {
      return this.$store.state.meta.houseId;
    }
  },
  methods: {
    regenerateHouseId: function () {
      this.$store.commit('generateHouseId');
    }
  }
}
</script>

<style scoped>
.title {
  cursor: pointer;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s linear;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.game {
  color: white;
  user-select: none;
}
.emphasis {
  color: yellow;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
