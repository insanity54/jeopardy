import { humanReadableId } from '@/util/util';

export default {
  state: {
    edit: false,
    audioQueue: [],
    houseId: ''
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
    }
  }
}
