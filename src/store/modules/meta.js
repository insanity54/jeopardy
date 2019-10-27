export default {
  state: {
    edit: false,
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
