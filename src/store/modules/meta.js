import { humanReadableId } from '@/util/util';

export default {
  state: {
    edit: false,
    audioQueue: [],
    houseId: '',
    role: 'jumbotron',
    playerId: ''
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
    setPlayerId(state, playerId) {
      state.playerId = playerId;
    }
  }
}
