import {
  addProduct,
  authenticateWithCredentials,
  chooseRestaurant,
  closeRestaurantForToday,
  connectToLocalInstance,
  connectToSandbox,
  launchApp,
  selectAutocompleteAddress,
  symfonyConsole,
} from '../../../../support/commands';
import { describeif } from '../../../../utils';

//FIXME: run against local instance on iOS too (see https://github.com/coopcycle/coopcycle-ops/issues/97)
describeif(device.getPlatform() === 'android')(
  'checkout for customer with existing account (role - user); logged in; with validation failures',
  () => {
    beforeEach(async () => {
      await launchApp();

      if (device.getPlatform() === 'android') {
        symfonyConsole(
          'coopcycle:fixtures:load -f cypress/fixtures/checkout.yml',
        );
        await connectToLocalInstance();
      } else {
        //FIXME: run against local instance on iOS too (see https://github.com/coopcycle/coopcycle-ops/issues/97)
        await connectToSandbox();
      }

      await authenticateWithCredentials('bob', '12345678');

      // Enter address
      await selectAutocompleteAddress('askAddressAutocomplete');

      // List of restaurants
      await expect(element(by.id('restaurantList'))).toBeVisible();
      await chooseRestaurant('Restaurant with cash on delivery');

      // Restaurant page
      await waitFor(element(by.id('restaurantData')))
        .toExist()
        .withTimeout(5000);
      await waitFor(element(by.id('menuItem:0:0')))
        .toExist()
        .withTimeout(5000);

      // Add item
      await addProduct('menuItem:0:0');

      // Add 2 more items
      await addProduct('menuItem:0:1');
      await addProduct('menuItem:1:0');

      await waitFor(element(by.id('cartSubmit')))
        .toBeVisible()
        .withTimeout(5000);
      await element(by.id('cartSubmit')).tap();

      // Cart summary page
      // Select a shipping time range
      await element(by.id('shippingTimeRangeButton')).tap();
      // Timing modal page
      await waitFor(element(by.id('dayPicker')))
        .toBeVisible()
        .withTimeout(15000);
      await element(by.id('setShippingTimeRange')).tap();
    });

    describe('shippedAt time range became not valid while the customer had been on the Summary page', () => {
      it(`show an error message (Summary page)`, async () => {
        await closeRestaurantForToday(
          'restaurant_with_cash_on_delivery_owner',
          '12345678',
        );

        await element(by.id('cartSummarySubmit')).tap();

        // Error message
        await waitFor(element(by.id('globalModal')))
          .toBeVisible()
          .withTimeout(5000);
      });
    });
  },
);
