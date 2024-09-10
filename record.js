const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new" // Utilisez la nouvelle implémentation de Chrome Headless
  });
  const page = await browser.newPage();
  
  // Naviguez vers la page que vous souhaitez capturer
  await page.goto('https://omarssan.com/omarssan/vue/dashboard.php');
  
  // Capturez une capture d'écran de la page
  await page.screenshot({ path: 'screenshot.png' });
  
  await browser.close();
})();
