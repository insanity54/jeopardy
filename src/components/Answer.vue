<template>
  <div class="answer">
    <div v-if="!isEditMode" class="live">
      <span v-if="!isImageAnswer">{{ answer.answerText }}</span>
      <img v-if="isImageAnswer" :src="answer.image.url"/>
    </div>
    <AnswerEditor v-if="isEditMode" :answer="answer"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AnswerEditor from '@/components/AnswerEditor/AnswerEditor.vue';
export default {
  name: 'Answer',
  components: {
    AnswerEditor
  },
  props: {
  },
  computed: {
    ...mapState({
      answer: state => state.game.game.answer,
      isEditMode: state => state.meta.edit,
      gameId: state => state.game.game.id,
    }),
    isImageAnswer: function () {
      return (typeof this.answer.image.url !== 'undefined') ? true : false;
    }
  },
  methods: {
    loadLocalForageImage: function (img) {
      let { type, id } = img;
      return this.$vlf.getItem(`game.${this.gameId}.${this.answer.id}.image`).then((v) => {
        var blob = new Blob([v.blob]);
        var imageURI = window.URL.createObjectURL(blob);
        console.log(imageURI);
        this.loadedImage = imageURI;
        return this.$store.commit('updateImage', { url: imageURI, type, answerId: id, gameId: this.gameId });
      });
    }
  },
  created: function () {
    if (this.isImageAnswer && this.answer.image.url.startsWith('blob')) {
      this.loadLocalForageImage(this.answer.image);
    }
  }
}
</script>

<style scoped>
  .editor {
    font-size: 12pt;
    display: flex;
    height: 80vh;
    width: 80vw;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
  }
  .editor input {
    width: 100%;
  }
  .edit-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .answer {
    height: 100vh;
    width: 100vw;
    color: white;
    font-family: Georgia;
    font-size: 3em;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: navy;
    text-shadow: 2px 2px black;
    user-select: none;
    overflow: hidden;
    position: absolute;
  }
  .answer > span {
    margin: 0 1em 0 1em;
  }
  .answer > .live {
    width: 80%;
  }
  .answer img {
    width: 100%;
  }

</style>
