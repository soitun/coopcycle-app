import React, { Component } from 'react';
import { View } from 'react-native';
import { Box, Button, HStack, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import OrderItems from '../../components/OrderItems';
import SwipeToAcceptOrRefuse from './components/SwipeToAcceptOrRefuse';
import OrderHeading from './components/OrderHeading';
import OrderAcceptedFooter from './components/OrderAcceptedFooter';

import {
  acceptOrder,
  fulfillOrder,
  printOrder,
} from '../../redux/Restaurant/actions';
import { isMultiVendor } from '../../utils/order';
import {
  selectIsPrinterConnected,
  selectPrinter,
} from '../../redux/Restaurant/selectors'

const OrderNotes = ({ order }) => {
  if (order.notes) {
    return (
      <HStack p="2" alignItems="center">
        <Icon as={FontAwesome} size="sm" name="exclamation-triangle" mr="2" />
        <Text>{order.notes}</Text>
      </HStack>
    );
  }

  return null;
};

class OrderScreen extends Component {
  fulfillOrder(order) {
    this.props.fulfillOrder(order, o =>
      this.props.navigation.setParams({ order: o }),
    );
  }

  render() {
    const { order } = this.props;

    const canEdit = !isMultiVendor(order);

    return (
      <Box flex={1}>
        <View style={{ flex: 1 }}>
          <OrderHeading
            order={order}
            isPrinterConnected={this.props.isPrinterConnected}
            onPrinterClick={() =>
              this.props.navigation.navigate('RestaurantSettings', {
                screen: 'RestaurantPrinter',
              })
            }
            printOrder={() => this.props.printOrder(this.props.order)}
          />
          <OrderNotes order={order} />
          <OrderItems order={order} />
        </View>
        {order.reusablePackagingEnabled && order.restaurant.loopeatEnabled && (
          <Box p="3">
            <Button
              variant="subtle"
              onPress={() =>
                this.props.navigation.navigate('RestaurantLoopeatFormats', {
                  order,
                })
              }>
              {this.props.t('RESTAURANT_LOOPEAT_UPDATE_FORMATS')}
            </Button>
          </Box>
        )}
        {canEdit && order.state === 'new' && (
          <SwipeToAcceptOrRefuse
            onAccept={() =>
              this.props.acceptOrder(order, o =>
                this.props.navigation.setParams({ order: o }),
              )
            }
            onRefuse={() =>
              this.props.navigation.navigate('RestaurantOrderRefuse', { order })
            }
          />
        )}
        {canEdit && order.state === 'accepted' && (
          <OrderAcceptedFooter
            order={order}
            onPressCancel={() =>
              this.props.navigation.navigate('RestaurantOrderCancel', { order })
            }
            onPressDelay={() =>
              this.props.navigation.navigate('RestaurantOrderDelay', { order })
            }
            onPressFulfill={() => this.fulfillOrder(order)}
          />
        )}
      </Box>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    order: ownProps.route.params?.order,
    isPrinterConnected: selectIsPrinterConnected(state),
    printer: selectPrinter(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    acceptOrder: (order, cb) => dispatch(acceptOrder(order, cb)),
    printOrder: order => dispatch(printOrder(order)),
    fulfillOrder: (order, cb) => dispatch(fulfillOrder(order, cb)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(OrderScreen));
