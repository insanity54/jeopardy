import defaultGame from '@/assets/default.game.json'

export default {
  state: {
    game: {
      name: '',
      id: '',
      pointUnit: '',
      pointMultiplier: '',
      buzzerLock: '',
      categories: '',
      answers: '',
      completedAnswerCounter: '',
      type: '' // single, double, or final.
    }
  },
  getters: {
    game: state => {
      return state.game;
    },
    isBuzzerLocked: state => {
      return state.game.buzzerLock;
    },
    pointMultiplier: state => {
      return state.game.pointMultiplier;
    },
    gameId: state => {
      return state.game.id;
    },
    answers: state => {
      return state.game.answers;
    },
    categories: state => {
      return state.game.categories;
    },
    completedAnswerCounter: state => {
      return state.game.completedAnswerCounter;
    }
  },
  mutations: {
    unlockBuzzers(state) {
      state.game.buzzerLock = false;
    },
    lockBuzzers(state) {
      state.game.buzzerLock = true;
    },
    makeUnavailable(state, answerId) {
      const category = parseInt(answerId[0]);
      const item = parseInt(answerId[1]);
      let answer = state.game.answers.find((a) => {
        return a.category === category && a.item === item;
      });
      return answer.available = false;
    },
    loadDefaultGame(state) {
      return state.game = defaultGame;
      // Vue.set(state, 'game', defaultGame);
      // Vue.set(state, 'game', defaultGame);
    },
    setGameId(state, gameId) {
      return state.game = { ...state.game, id: gameId };
      // Vue.set(state.game, 'id', gameId);
    },
    // setActiveAnswer(state, answerId) {
    //   state.game.answer = answerId;
    // },
    incrementCompletedAnswerCounter(state) {
      if (typeof state.game.completedAnswerCounter === 'undefined') {
        return state.game = { ...state.game, completedAnswerCounter: 1 };
      }
      else {
        return state.game = { ...state.game, completedAnswerCounter: state.game.completedAnswerCounter+1 };
      }
    }
  }
}
