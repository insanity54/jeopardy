import { humanReadableId } from '@/util/util';
const defaultState = {
  edit: false,
  audioQueue: [],
  houseId: '',
  role: 'jumbotron',
  playerId: '',
  isDebugMode: false,
  isGameStarted: false,
  isFinalUnlocked: false,
  finalState: 'intro' // can be intro, category, answer, or reveal.
};

export default {
  state: defaultState,
  getters: {
    isHostRole: state => {
      return (state.role === 'host');
    },
    isJumbotronRole: state => {
      return (state.role === 'jumbotron');
    },
    isFinalStateIntro: state => {
      return (state.finalState === 'intro');
    },
    isFinalStateCategory: state => {
      return (state.finalState === 'category');
    },
    isFinalStateAnswer: state => {
      return (state.finalState === 'answer');
    },
    isFinalStateReveal: state => {
      return (state.finalState === 'reveal');
    },
  },
  mutations: {
    unlockFinal(state) {
      state.isFinalUnlocked = true;
    },
    generateHouseId(state) {
      state.houseId = humanReadableId();
    },
    enterEditMode(state) {
      state.edit = true;
    },
    leaveEditMode(state) {
      state.edit = false;
    },
    setHouseId(state, houseId) {
      state.houseId = houseId;
    },
    setRole(state, role) {
      state.role = role;
    },
    setDebugMode(state, isDebugMode) {
      state.isDebugMode = isDebugMode;
    },
    setPlayerId(state, playerId) {
      state.playerId = playerId;
    },
    setGameStarted(state, payload) {
      state.isGameStarted = payload;
    },
    resetAllMeta(state) {
      for (let key in defaultState) {
        state[key] = defaultState[key]
      }
    },
    advanceFinalState(state) {
      if (state.finalState === 'intro') state.finalState = 'category';
      else if (state.finalState === 'category') state.finalState = 'answer';
      else if (state.finalState === 'answer') state.finalState = 'reveal';
    },
    setFinalState(state, payload) {
      state.finalState = payload;
    }
  }
}
