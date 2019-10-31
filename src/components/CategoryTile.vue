<template>
  <div @click="openCategory" :class="{ noClick: !isEditMode, click: isEditMode }" class="category-tile">
    <p class="category-tile-name">
      <transition name="rev">
        <p v-if="isRevealed">{{ category.name }}</p>
      </transition>
    </p>
  </div>
</template>

<script>
export default {
  name: 'CategoryTile',
  props: {
    category: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed : {
    isRevealed() {
      return (this.category.revealed === true);
    },
    gameId() {
      return this.$store.state.game.game.id;
    },
    isEditMode () {
      return this.$store.state.meta.edit;
    }
  },
  methods: {
    openCategory: function() {
      if (this.isEditMode) {
        this.$router.push({
          path: `/game/${this.gameId}/category/${this.index}`
        });
      }
    }
  }
}
</script>

<style scoped>
  .rev-enter-active {
    transition: transform 0.5s linear;
  }
  .rev-enter {
    transform: rotateX(90deg);
  }
  .category-tile-name {
    height: 2em;
  }
  .category-tile {
    cursor: default;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: navy;
    margin-bottom: 5px;
    text-transform: uppercase;
    text-shadow: 2px 2px black;
    font-weight: bold;
    padding: 0.5em 5px 0.5em 5px;
  }
  .no-click {
    cursor: default;
  }
  .click {
    cursor: pointer;
  }
</style>
