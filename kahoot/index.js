// btw ts needs cpu and ram cuz its puppeteer, change bot count to how much u want, it will use troll names because yes
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// IMPORTANT: CHANGE THESE
const GAME_ID = '8346003'; // game id
const BOT_COUNT = 10; // bot count (the more bots, the more cpu & ram used)
// end of important ig

const funnyNames = [
    'Hugh Jass', 'Mike Hunt', 'Hugh Janice', 'Hugh G Rection', "Mike Hock", "Jenna Tolls", "Gabe Horn", "Gape Horn", "Dicken Cider"
];

// dont change below unless you know what u doing

const runBot = async (gameId, botNumber) => {
    const username = `${funnyNames[Math.floor(Math.random() * funnyNames.length)]}${botNumber}`;
    console.log(`\n[Bot ${botNumber}] Starting with name: ${username}`);
    console.log(`[Bot ${botNumber}] Game PIN: ${gameId}`);
    
    const browser = await puppeteer.launch({ 
        headless: true,
        pipe: true, // removing this results in tons of profile errors, we aint want that do we?
        args: [ // dont ask why there is a SHIT ton, its for speeding up the process lol
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-features=TranslateUI',
            '--disable-ipc-flooding-protection',
            '--disable-features=HttpsUpgrades',
            '--disable-sync',
            '--disable-default-apps',
            '--disable-extensions',
            '--disable-component-extensions-with-background-pages',
            '--disable-domain-reliability',
            '--disable-client-side-phishing-detection',
            '--disable-crash-reporter',
            '--disable-breakpad',
            '--disable-component-update',
            '--disable-logging',
            '--disable-bundled-ppapi-flash',
            '--disable-print-preview',
            '--disable-notifications',
            '--no-default-browser-check',
            '--no-first-run',
            '--no-pings',
            '--no-experiments',
            '--no-zygote',
            '--single-process',
            '--memory-pressure-off',
            '--max_old_space_size=256'
        ],
    });
    
    const page = await browser.newPage();
    
    console.log(`[Bot ${botNumber}] Navigating to kahoot.it...`);
    await page.goto('https://kahoot.it/', { waitUntil: 'networkidle2' });
    
    console.log(`[Bot ${botNumber}] Entering game PIN...`);
    await page.waitForSelector('input[placeholder="Game PIN"]');
    await page.type('input[placeholder="Game PIN"]', gameId, { delay: 100 });
    
    console.log(`[Bot ${botNumber}] Clicking enter...`);
    await page.click('button[data-functional-selector="join-game-pin"]');
    
    try {
        await page.waitForSelector('button[data-functional-selector="recovery-cancel-button"]', { timeout: 1000 });
        await page.click('button[data-functional-selector="recovery-cancel-button"]');
        console.log(`[Bot ${botNumber}] Clicked 'Join as new participant'`);
    } catch(e) {
        console.log(`[Bot ${botNumber}] No recovery needed`);
    }
    
    console.log(`[Bot ${botNumber}] Entering nickname...`);
    await page.waitForSelector('input[placeholder="Nickname"]');
    await page.type('input[placeholder="Nickname"]', username, { delay: 100 });
    
    console.log(`[Bot ${botNumber}] Clicking OK...`);
    await page.click('button[data-functional-selector="join-button-username"]');
    
    console.log(`[✓] ${username} joined the game!`);
};

const runMultipleBots = async (gameId, botCount) => {
    console.log(`\n🚀 Starting ${botCount} bot(s) for Kahoot game: ${gameId}\n`);
    
    for (let i = 1; i <= botCount; i++) {
        await runBot(gameId, i);
    }
    
    console.log(`\n✅ All ${botCount} bots completed!\n`);
};

runMultipleBots(GAME_ID, BOT_COUNT).catch(console.error);
