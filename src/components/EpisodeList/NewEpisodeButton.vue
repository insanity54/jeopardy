<template>
  <div class="new-episode-button">
    <div class="new-episode-button-heading">
      Add an Episode
    </div>
    <div class="new-episode-button-content">
      <img @click="createEpisode" alt="Add a new episode" class="new-episode-button-button" src="/plus.png">
    </div>
  </div>
</template>

<script>
import faker from 'faker';
export default {
  name: 'NewEpisodeButton',
  components: {
  },
  data: function () {
    return {
    }
  },
  props: {
  },
  computed: {
  },
  methods: {
    // getRandomName: function () {
    //   return `${faker.company.bsBuzz()}`
    // },
    createEpisode: function () {
      this.$store.commit('createEpisode', {
        name: faker.random.word()
      });
    }
  }
}
</script>

<style scoped>
  .new-episode-button-button {
    width: 50px;
  }
  .new-episode-button {
    background-color: navy;
    display: flex;
    flex-direction: column;
    border: 3px solid grey;
    border-radius: 5px;
    padding: 1em;
    margin: 0.5em 1em;
    color: black;
    width: 25vw;
  }
  .new-episode-button-heading {
    font-size: 18pt;
    font-weight: bold;
    color: white;
    text-shadow: 3px 3px 5px black, 3px 3px 5px black, 3px 3px 5px black;
    display: flex;
    flex-direction: row;
    margin: 1em 0;
  }
  .new-episode-button-content {
    display: flex;
    flex-direction: row;
  }
</style>
