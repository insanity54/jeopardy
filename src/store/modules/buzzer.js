export default {
  state: {
    buzzLog: [],
    isLocked: true,
  },
  mutations: {
    buzz(state, data) {
      let { buzzEpoch, id, unlockEpoch } = data;
      let reactionTime = (buzzEpoch - unlockEpoch);
      state.buzzLog.push({ buzzEpoch, id, unlockEpoch, reactionTime });
    },
    unlockBuzzer(state) {
      state.unlockLog.push(Date.now());
      state.buzzLog = [];
      state.isLocked = false;
    },
    lockBuzzer(state) {
      state.lockLog.push(Date.now());
      state.isLocked = true;
    }
  }
}
