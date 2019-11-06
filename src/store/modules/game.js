import defaultGame from '@/assets/default.game.json'
import { uuidv4 } from '@/util/util';
import Vue from 'vue';



export default {
  state: {
    game: {
      name: '',
      id: '',
      pointUnit: '', // dollars
      pointMultiplier: '', // 100 for single, 200 for double
      buzzerLock: '',
      categories: '',
      answers: '',
      completedAnswerCounter: '',
      gameType: '', // single, double, or final.
      answer: '',
      wager: null
    },
    games: [
    ],
  },
  getters: {
    game: state => {
      return state.game;
    },
    singleGames: state => {
      return state.games.filter((g) => g.type === 'single');
    },
    doubleGames: state => {
      return state.games.filter((g) => g.type === 'double');
    },
    finalGames: state => {
      return state.games.filter((g) => g.type === 'final');
    },
    games: state => {
      return state.games;
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
    updateCategory(state, categoryData) {
      state.game.categories[categoryData.id] = categoryData;
    },
    createGame(state, gameObject) {
      function getMultiplier(type) {
        if (type === 'double') return 200;
        return 100;
      }
      const id = uuidv4();
      state.games.push({
        ...JSON.parse(JSON.stringify(defaultGame)),
        ...gameObject,
        id: id,
        pointMultiplier: getMultiplier(gameObject.gameType)
      });
      return state.game = { ...state.game, id: id };
    },
    updateGame(state, gameObject) {
      let i = state.games.findIndex((g) => g.id === gameObject.id);
      state.games[i] = gameObject;
    },
    deleteGame(state, gameId) {
      let i = state.games.findIndex((g) => g.id === gameId);
      state.games.splice(i, 1)
      Vue.delete(state.game);
    },
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
    },
    loadGame(state, gameId) {
      let game = state.games.find((g) => g.id === gameId);
      state.game = game;
    },
    setGameId(state, gameId) {
      return state.game = { ...state.game, id: gameId };
    },
    setActiveAnswer(state, answerId) {
      const category = parseInt(answerId[0]);
      const item = parseInt(answerId[1]);
      let answer = state.game.answers.find((a) => {
        return a.category === category && a.item === item;
      });
      return state.game = { ...state.game, answer: answer };
    },
    incrementCompletedAnswerCounter(state) {
      if (typeof state.game.completedAnswerCounter === 'undefined') {
        return state.game = { ...state.game, completedAnswerCounter: 1 };
      }
      else {
        return state.game = { ...state.game, completedAnswerCounter: state.game.completedAnswerCounter+1 };
      }
    },
    submitWager(state, wager) {
      return state.game = { ...state.game, wager: wager };
    },
    clearWager(state) {
      return state.game = { ...state.game, wager: null };
    },
    updateImage(state, imageData) {
      return state.game.answer.image = imageData;
    },
    patchImage(state, imageData) {
      let i = state.game.answer.image;
      return i = { ...i, ...imageData };
    },
    updateAnswerText(state, text) {
      return state.game.answer.answerText = text;
    },
    updateQuestionText(state, text) {
      return state.game.answer.questionText = text;
    },
    updateDailyDouble(state, isDailyDouble) {
      return state.game.answer.dailyDouble = isDailyDouble;
    },
    updateGameTitle(state, text) {
      return state.game.name = text;
    },
    restartGame(state) {
      state.game.completedAnswerCounter = 0;
      state.game.answers.forEach((a) => {
        a.revealed = false;
        a.available = true;
      });
      return state.game.categories.forEach((c) => {
        c.revealed = false;
      })
    },
    revealAnswer(state, answerId) {
      let answer = state.game.answers.find((a) => a.id === answerId);
      answer.revealed = true;
    },
    revealCategory(state) {
      let c = state.game.categories.find((c) => c.revealed === false)
      if (typeof c === 'undefined') return;
      c.revealed = true;
    }
  },
  actions: {
    revealAnswers ( context ) {
      let divide = 180;
      let minMultiplier = 0;
      let maxMultiplier = 16;
      context.state.game.answers.forEach((a) => {
        let multiplier = Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1) + minMultiplier);
        let timeout = divide * multiplier;
        setTimeout(() => {
          context.commit('revealAnswer', a.id);
        }, timeout);
      });
    }
  }
}
