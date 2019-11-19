<template>
  <div class="host-question">
    <h1>Host Question</h1>
  </div>
</template>

<script>
export default {
  name: 'HostQuestion',
}
</script>

<style scoped>
.host-question {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  color: white;
  font-size: 18pt;
  height: 100vh;
  width: 100vw;
}
.host-question h1 {
  color: red;
  font-weight: bold;
  font-size: 24pt;
  text-decoration: underline;
}
</style>
