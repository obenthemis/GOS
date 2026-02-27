const fs = require('fs');
const path = require('path');

const providerPrefixes = {
    'pragmatic_play': 'PPM',
    'netent': 'NTN',
    'microgaming': 'MG',
    'playn_go': 'PNG',
    'yggdrasil': 'YGG',
    'red_tiger': 'RT',
    'quickspin': 'QS',
    'nolimit_city': 'NC',
    'relax_gaming': 'RG',
    'push_gaming': 'PG',
    'hacksaw_gaming': 'HG',
    'thunderkick': 'TK',
    'elk_studios': 'ELK',
    'big_time_gaming': 'BTG',
    'wazdan': 'WZ',
    'spinomenal': 'SP',
    'habanero': 'HAB',
    'endorphina': 'END',
    'amusnet': 'AM',
    'playson': 'PL',
    'evolution': 'EVO',
    'betsoft': 'BST',
    'isoftbet': 'ISB',
    'blueprint_gaming': 'BPG',
    'red_rake': 'RR',
    'tom_horn': 'TH',
    'fugaso': 'FUG',
    'gameart': 'GA',
    'kalamba_games': 'KL',
    'booongo': 'BN'
};

const providers = [
    'pragmatic_play', 'netent', 'microgaming', 'playn_go', 'yggdrasil', 'red_tiger', 'quickspin', 'nolimit_city', 'relax_gaming', 'push_gaming', 'hacksaw_gaming', 'thunderkick', 'elk_studios', 'big_time_gaming', 'wazdan', 'spinomenal', 'habanero', 'endorphina', 'amusnet', 'playson',
    'evolution', 'betsoft', 'isoftbet', 'blueprint_gaming', 'red_rake', 'tom_horn', 'fugaso', 'gameart', 'kalamba_games', 'booongo'
];

const types = ['SLOTS', 'TABLE', 'LIVE'];
const volatilities = ['low', 'medium', 'high', 'extreme'];
const themes = ['adventure', 'classic', 'fruit', 'mythology', 'crypto', 'retro', 'fantasy'];
const tags = ['jackpot', 'bonus_buy', 'free_spins', 'multiplier', 'megaways', 'expanding_wilds'];

function generateGames() {
    const games = [];
    let idCounter = 10000;

    providers.forEach(pId => {
        const prefix = providerPrefixes[pId] || 'G';
        const numGames = Math.floor(Math.random() * 6) + 30; // 30-35 games to keep it manageable

        for (let i = 1; i <= numGames; i++) {
            const type = pId === 'evolution' ? 'LIVE' : (Math.random() > 0.8 ? 'TABLE' : 'SLOTS');
            const rtp = (Math.random() * (99 - 92) + 92).toFixed(2);
            const volatility = volatilities[Math.floor(Math.random() * volatilities.length)];

            const game = {
                id: `${idCounter++}`,
                externalId: `${prefix.toLowerCase()}_${i}`,
                name: `${prefix} ${themes[Math.floor(Math.random() * themes.length)]} ${i}`,
                providerId: pId,
                type: type,
                category: type === 'LIVE' ? 'LIVE' : 'CASINO',
                feeGroupId: 'basic',
                rtp: parseFloat(rtp),
                status: 'Active',
                slug: `/${pId}/${prefix.toLowerCase()}_${i}`,
                metadata: {
                    mobile: true,
                    hd: true,
                    bonusBuy: Math.random() > 0.5,
                    jackpot: Math.random() > 0.9,
                    freeSpins: true,
                    multiplier: Math.random() > 0.4,
                    volatility: volatility,
                    theme: themes[Math.floor(Math.random() * themes.length)],
                    tags: [tags[Math.floor(Math.random() * tags.length)], tags[Math.floor(Math.random() * tags.length)]],
                    thumbnail: `/games/${pId}/${prefix.toLowerCase()}_${i}.png`,
                    lines: Math.random() > 0.2 ? 20 : 1024
                }
            };
            games.push(game);
        }
    });

    return games;
}

const gamesData = generateGames();
const outputPath = path.join(process.cwd(), 'expanded_games.json');
fs.writeFileSync(outputPath, JSON.stringify(gamesData, null, 2));
console.log(`Generated ${gamesData.length} games to ${outputPath}`);
