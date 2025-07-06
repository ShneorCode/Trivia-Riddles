import fs from 'fs';

const FILE_PATH = './riddles/db.txt';

export function loadRiddles() {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(data);
}

export function saveRiddles(riddles) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(riddles, null, 2));
}
