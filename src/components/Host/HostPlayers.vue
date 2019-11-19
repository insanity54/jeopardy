<template>
  <div class="host-players">
    <h1>Host Players</h1>
    <PlayerList />
  </div>
</template>

<script>
import PlayerList from '@/components/Player/PlayerList';
export default {
  name: 'HostQuestion',
  components: {
    PlayerList
  }
}
</script>

<style scoped>
.host-players {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  color: white;
  font-size: 18pt;
  height: 100vh;
  width: 100vw;
}
.host-players h1 {
  color: red;
  font-weight: bold;
  font-size: 24pt;
  text-decoration: underline;
}
</style>
