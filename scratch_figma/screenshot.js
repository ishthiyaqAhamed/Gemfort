const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to mobile size
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  
  const figmaUrl = 'https://www.figma.com/proto/5lmQqOWbGatiVYcFJpa2Lo/Untitled?node-id=34-39718&t=IDZxlM12EADHHeHP-1';
  
  console.log('Navigating to ' + figmaUrl);
  await page.goto(figmaUrl, { waitUntil: 'networkidle2', timeout: 60000 });
  
  console.log('Waiting for canvas to render...');
  // Figma takes a bit to render the canvas, wait for a few seconds
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Click on the screen to trigger any interactions if needed or just wait
  console.log('Taking screenshot...');
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  
  console.log('Saved to screenshot.png');
  await browser.close();
})();
