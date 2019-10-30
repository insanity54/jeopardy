<template>
  <div class="title-editor">
    <div class="edit-item">
      <label for="title-text-input">Title</label>
      <textarea v-model="title" id="title-text-input"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TitleEditor',
  components: {
  },
  props: {
  },
  computed: {
    title: {
      get () {
        return this.$store.state.game.game.name;
      },
      set (value) {
        this.$store.commit('updateGameTitle', value);
      }
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.title-editor {
  top: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
  background-color: navy;
}
.title-editor p {
  font-size: 10pt;
}
.edit-item {
  padding: 5vw 20vw 0 20vw;
  font-size: 18pt;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1em;
}
.edit-item label {
  margin-bottom: 10px;
}
.edit-item textarea {
  width: 100%;
  resize: vertical;
}
.image-item {
  display: flex;
  flex-direction: row;
}
.editor-controls {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}
</style>
