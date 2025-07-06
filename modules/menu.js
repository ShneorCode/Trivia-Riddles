import { question } from "readline-sync";
import { playGame } from "./play.js";
import { createRiddle, readAllRiddles, updateRiddle, deleteRiddle } from "./riddleCrud.js";
import { showLeaderboard } from "./leaderboard.js";

export function mainMenu() {
  while (true) {
    console.log("\nWhat do you want to do?");
    console.log("1. Play the game");
    console.log("2. Create a new riddle");
    console.log("3. Read all riddles");
    console.log("4. Update a riddle");
    console.log("5. Delete a riddle");
    console.log("6. View leaderboard");
    console.log("7. Exit");

    const choice = question("Enter your choice: ");
    switch (choice) {
      case "1": playGame(); break;
      case "2": createRiddle(); break;
      case "3": readAllRiddles(); break;
      case "4": updateRiddle(); break;
      case "5": deleteRiddle(); break;
      case "6": showLeaderboard(); break;
      case "7": process.exit();
      default: console.log("Invalid option.");
    }
  }
}
