import { connectToDemo } from './utils';

describe('Foodtech: first launch', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it(`should show AskAddress screen`, async () => {
    await connectToDemo();

    await device.takeScreenshot('AskAddress screen');

    await expect(element(by.id('checkoutAskAddress'))).toBeVisible();
  });
});
