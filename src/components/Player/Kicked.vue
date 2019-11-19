<template>
  <div class="kicked">
    <h1>You have been kicked from the game</h1>
    <p>To rejoin, scan the Player Join QR code again.</p>
  </div>
</template>

<script>
export default {
  name: 'Kicked',
}
</script>

<style scoped>
.kicked {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  color: white;
  font-size: 18pt;
  height: 100vh;
  width: 100vw;
}
.kicked h1 {
  color: red;
  font-weight: bold;
  font-size: 24pt;
  text-decoration: underline;
}
</style>
