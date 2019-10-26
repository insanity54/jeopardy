<template>
  <div class="game-creator">
  </div>
</template>


<script>
import faker from 'faker';
export default {
  name: 'GameCreator',
  created () {
    function uuidv4() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    }
    const gameId = uuidv4();
    const gameObject = {
      title: faker.random.word(),
      img: 'http://lorempixel.com/200/200/abstract/',
      id: gameId
    };
    this.$store.commit('createGame', gameObject);
    this.$store.commit('loadDefaultGame');
    this.$store.commit('setGameId', gameId);
    this.$router.replace(`/game/${gameId}`);
  }
}
</script>


<style scoped>

</style>
