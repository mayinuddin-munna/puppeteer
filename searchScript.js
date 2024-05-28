const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.google.com");

  const searchBoxSelector = 'input[name="q"]';
  await page.waitForSelector(searchBoxSelector);
  await page.type(searchBoxSelector, "puppeteer");

  await page.keyboard.press("Enter");

  await page.waitForSelector("#search");

  const results = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("h3"));
    return anchors.map((anchor) => anchor.textContent);
  });

  console.log(results);

  await browser.close();
})();
