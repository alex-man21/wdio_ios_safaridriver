describe(`Functional Tests -  Safari `, function () {
  before(async function () {
    await browser.url('https://www.apple.com/');
    await browser.pause(1000);
  });
  it(`Safari large viewport`, async function () {
    const shopLink = await browser.$('a[class="ac-gf-footer-legal-link"][href="/sitemap/"]');
    await shopLink.scrollIntoView();
    await browser.pause(500);
    await browser.execute(function (element) {
      element.click();
    }, shopLink);
    await browser.pause(2000);

    const siteMap = await browser.$('a[data-analytics-title="product index"]');
    await siteMap.waitForExist({ timeout: 5000, interval: 200 });

    expect(await browser.getTitle()).toContain('Site Map - Apple');
  });
});
