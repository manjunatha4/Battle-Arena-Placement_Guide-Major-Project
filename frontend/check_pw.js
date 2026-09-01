import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(3000);
  
  // also extract what's rendered in body
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  console.log('BODY HTML LENGTH:', bodyHTML.length);
  if (bodyHTML.length < 500) {
     console.log('BODY HTML CONTENT:', bodyHTML);
  }
  
  await browser.close();
})();
