import { assert } from 'chai';
import reporter from '@wdio/allure-reporter';
import { By, ConsoleLogHandler, Eyes, StitchMode, Target, TestResultsStatus } from '@applitools/eyes-webdriverio';

import { viewportDimensions } from '../../testData/viewports.js';

const viewportSize = viewportDimensions['large'];

export class Applitools {
  constructor(suiteTitle) {
    this.eyes = new Eyes();
    this.suiteTitle = suiteTitle;

    const configuration = this.eyes
      .getConfiguration()
      .setAppName(`Base project`)
      .setApiKey(process.env.APPLITOOLS_API_KEY)
      // .setServerUrl('place Server URL')
      .setIgnoreDisplacements(true)
      .setBatch({ id: `Base project`, name: `Base project` })
      // Use this method to set whether or not Eyes does scrolling and stitching on pages whose size is greater than the viewport.
      .setForceFullPageScreenshot(true)
      // Use this method to set whether or not 'new' tests are saved to the baseline by default.
      .setSaveNewTests(true)
      .setHostOSInfo('Mac OS')
      .setHostOS('Mac OS')
      .setHostApp(browser.capabilities.browserName)
      .setStitchMode(StitchMode.CSS);
    this.eyes.setConfiguration(configuration);
    this.eyes.setLogHandler(new ConsoleLogHandler(true));
  }

  async openEyes(currentTest, viewPortSize = viewportSize) {
    const viewportRectangleSize = { width: Number(viewPortSize.width), height: Number(viewPortSize.height) };
    await this.eyes.open(browser, `${this.eyes.getAppName()}`, `${currentTest}`, viewportRectangleSize);
  }

  async abortEyes() {
    try {
      await this.eyes.abortIfNotClosed();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  async closeEyes() {
    if (this.eyes.getIsOpen()) {
      this.eyes.addProperty('Source data', await browser.getUrl());
      const testResults = await this.eyes.close(false);
      reporter.addIssue(testResults.getUrl());
      const resultMessage = testResults.isNew ? 'new test' : 'failed';
      assert.equal(testResults.getStatus(), TestResultsStatus.Passed, `Applitools ${resultMessage}: ${testResults.getUrl()}`);
    }
  }

  closeAsync() {
    try {
      this.eyes.closeAsync();
    } catch (e) {
      console.log('error', e);
    }
  }

  /**
   * eyesCheck  Main method for eyes.check
   * @param  String   testtitle        Name for test
   * @param  String    RegionSelector     locators for Target.region()
   * @param  Array  ignoreRegionSelectorArray  array of locators for .ignoreRegions()
   */

  async eyesCheck(checkName, regionSelector, scrollRootSelector, ignoreSelectorArray, isIgnoreDisplacement = true) {
    if (this.eyes.getIsOpen()) {
      let targetArea = Target.window().fully();

      if (regionSelector) {
        targetArea = Target.region(typeof regionSelector === 'string' ? By.css(regionSelector) : regionSelector).fully();
        if (scrollRootSelector) {
          targetArea = targetArea.scrollRootElement(scrollRootSelector).fully();
        }
      }
      //Ignore regions should be passed as an array of locators
      if (ignoreSelectorArray && isIgnoreDisplacement) {
        ignoreSelectorArray.forEach(ignoreSelector => {
          targetArea = targetArea.ignoreRegion(ignoreSelector);
        });
        targetArea = targetArea.ignoreDisplacements(true);
      }
      if (!isIgnoreDisplacement) {
        targetArea = targetArea.ignoreDisplacements(false);
      }
      await this.eyes.check(`${checkName}`, targetArea);
    }
  }

  setWaitBeforeScreenshots(timeout) {
    this.eyes.setWaitBeforeScreenshots(timeout);
  }
}
