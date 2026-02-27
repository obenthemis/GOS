const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(process.cwd(), 'src', 'data', 'mockData.ts');
const gamesDataPath = path.join(process.cwd(), 'expanded_games.json');

const expandedGames = JSON.parse(fs.readFileSync(gamesDataPath, 'utf8'));
let mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

// Find the games array and replace it
const gamesPrefix = 'export const games: Game[] = [';
const gamesSuffix = '];';

const startIdx = mockDataContent.indexOf(gamesPrefix);
const endIdx = mockDataContent.indexOf(gamesSuffix, startIdx);

if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find games array in mockData.ts');
    process.exit(1);
}

const newGamesContent = gamesPrefix + '\n' + expandedGames.map(g => '  ' + JSON.stringify(g, null, 2).split('\n').join('\n  ')).join(',\n') + '\n' + gamesSuffix;

const updatedContent = mockDataContent.substring(0, startIdx) + newGamesContent + mockDataContent.substring(endIdx + gamesSuffix.length);

fs.writeFileSync(mockDataPath, updatedContent);
console.log('Successfully updated mockData.ts with expanded games.');
