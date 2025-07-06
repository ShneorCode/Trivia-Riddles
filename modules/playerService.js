import fs from 'fs';
const FILE_PATH = './players/players.txt';

export function loadPlayers() {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(data);
}

export function savePlayers(players) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(players, null, 2));
}

export function updatePlayerTime(name, difficulty, newTime) {
  let players = loadPlayers();
  let player = players.find(p => p.name === name);
  if (!player) {
    player = { id: Date.now(), name, times: { [difficulty]: newTime } };
    players.push(player);
    console.log(`Welcome ${name}! First time recorded: ${newTime.toFixed(1)} sec for ${difficulty}`);
  } else {
    if (!player.times[difficulty] || newTime < player.times[difficulty]) {
      player.times[difficulty] = newTime;
      console.log(`New record for ${name} on ${difficulty}: ${newTime.toFixed(1)} sec`);
    } else {
      console.log(`Your best time on ${difficulty} remains: ${player.times[difficulty].toFixed(1)} sec`);
    }
  }
  savePlayers(players);
}
