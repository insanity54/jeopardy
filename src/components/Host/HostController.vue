<template>
  <div class="host-controller">
    <h1>HostController</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'HostController',
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
