// BunnyEra Automation - Browser Bot
// Uses Playwright for automation tasks
// 规则：所有自动化脚本必须使用 Playwright 或 Puppeteer，优先 Playwright

const { chromium } = require('playwright');

class BrowserBot {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
    }

    async init(headless = false) {
        this.browser = await chromium.launch({ headless });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
        console.log('[BrowserBot] Initialized Playwright');
    }

    async goTo(url) {
        if (!this.page) await this.init();
        console.log(`[BrowserBot] Navigating to ${url}`);
        await this.page.goto(url);
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            console.log('[BrowserBot] Closed');
        }
    }
}

module.exports = new BrowserBot();
