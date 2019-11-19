<template>
  <div class="host-game">
    <h1>Host Game</h1>
  </div>
</template>

<script>
export default {
  name: 'HostGame',
}
</script>

<style scoped>
.host-game {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  color: white;
  font-size: 18pt;
  height: 100vh;
  width: 100vw;
}
.host-game h1 {
  color: green;
  font-weight: bold;
  font-size: 24pt;
  text-decoration: underline;
}
</style>
