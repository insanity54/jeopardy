<template>
  <div class="new-host-creator">
  </div>
</template>

<script>
export default {
  name: 'NewHostCreator',
  data: function () {
    return {
      houseId: ''
    }
  },
  created: function () {
    // set the houseId in vuex based on the houseId seen in the router query
    this.houseId = this.$route.query.houseId;
    this.$store.commit('setHouseId', this.houseId);
    this.$store.commit('setRole', 'host');
    // redirect to the host setup page
    this.$router.replace(`/host/setup`);
  }
}
</script>

<style scoped>
.host {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  color: white;
  font-size: 18pt;
  height: 100vh;
  width: 100vw;
}
.host-controller h1 {
  color: skyblue;
  font-weight: bold;
  font-size: 24pt;
}
</style>
