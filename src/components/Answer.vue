<template>
  <div class="answer">
    <div v-if="!isEditMode" class="live">
      <span v-if="!isAnswerImage">{{ answer.answerText }}</span>
      <img v-if="isAnswerImage" :src="answer.image"/>
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
      isEditMode: state => state.meta.edit
    }),
    isAnswerImage: function () {
      return (typeof this.answer.image === 'string') ? true : false;
    }
  },
  methods: {
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
