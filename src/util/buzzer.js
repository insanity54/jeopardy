export default class Buzzer {
  constructor () {
    this.isLocked = false;
    this.buzzLog = [];
    this.secret = Math.floor(Math.random() * 1000000);
    this.latestUnlockTime = 0;
  }

  logBuzz(event) {
    if (this.isLocked) return;
    /**
     * example of how the client sends a buzz
     * this.$socket.emit('buzz', { id: this.pid, time: Date.now() });
     */
    this.buzzLog.push(event);
  }

  clearLog() {
    this.buzzLog = [];
  }

  lockBuzzer() {
    console.log('buzzer lock')
    this.isLocked = true;
    this.buzzLog = [];
    this.buzzLog.push({
      id: this.secret,
      act: 'lock',
      time: Date.now()
    });
  }

  unlockBuzzer() {
    console.log('buzzer unlock')
    this.isLocked = false;
    this.buzzLog.push({
      id: this.secret,
      act: 'unlock',
      time: Date.now()
    });
  }

  calculateLatestUnlockTime() {
    for (var i=0; i<this.buzzLog.length; i++) {
      if (typeof this.buzzLog[i].act !== 'undefined') {
        // it has an act
        if (this.buzzLog[i].act === 'unlock') {
          // it is an unlock act
          if (this.buzzLog[i].time > this.latestUnlockTime) {
            this.latestUnlockTime = this.buzzLog[i].time;
          }
        }
      }
    }
    return this.latestUnlockTime;
  }
  //
  // calculateLatestUnlockIndex() {
  //   calculateLatestUnlockTime();
  //   let i = this.buzzLog.findIndex((l) => l.time === this.latestUnlockTime);
  //   return i;
  // }

  // decideWinner() {
  //   // find latest instance of 'unlock'
  //   // the winner is the following user
  //   let latestUnlockIndex = calculateLatestUnlockIndex();
  //   let flaw = this.buzzLog
  //   if (this.buzzLog[i+1] === 'undefined') return {};
  //   else if (this.buzzLog[i+1].act === 'undefined') return {};
  //   console.log(`and the winner is...`)
  // }
}
