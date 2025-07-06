export default class Player {
  constructor(name) {
    this.name = name;
    this.times = {}; 
  }

  recordTime(difficulty, time) {
    if (!this.times[difficulty] || time < this.times[difficulty]) {
      this.times[difficulty] = time;
    }
  }

  getTotalTime() {
    return Object.values(this.times).reduce((a, b) => a + b, 0);
  }

  showStats() {
    const total = this.getTotalTime();
    const count = Object.keys(this.times).length;
    const avg = count ? total / count : 0;
    console.log(`\nGreat job, ${this.name}!`);
    console.log(`Total time: ${total.toFixed(1)} seconds`);
    console.log(`Average per difficulty level played: ${avg.toFixed(1)} seconds`);
    console.log("Times per difficulty:");
    for (const diff in this.times) {
      console.log(` - ${diff}: ${this.times[diff].toFixed(1)} sec`);
    }
  }
}
