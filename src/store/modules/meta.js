export default {
  state: {
    edit: false,
    audioQueue: []
  },
  mutations: {
    enterEditMode(state) {
      state.edit = true;
    },
    leaveEditMode(state) {
      state.edit = false;
    }
  }
}
