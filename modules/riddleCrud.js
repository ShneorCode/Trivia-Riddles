import { question } from "readline-sync";
import { loadRiddles, saveRiddles } from "./riddleService.js";

export function createRiddle() {
  const name = question("Enter riddle name: ");
  const task = question("Enter description: ");
  const answer = question("Enter correct answer: ");
  const hint = question("Enter a hint for this riddle: ");
  const type = question("Type (basic/multiple): ");
  const difficulty = question("Difficulty (easy/medium/hard): ");

  let choices = [];
  if (type === "multiple") {
    for (let i = 0; i < 4; i++) {
      choices.push(question(`Choice ${i + 1}: `));
    }
  }

  const riddles = loadRiddles();
  const newId = riddles.length > 0 ? Math.max(...riddles.map(r => r.id)) + 1 : 1;

  const newRiddle = {
    id: newId,
    name,
    taskDescription: task,
    correctAnswer: answer,
    hint,
    type,
    difficulty,
    ...(type === "multiple" ? { choices } : {})
  };

  riddles.push(newRiddle);
  saveRiddles(riddles);
  console.log("Riddle added!");
}

export function readAllRiddles() {
  const riddles = loadRiddles();
  console.log("\nAll Riddles:");
  riddles.forEach(r => {
    console.log(`- ${r.id}: ${r.name} (${r.difficulty})`);
  });
}

export function updateRiddle() {
  const id = Number(question("Enter riddle ID to update: "));
  const riddles = loadRiddles();
  const riddle = riddles.find(r => r.id === id);
  if (!riddle) return console.log("Riddle not found.");

  riddle.name = question(`Enter new name (${riddle.name}): `) || riddle.name;
  riddle.taskDescription = question(`Enter new task (${riddle.taskDescription}): `) || riddle.taskDescription;
  riddle.correctAnswer = question(`Enter new answer (${riddle.correctAnswer}): `) || riddle.correctAnswer;
  riddle.hint = question(`Enter new hint (${riddle.hint || "none"}): `) || riddle.hint;
  riddle.type = question(`Enter new type (${riddle.type}): `) || riddle.type;
  riddle.difficulty = question(`Enter new difficulty (${riddle.difficulty}): `) || riddle.difficulty;

  if (riddle.type === "multiple") {
    riddle.choices = [];
    for (let i = 0; i < 4; i++) {
      riddle.choices.push(question(`Choice ${i + 1}: `));
    }
  } else {
    delete riddle.choices;
  }

  saveRiddles(riddles);
  console.log("Riddle updated.");
}

export function deleteRiddle() {
  const id = Number(question("Enter riddle ID to delete: "));
  let riddles = loadRiddles();
  riddles = riddles.filter(r => r.id !== id);
  saveRiddles(riddles);
  console.log("Riddle deleted.");
}
