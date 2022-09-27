import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.piadas.com.br/");
  await page
    .locator(
      "#block-olivero-content > div > div > div > nav > ul > li:nth-child(3) > a"
    )
    .click();
  const list = await page.$$eval('.view-content', all_items => {
    let data;
    all_items.forEach(joke => {
        const name = joke.querySelectorAll('span');
        let list = [].slice.call(name);
        let innertext = list.map(function(e) { return e.innerText; }).join("\n");
        data = innertext;
    });
    return data;
  });
  console.log(list)
  await browser.close();
})();
