<template>
  <div class="host-controller">
    <h1>HostController</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'HostController',
  data: function () {
    return {
      houseId: ''
    }
  }
}
</script>

<style scoped>
</style>
