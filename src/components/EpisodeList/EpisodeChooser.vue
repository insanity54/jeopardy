<template>
  <div class="episode-chooser">
    <div class="validated-choice" v-if="!isEditMode">{{ gameId }}<i @click="isEditMode = !isEditMode" class="material-icons">edit</i></div>
    <div v-if="isEditMode" class="episode-chooser-input">
      <i class="material-icons">search</i><input v-model="searchQuery" type="text">
    </div>
    <ul v-if="isEditMode" class="choices">
      <li @click="doSetChoice(game)" v-for="game in matchingGames" :key="game.id">{{ game.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'EpisodeChooser',
  components: {
  },
  props: {
    item: {
      type: String,
      required: true
    },
    episode: {
      type: Object,
      required: true
    },
  },
  data: function () {
    return {
      isEditMode: false,
      searchQuery: ''
    }
  },
  computed: {
    games: function () {
      if (this.item === 'single') return this.$store.getters.singleGames;
      if (this.item === 'double') return this.$store.getters.doubleGames;
      if (this.item === 'final') return this.$store.getters.finalGames;
      return this.$store.getters.games;
    },
    gameId: function () {
      if (this.item === 'single') return this.episode.single;
      if (this.item === 'double') return this.episode.double;
      if (this.item === 'final') return this.episode.final;
      return ''
    },
    matchingGames: function () {
      return this.games
        .filter((g) => g.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  methods: {
    doSetChoice: function (game) {
      this.isEditMode = false;
      if (this.item === 'single')
        return this.$store.commit('updateEpisodeSingle', { id: this.episode.id, single: game.id })
      if (this.item === 'double')
        return this.$store.commit('updateEpisodeDouble', { id: this.episode.id, double: game.id })
      if (this.item === 'final')
        return this.$store.commit('updateEpisodeFinal', { id: this.episode.id, final: game.id })
    }
  },
}
</script>

<style scoped>
  .episode-chooser-input {
    display: flex;
    flex-direction: row;
  }
  ul.choices {
    color: black;
    font-weight: bold;
    text-shadow: 1px 1px 2px white;
    margin: 0;
    padding: 0;
    cursor: pointer;
    user-select: none;
  }
  .choices li {
    padding: 5px 10px;
    margin: 5px;
    list-style-type: none;
    border-radius: 10px;
    background-color: green;
  }
</style>
