import fs from 'fs';

const FILE_PATH = './players/players.txt';

export function showLeaderboard() {
  if (!fs.existsSync(FILE_PATH)) {
    return console.log("No player data yet.");
  }
  const players = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
  players.sort((a, b) => a.lowestTime - b.lowestTime);

  console.log("\nLeaderboard:");
  players.forEach((p, i) =>
    console.log(`${i + 1}. ${p.name} - ${p.lowestTime} sec`)
  );
}
