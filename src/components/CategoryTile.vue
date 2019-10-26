<template>
  <div class="category-tile">
    {{ category }}
  </div>
</template>

<script>
export default {
  name: 'CategoryTile',
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false
    },
    category: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
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
</style>
