import { humanReadableId } from '@/util/util';

export default {
  state: {
    edit: false,
    audioQueue: [],
    houseId: '',
    role: 'jumbotron',
    playerId: '',
    isDebugMode: false
  },
  getters: {
    isHostRole: state => {
      return (state.role === 'host');
    },
    isJumbotronRole: state => {
      return (state.role === 'jumbotron');
    }
  },
  mutations: {
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
    }
  }
}
