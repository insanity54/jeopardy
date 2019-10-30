<template>
  <div class="new-player-button">
    <div class="new-player-button-heading">
      Add a Player
    </div>
    <div class="new-player-button-content">
      <img @click="createPlayer" alt="Add a new player" class="new-player-button-button" src="/plus.png">
    </div>
  </div>
</template>

<script>

export default {
  name: 'NewPlayerButton',
  components: {
  },
  data: function () {
    return {
      defaultNames: [
        'Achcauhtli',
        'Bailey',
        'Chen',
        'Delaney',
        'Etalpalli',
        'Florry',
        'Gale',
        'Haneul',
        'Icnoyotl',
        'Jaswinder',
        'Kaimana',
        'Kai',
        'Lieve',
        'Machlah',
        'Nuka',
        'Oluwatoyin',
        'Patli',
        'Qing',
        'Refilwe',
        'Sacha',
        'Taylor',
        'Tate',
        'Teoxihuitl',
        'Udo',
        'Vered',
        'Wen',
        'Xipil',
        'Yolyamanitzin',
        'Zorion'
      ]
    }
  },
  props: {
  },
  computed: {
  },
  methods: {
    getRandomName: function () {
      return this.defaultNames[Math.floor(Math.random()*this.defaultNames.length)];
    },
    createPlayer: function () {
      this.$store.commit('createPlayer', { name: this.getRandomName() });
    }
  }
}
</script>

<style scoped>
  .new-player-button-button {
    width: 50px;
  }
  .new-player-button {
    background-color: white;
    display: flex;
    flex-direction: column;
    border: 3px solid grey;
    border-radius: 5px;
    padding: 1em;
    margin: 0.5em 1em;
    color: black;
    width: 25vw;
  }
  .new-player-button-heading {
    font-size: 18pt;
    font-weight: bold;
    color: white;
    text-shadow: 3px 3px 5px black, 3px 3px 5px black, 3px 3px 5px black;
    display: flex;
    flex-direction: row;
    margin: 1em 0;
  }
  .new-player-button-content {
    display: flex;
    flex-direction: row;
  }
</style>
