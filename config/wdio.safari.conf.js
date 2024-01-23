import { config as sharedConfig } from './wdio.shared.conf.js';

export const config = {
  ...sharedConfig,
  ...{
    path: '/',
    protocol: 'http',

    services: [
      [
        'safaridriver',
        {
          outputDir: './log',
          logFileName: 'wdio-safaridriver.log'
        }
      ]
    ],

    capabilities: [
      // {
      //   browserName: 'safari',
      //   maxInstances: 1,
      //   'safari:safariOptions': {}
      // },
      {
        'safari:deviceName': 'iPhone 13 Pro',
        platformName: 'iOS',
        browserName: 'Safari',
        acceptInsecureCerts: true,
        'safari:useSimulator': true
      }
    ]
  }
};
