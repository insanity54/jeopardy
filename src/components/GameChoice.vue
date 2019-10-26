<template>
  <div class="game-choice">
    <h3 @click.prevent="goToGame">{{ game.title }}</h3><i v-if="!game.builtin" @click.prevent="goToGameEditor" class="material-icons">edit</i>
    <span @click.prevent="goToGame">{{ game.id }}</span>
    <img @click.prevent="goToGame" :src="game.img" />
  </div>
</template>


<script>
export default {
  name: 'GameChoice',
  props: {
    game: {
      type: Object,
      required: true,
    }
  },
  computed: {
    gameLink: function () {
      return `/game/${this.game.id}`;
    },
    gameEditorLink: function () {
      return `/game/${this.game.id}?edit=1`;
    }
  },
  methods: {
    goToGame: function () {
      this.$router.push(this.gameLink);
    },
    goToGameEditor: function() {
      this.$router.push(this.gameEditorLink);
    }
  }
}
</script>


<style scoped>
.game-choice {
  display: flex;
  flex-direction: column;
  background: white;
  border: 3px dotted white;
  margin: 5px;
  width: 200px;
  cursor: pointer;
}
.game-choice h3 {
  margin-bottom: 0;
}
.game-choice span {
  font-size: 12px;
  margin-bottom: 20px;
}
.game-choice img {
  max-height: 100%;
  max-width: 100%;
}
</style>
