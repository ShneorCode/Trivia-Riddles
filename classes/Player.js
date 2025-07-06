export default class Player {
    constructor(name) {
        this.name = name;
        this.times = [];
    }

    recordTime(start, end) {
        this.times.push((end - start) / 1000);
    }

    showStats() {
        const total = this.getTotalTime();
        const avg = total / this.times.length;
        console.log(`\nGreat job, ${this.name}!`);
        console.log(`Total time: ${total.toFixed(0)} seconds`);
        console.log(`Average per riddle: ${avg.toFixed(0)} seconds`);
    }

    getTotalTime() {
        return this.times.reduce((a, b) => a + b, 0);
    }
}
