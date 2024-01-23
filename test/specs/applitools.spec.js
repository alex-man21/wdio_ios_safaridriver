import { Applitools } from '../config/applitools.config.js';

let applitools;

const setupSuite = function (testSuite) {
  before(async function () {
    applitools = new Applitools(testSuite.title);
    await browser.url('https://www.apple.com/');
    await browser.pause(1000);
  });

  afterEach(async function () {
    await applitools.abortEyes();
  });
};

describe(`Applitools Test -  Safari `, function () {
  setupSuite(this);
  it(`Safari large viewport`, async function () {
    await applitools.openEyes(this.test.title);
    await applitools.eyesCheck(`${this.test.title} : origin loading`);
    await applitools.closeEyes();
  });
});
