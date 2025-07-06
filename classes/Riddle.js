import { question } from "readline-sync";

class Riddle {
  constructor({ id, type, difficulty, name, taskDescription, correctAnswer }) {
    this.id = id;
    this.type = type;
    this.difficulty = difficulty;
    this.name = name;
    this.taskDescription = taskDescription;
    this.correctAnswer = correctAnswer;
  }

  ask() {
    console.log(`\nRiddle ${this.id} - ${this.name}:\n`);
    while (true) {
      const answer = question(`${this.taskDescription} `);
      if (answer.trim().toLowerCase() === this.correctAnswer.trim().toLowerCase()) {
        console.log("Correct!");
        break;
      } else {
        console.log("Wrong. Try again.");
      }
    }
  }
}

class MultipleChoiceRiddle extends Riddle {
  constructor({ id, type, difficulty, name, taskDescription, correctAnswer, choices }) {
    super({ id, type, difficulty, name, taskDescription, correctAnswer });
    this.choices = choices;
  }

  ask() {
    console.log(`\nRiddle ${this.id} - ${this.name}:\n`);
    let answeredCorrectly = false;

    while (!answeredCorrectly) {
      console.log(`${this.taskDescription}\n`);
      this.choices.forEach((choice, index) => {
        console.log(`${index + 1}. ${choice}`);
      });

      const input = question("Your choice: ");
      const index = Number(input) - 1;

      if (isNaN(index) || index < 0 || index >= this.choices.length) {
        console.log("Invalid choice. Please enter a valid number.\n");
        continue;
      }

      if (this.choices[index].trim().toLowerCase() === this.correctAnswer.trim().toLowerCase()) {
        console.log("Correct!");
        answeredCorrectly = true;
      } else {
        console.log("Wrong. Try again.\n");
      }
    }
  }
}

export { Riddle, MultipleChoiceRiddle };
