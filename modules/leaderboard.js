import fs from 'fs';
const FILE_PATH = './players/players.txt';

export function showLeaderboard(difficulty = "all") {
  if (!fs.existsSync(FILE_PATH)) {
    console.log("No player data yet.");
    return;
  }

  const players = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));

  let filteredPlayers = players;

  if (difficulty !== "all") {
    filteredPlayers = players.filter(p => p.times && p.times[difficulty] !== undefined);
  }

  filteredPlayers.sort((a, b) => {
    const timeA = difficulty === "all" ? Math.min(...Object.values(a.times)) : a.times[difficulty];
    const timeB = difficulty === "all" ? Math.min(...Object.values(b.times)) : b.times[difficulty];
    return timeA - timeB;
  });

  console.log(`\nLeaderboard${difficulty !== "all" ? ` - ${difficulty}` : ""}:`);

  filteredPlayers.forEach((p, i) => {
    const time = difficulty === "all" ? Math.min(...Object.values(p.times)) : p.times[difficulty];
    console.log(`${i + 1}. ${p.name} - ${time.toFixed(1)} sec`);
  });
}
