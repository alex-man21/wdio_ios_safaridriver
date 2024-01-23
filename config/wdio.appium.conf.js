import { config as sharedConfig } from './wdio.shared.conf.js';

export const config = {
  ...sharedConfig,
  ...{
    port: 4723,

    services: [
      [
        'appium',
        {
          command: 'appium'
        },
        // 'safaridriver', 
        // {
        //     outputDir: './logs',
        //     logFileName: 'wdio-safaridriver.log'
        // }
      ]
    ],

    capabilities: [
      {
        "platformName": "iOS", 
        "browserName": "Safari",
        "appium:deviceName": "iPhone 13", 
        "appium:platformVersion": "15.2", 
        "appium:automationName": "XCUITest", 
        "safari:useSimulator": true,
      },
        // "appium:safariInitialUrl": "https://www.apple.com",
        // "acceptInsecureCerts": true
      // {
      //   'safari:deviceName': 'iPhone 13 Pro',
      //   platformName: 'iOS',
      //   browserName: 'Safari',
      //   acceptInsecureCerts: true,
      //   'appium:automationName': 'Safari',
      //   'safari:useSimulator': true
      // }
    ]
  }
};
