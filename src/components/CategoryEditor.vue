<template>
  <div class="category-editor">
    <div class="edit-item">
      <label for="category-text-input">Category</label>
      <textarea v-model="categoryText" id="category-text-input"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CategoryEditor',
  components: {
  },
  props: {
  },
  computed: {
    categoryIndex: function () {
      return this.$route.params.categoryIndex
    },
    categoryText: {
      get () {
        return this.$store.state.game.game.categories[this.categoryIndex];
      },
      set (value) {
        this.$store.commit('updateCategoryText', { categoryIndex: this.categoryIndex, text: value });
      }
    }
  },
  methods: {
    deleteImage: function () {
      this.$vlf.removeItem(`${this.gameId}:${this.answer.id}`).then(() => {
        this.$store.commit('updateImage', { answerid: this.answer.id, imageURI: '' })
      })
    },
    onChangeInputFile: function (e) {
      // greetz
      // https://github.com/dflourusso/v-file-upload/blob/master/src/FileUpload.vue
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return
      const file = files[0];
      if (file.size > 15728640) {
        this.$emit('error', {
          code: 'max_size_exceeded',
          message: `File max size exceded, upload a file smaller than ${this.maxSize}`
        })
        return;
      }
      this.storeLocally(file).then((imageURI) => {
        this.$store.commit('updateImage', { answerId: this.answer.id, imageURI: imageURI });
      })
    },
    storeLocally: function (file) {
      return new Response(file).arrayBuffer().then((buffer) => {
        return this.$vlf.setItem(`${this.gameId}:${this.answer.id}`, buffer).then(function(image) {
          var blob = new Blob([image]);
          var imageURI = window.URL.createObjectURL(blob);
          return imageURI;
        })
      })
    },
  }
}
</script>
<style scoped>
.category-editor {
  top: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
  background-color: navy;
}
.category-editor p {
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
.leave-button {
  background-color: red;
}
.save-button {
  background-color: green;
}
.multimedia-upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 8vh;
  width: 100%;
  border: 3px dashed white;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.15);
}
.multimedia-upload > p {
  font-size: 12pt;
}
.browse-link {
  text-decoration: underline;
}
img.thumbnail {
  width: 10%;
}
.thumbnails {
  display: flex;
  flex-direction: row;
}
.delete-image-button {
  background-color: red;
}
</style>
