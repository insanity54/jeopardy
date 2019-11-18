<template>
  <div class="host-setup">
    <h1>Host Setup</h1>
    <h3>House ID</h3>
    <h4>{{ houseId }}</h4>
    <p>Welcome, Host!</p>
    <p>The next step is to set up players.</p>
    <MainMenu />
  </div>
</template>

<script>
import MainMenu from '@/components/Menu/MainMenu';
export default {
  name: 'HostSetup',
  components: {
    MainMenu
  },
  computed: {
    houseId: function () {
      return this.$store.state.meta.houseId;
    }
  }
}
</script>

<style scoped>
.host-setup {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: black;
  color: white;
  font-size: 18pt;
}
.host-setup h4, p {
  margin: 0 0 0.5em 0;
}
.host-setup h1 {
  color: gold;
  font-weight: bold;
  font-size: 24pt;
  text-decoration: underline;
}
</style>
