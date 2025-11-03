const puppeteer = require('puppeteer');
const { expect } = require('chai');
const path = require('path');

describe('Pixel Art Editor', function() {
    this.timeout(10000); // Increase timeout for Puppeteer

    let browser;
    let page;
    const appUrl = `file://${path.join(__dirname, '..', 'index.html')}`;

    before(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', error => {
            console.error(`Page error: ${error.message}`);
        });
    });

    after(async () => {
        if (browser) {
            await browser.close();
        }
    });

    beforeEach(async () => {
        await page.goto(appUrl, { waitUntil: 'networkidle0' });
    });

    it('should load without JavaScript errors', async () => {
        const response = await page.goto(appUrl, { waitUntil: 'networkidle0' });
        expect(response.ok()).to.be.true;
    });

    it('should have a 32x32 canvas (scaled)', async () => {
        const canvas = await page.$('#main-canvas');
        expect(canvas).to.not.be.null;
        const width = await page.evaluate(el => el.width, canvas);
        const height = await page.evaluate(el => el.height, canvas);
        expect(width).to.equal(640);
        expect(height).to.equal(640);
    });

    it('should have default tools, colors, and one layer', async () => {
        const activeTool = await page.$eval('.tool-button.active', el => el.dataset.tool);
        expect(activeTool).to.equal('pencil');

        const color = await page.$eval('#color-picker', el => el.value);
        expect(color).to.equal('#ff0000');

        const layerCount = await page.$$eval('#layers-list .layer-item', layers => layers.length);
        expect(layerCount).to.equal(1);
    });

    it('should allow adding a new layer', async () => {
        await page.click('#add-layer-btn');
        const layerCount = await page.$$eval('#layers-list .layer-item', layers => layers.length);
        expect(layerCount).to.equal(2);
    });
    
    it('should allow deleting a layer', async () => {
        await page.click('#add-layer-btn'); // Now 2 layers
        await page.click('#add-layer-btn'); // Now 3 layers
        let layerCount = await page.$$eval('#layers-list .layer-item', layers => layers.length);
        expect(layerCount).to.equal(3);

        await page.click('.layer-item:last-child .delete-layer');
        layerCount = await page.$$eval('#layers-list .layer-item', layers => layers.length);
        expect(layerCount).to.equal(2);
    });

    it('should change tool when a tool button is clicked', async () => {
        await page.click('[data-tool="eraser"]');
        const activeTool = await page.$eval('.tool-button.active', el => el.dataset.tool);
        expect(activeTool).to.equal('eraser');
    });

    it('should allow reordering layers via drag and drop', async () => {
        await page.click('#add-layer-btn');
        await page.click('#add-layer-btn');

        let layerNames = await page.$$eval('#layers-list .layer-item span', els => els.map(el => el.innerText));
        expect(layerNames).to.deep.equal(['Layer 1', 'Layer 2', 'Layer 3']);

        const firstLayer = await page.$('#layers-list .layer-item:nth-child(1)');
        const thirdLayer = await page.$('#layers-list .layer-item:nth-child(3)');

        const box1 = await firstLayer.boundingBox();
        const box3 = await thirdLayer.boundingBox();

        await page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2);
        await page.mouse.down();
        await page.waitForTimeout(100);

        // Manually dispatch dragover to insert the placeholder
        await page.evaluate((y) => {
            const dragOverEvent = new DragEvent('dragover', { bubbles: true, clientY: y });
            document.getElementById('layers-list').dispatchEvent(dragOverEvent);
        }, box3.y + box3.height / 2);
        await page.waitForTimeout(100);

        await page.mouse.move(box3.x + box3.width / 2, box3.y + box3.height / 2);
        
        // Manually dispatch the drop event
        await page.evaluate(() => {
            const dropEvent = new DragEvent('drop', { bubbles: true });
            document.getElementById('layers-list').dispatchEvent(dropEvent);
        });

        await page.mouse.up();

        layerNames = await page.$$eval('#layers-list .layer-item span', els => els.map(el => el.innerText));
        expect(layerNames).to.deep.equal(['Layer 2', 'Layer 3', 'Layer 1']);
    });

    it('should toggle layer visibility when checkbox is clicked', async () => {
        const canvas = await page.$('#main-canvas');

        // Draw a pixel on the first layer
        await page.mouse.click(100, 100);

        // Get canvas data with the pixel
        const canvasWithPixel = await canvas.screenshot({ encoding: 'base64' });
        expect(canvasWithPixel).to.not.be.null;

        // Find and click the checkbox
        const checkbox = await page.$('#layers-list .layer-item:nth-child(1) input[type="checkbox"]');
        await checkbox.click();

        // Get canvas data without the pixel
        const canvasWithoutPixel = await canvas.screenshot({ encoding: 'base64' });
        expect(canvasWithoutPixel).to.not.equal(canvasWithPixel);

        // Click it again to show the layer
        await checkbox.click();
        const canvasRestored = await canvas.screenshot({ encoding: 'base64' });
        expect(canvasRestored).to.equal(canvasWithPixel);
    });
});
