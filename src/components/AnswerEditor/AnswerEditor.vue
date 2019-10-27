<template>
  <div class="answer-editor">
    <div class="edit-item">
      <label for="answer-text-input">Answer</label>
      <textarea id="answer-text-input" :value="answer.answerText"/>
    </div>
    <div class="edit-item">
      <label for="question-text-input">Question</label>
      <textarea id="question-text-input" :value="answer.questionText"/>
    </div>
    <div class="edit-item">
      <label for="daily-double-input">Daily Double</label>
      <input id="daily-double-input" :value="answer.dailyDouble" type="checkbox"/>
    </div>
    <div class="edit-item">
      <label for="image-input">Image</label>
      <!-- <div class="multimedia-upload"> -->
        <input type="file" @change="onChangeInputFile">
        <p>Drop an image file or browse your computer.</p>
        <p>Max size: 10MB</p>
        <img class="thumbnail" :src="this.answer.image"/>
      <!-- </div> -->
    </div>
    <div class="edit-item">
      <div class="editor-controls">
        <div class="button leave-button">
          Back
        </div>
        <div class="button save-button">
          Save
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AnswerEditor',
  components: {
    // ExternalResource
  },
  props: {
    answer: {
      type: Object,
      required: true
    }
  },
  computed: {
  },
  methods: {
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
      }).catch(function(err) {
        console.log(err);
      });
    },
    storeLocally: function (file) {
      return this.$vlf.setItem(`${this.gameId}${this.answer.id}`, file).then(function(image) {
        var blob = new Blob([image]);
        var imageURI = window.URL.createObjectURL(blob);
        console.log(imageURI);
        return imageURI;
      })
    }
  }
}
</script>
<style scoped>
.answer-editor {
  font-family: arial;
  text-transform: none;
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 80vw;
}
.edit-item {
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
</style>
