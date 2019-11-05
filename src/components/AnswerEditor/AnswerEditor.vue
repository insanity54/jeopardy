<template>
  <div class="answer-editor">
    {{ this.answer }}
    <div class="edit-item">
      <label for="answer-text-input">Answer</label>
      <textarea v-model="answerText" id="answer-text-input"/>
    </div>
    <div class="edit-item">
      <label for="question-text-input">Question</label>
      <textarea v-model="questionText" id="question-text-input"/>
    </div>
    <div class="edit-item">
      <label for="daily-double-input">Daily Double</label>
      <input v-model="dailyDouble" id="daily-double-input" type="checkbox"/>
    </div>
    <div class="edit-item">
      <label for="image-input">Image</label>
        <input type="file" @change="onChangeInputFile">
        <p>Drop an image file or browse your computer.</p>
        <div v-if="isImage" @click="deleteImage" class="button delete-image-button">Delete image</div>
        <div class="thumbnails">
          <img class="thumbnail" :src="this.answer.image.url"/>
        </div>
    </div>
    <div class="error">
      <span>{{ error.message }}</span>
    </div>
    <!-- <div class="edit-item">
      <div class="editor-controls">
        <div class="button leave-button">
          Back
        </div>
        <div class="button save-button">
          Save
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { extension } from '@/util/util.js';
export default {
  name: 'AnswerEditor',
  components: {
    // ExternalResource
  },
  data: function () {
    return {
      error: {}
    }
  },
  props: {
    answer: {
      type: Object,
      required: true
    }
  },
  computed: {
    isImage: function () {
      return (this.answer.image.length > 0)
    },
    gameId: function () {
      return this.$store.state.game.game.id
    },
    answerText: {
      get () {
        return this.answer.answerText;
      },
      set (value) {
        this.$store.commit('updateAnswerText', value);
      }
    },
    questionText: {
      get () {
        return this.answer.questionText;
      },
      set (value) {
        this.$store.commit('updateQuestionText', value);
      }
    },
    dailyDouble: {
      get () {
        return this.answer.dailyDouble;
      },
      set (value) {
        this.$store.commit('updateDailyDouble', value);
      }
    }
  },
  methods: {
    logError: function (e) {
      this.error = e;
    },
    deleteImage: function () {
      this.$vlf.removeItem(`game:${this.gameId}:${this.answer.id}:image`).then(() => {
        this.$store.commit('updateImage', { answerid: this.answer.id, imageURI: '' })
      })
    },
    onChangeInputFile: function (e) {
      // greetz
      // https://github.com/dflourusso/v-file-upload/blob/master/src/FileUpload.vue
      console.log('change input');
      let files = e.target.files || e.dataTransfer.files;
      console.log(files);
      if (!files.length) return;
      const file = files[0];
      const ext = extension(file.name);
      console.log(ext);
      if (ext !== 'jpg' && ext !== 'png' && ext !== 'gif') {
        this.$emit('error', {
          code: 'wrong_extension',
          message: 'That image file extension is not allowed. Please upload a jpg, png, or gif.'
        });
        return;
      }
      if (file.size > 15728640) {
        this.$emit('error', {
          code: 'max_size_exceeded',
          message: `File max size exceded, upload a file smaller than ${this.maxSize}`
        });
        return;
      }
      this.storeLocally(file).then((imageURI) => {
        this.$store.commit('updateImage', { id: `${this.answer.id}`, url: imageURI, type: ext });
      });
    },
    storeLocally: function (file) {
      return new Response(file).arrayBuffer().then((buffer) => {
        return this.$vlf.setItem(`game.${this.gameId}.${this.answer.id}.image`, buffer).then(function(image) {
          var blob = new Blob([image]);
          var imageURI = window.URL.createObjectURL(blob);
          return imageURI;
        })
      })
    }
  }, mounted: function () {
    this.$on('error', this.logError);
  }, destroyed: function () {
    this.$off('error');
  }
}
</script>
<style scoped>
.error span {
  color: red;
}
.answer-editor {
  font-size: 12pt;
  font-family: arial;
  text-transform: none;
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 80vw;
  user-select: text;
}
.answer-editor p {
  font-size: 10pt;
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
  width: 100px;
}
.thumbnails {
  display: flex;
  flex-direction: row;
}
.delete-image-button {
  background-color: red;
}
</style>
