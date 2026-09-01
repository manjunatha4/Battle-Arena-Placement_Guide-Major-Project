const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
  page.on('response', response => {
    if (response.status() >= 400) {
      console.log('RESPONSE ERROR:', response.status(), response.url());
    }
  });
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  if (bodyHTML.length < 1500) {
     console.log('HTML Content:', bodyHTML);
  }
  
  await browser.close();
})();
