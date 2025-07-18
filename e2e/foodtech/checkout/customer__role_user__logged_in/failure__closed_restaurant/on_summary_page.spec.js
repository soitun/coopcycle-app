import {
  authenticateWithCredentials,
  closeRestaurantForToday,
  describeif,
  tapById,
  waitToBeVisible,
} from '../../../../support/commands';
import {
  loadCheckoutFixturesAndConnect,
  selectCartItemsFromRestaurant,
} from '../../../utils';

//FIXME: run against local instance on iOS too (see https://github.com/coopcycle/coopcycle-ops/issues/97)
describeif(device.getPlatform() === 'android')
  ('checkout for customer with existing account (role - user); logged in; Time range changed modal; restaurant was closed while the customer had been on the Summary page', () => {

  beforeEach(async () => {
    await loadCheckoutFixturesAndConnect();
    await authenticateWithCredentials('bob', '12345678');
    await selectCartItemsFromRestaurant('Restaurant with cash on delivery');
  });

  it(`should suggest to choose a new time range (Timing modal)`, async () => {
    await closeRestaurantForToday(
      'restaurant_with_cash_on_delivery_owner',
      '12345678',
    );

    // Cart summary page
    await tapById('cartSummarySubmit');

    // Time range changed modal
    await waitToBeVisible('timeRangeChangedModal');

    // Select a shipping time range
    await tapById('setShippingTimeRange');

    await tapById('cartSummarySubmit');

    // More infos page
    await waitToBeVisible('checkoutTelephone');
    await waitToBeVisible('moreInfosSubmit');
  });

});
