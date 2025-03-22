export default {
    async execute(utils) {
        let puppeteer;
        try { puppeteer = await import('puppeteer'); }
        catch { throw new Error("You must install 'puppeteer' to use this function. Run: npm install puppeteer"); }
        let browser = await puppeteer.launch({ headless: true });
        let page = await browser.newPage();

        await page.goto(`https://${utils.inside}`, {
            waitUntil: 'networkidle2',
        });

        let screenshot = await page.screenshot({ fullPage: true });
        const buffer = Buffer.from(screenshot, 'binary');

        await browser.close();


        let attachments = utils.client.attachments.get(utils.source.id) || [ new utils.Discord.AttachmentBuilder()]
        if (!attachments[attachments.length - 1]) attachments[attachments.length - 1] = new utils.Discord.AttachmentBuilder();

        attachments[attachments.length - 1].setFile(buffer).setName('screenshot.png')
        utils.client.attachments.set(utils.source.id, attachments)

        return { code: "" };
    }
};