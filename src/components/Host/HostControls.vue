<template>
  <div class="host-controls">
    <p>Add Players</p>
    <p>Test buzzers</p>
  </div>
</template>

<script>
export default {
  name: 'HostControls',
}
</script>

<style scoped>
.host-controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  color: white;
  font-size: 18pt;
}
.host-controls h1 {
  color: gold;
  font-weight: bold;
  font-size: 24pt;
  text-decoration: underline;
}
</style>
