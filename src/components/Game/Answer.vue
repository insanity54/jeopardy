<template>
  <div class="answer" :class="{'host': isHostRole }">
    <div v-if="!isEditMode" class="live">
      <img class="image" v-if="isImageAnswer" :src="answer.image.url"/>
      <p class="a text" v-if="!isImageAnswer || isHostRole">{{ answer.answerText }}</p>
      <p class="question text" v-if="isHostRole">{{ answer.questionText }}</p>
    </div>
    <AnswerEditor v-if="isEditMode" :answer="answer"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
    ...mapGetters([
      'isHostRole',
      'isJumbotronRole'
    ]),
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
    height: 100%;
    width: 100%;
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
  .answer {
    width: 100%;
  }
  .answer img {
    width: 100%;
  }
  .host .image {
    width: 35%;
  }
  .question.text {
    color: purple;
    margin: 1em 0 0 0;
  }
  @media screen and (max-width: 600px) {
    .text {
      font-size: 12pt;
    }
  }
</style>
