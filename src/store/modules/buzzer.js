export default {
  state: {
    buzzLog: [],
    lockLog: [],
    unlockLog: [],
    isLocked: true,
  },
  mutations: {
    buzz(state, data) {
      state.buzzLog.push(data);
    },
    unlockBuzzer(state) {
      state.unlockLog.push(Date.now());
      state.isLocked = false;
      state.lockLog = [];
    },
    lockBuzzer(state) {
      state.lockLog.push(Date.now());
      state.isLocked = true;
      state.buzzLog = [];
      state.unlockLog = [];
    }
  }
}
