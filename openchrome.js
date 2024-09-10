const puppeteer = require('puppeteer');

(async () => {
  // Lance le navigateur Chrome
  const browser = await puppeteer.launch({
    headless: false // Affiche le navigateur Chrome (mettre à "true" pour le mode sans tête)
  });

  // Crée une nouvelle page
  const page = await browser.newPage();

  // Navigue vers une URL spécifique
  await page.goto('https://www.google.com');

  // Effectue d'autres actions sur la page...

  // Ferme le navigateur
  await browser.close();
})();
