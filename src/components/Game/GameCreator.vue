<template>
  <div class="game-creator">
  </div>
</template>


<script>
import faker from 'faker';
import { uuidv4 } from '@/util/util';
export default {
  name: 'GameCreator',
  created () {
    const gameId = uuidv4();
    const gameObject = {
      name: faker.random.word(),
      image: '/abstract.jpg',
      id: gameId,
      type: ''
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
