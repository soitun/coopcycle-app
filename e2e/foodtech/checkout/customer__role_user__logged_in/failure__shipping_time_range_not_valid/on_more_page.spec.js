import {
  authenticateWithCredentials,
  closeRestaurantForToday,
  describeif,
  tapById,
  typeTextQuick,
  waitToBeVisible,
} from '../../../../support/commands';
import {
  loadCheckoutFixturesAndConnect,
  selectCartItemsFromRestaurant,
} from '../../../utils';

//FIXME: run against local instance on iOS too (see https://github.com/coopcycle/coopcycle-ops/issues/97)
describeif(device.getPlatform() === 'android')
  ('checkout for customer with existing account (role - user); logged in; with validation failures', () => {

  beforeEach(async () => {
    await loadCheckoutFixturesAndConnect();
    await authenticateWithCredentials('bob', '12345678');
    await selectCartItemsFromRestaurant('Restaurant with cash on delivery');

    // Cart summary page
    // Select a shipping time range
    await tapById('shippingTimeRangeButton');
    // Timing modal page
    await waitToBeVisible('dayPicker');
    await tapById('setShippingTimeRange');
  });

  describe('shippedAt time range became not valid while the customer had been on the More page', () => {

    it(`show an error message (More page)`, async () => {
      await tapById('cartSummarySubmit');

      // More infos page
      await waitToBeVisible('checkoutTelephone');
      await waitToBeVisible('moreInfosSubmit');

      // Append "\n" to make sure virtual keybord is hidden after entry
      // https://github.com/wix/detox/issues/209
      await typeTextQuick('checkoutTelephone', '0612345678\n');

      await closeRestaurantForToday(
        'restaurant_with_cash_on_delivery_owner',
        '12345678',
      );

      await tapById('moreInfosSubmit');

      // Error message
      await waitToBeVisible('globalModal');
    });

  });

});
