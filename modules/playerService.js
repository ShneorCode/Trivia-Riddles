import fs from 'fs';

const FILE_PATH = './players/players.txt';

export function updatePlayerTime(name, newTime) {
  let players = fs.existsSync(FILE_PATH)
    ? JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'))
    : [];

  let player = players.find(p => p.name === name);

  if (!player) {
    player = { id: Date.now(), name, lowestTime: newTime };
    players.push(player);
    console.log(`Welcome ${name}! First time recorded: ${newTime} sec`);
  } else {
    if (!player.lowestTime || newTime < player.lowestTime) {
      console.log(`New record for ${name}: ${newTime} sec`);
      player.lowestTime = newTime;
    } else {
      console.log(`Your best time remains: ${player.lowestTime} sec`);
    }
  }

  fs.writeFileSync(FILE_PATH, JSON.stringify(players, null, 2));
}
