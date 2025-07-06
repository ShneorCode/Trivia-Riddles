import { question } from "readline-sync";
import { Riddle, MultipleChoiceRiddle } from "../classes/Riddle.js";
import Player from "../classes/Player.js";
import { loadRiddles } from "./riddleService.js";
import { updatePlayerTime } from "./playerService.js";

export function playGame() {
  const name = question("What is your name? ");
  const player = new Player(name);

  let difficulty = Number(question("Choose difficulty (1-easy, 2-medium, 3-hard, 4-all): "));
  let riddles = loadRiddles();

  const diffMap = { 1: "easy", 2: "medium", 3: "hard" };
  if (difficulty !== 4) {
    riddles = riddles.filter(r => r.difficulty === diffMap[difficulty]);
  }

  const gameRiddles = riddles.map(data =>
    data.type === "multiple" ? new MultipleChoiceRiddle(data) : new Riddle(data)
  );

  for (const riddle of gameRiddles) {
    const start = Date.now();
    riddle.ask();
    const end = Date.now();
    player.recordTime(start, end);
  }

  player.showStats();
  updatePlayerTime(name, player.getTotalTime());
}
