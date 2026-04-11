import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import AddressAutocomplete from '../../components/AddressAutocomplete';
import ItemSeparator from '../../components/ItemSeparator';
import i18n from '../../i18n';
import { loadAddresses, newAddress } from '../../redux/Account/actions';
import {
  searchRestaurantsForAddress,
  setAddress,
} from '../../redux/Checkout/actions';
import { selectAddresses } from '../../redux/Checkout/selectors';
import { greyColor } from '../../styles/common';
import Address from '../../utils/Address';

interface AccountAddressesPageProps {
  onSelect?(...args: unknown[]): unknown;
  addresses: object[];
}

function EmptyAddressList() {
  return (
    <View style={{ alignItems: 'center', padding: 10 }}>
      <Image
        style={{
          maxWidth: '40%',
          maxHeight: '30%',
          marginVertical: '5%',
          margin: 'auto',
        }}
        source={require('../../assets/images/no_addresses.png')}
        resizeMode={'contain'}
      />
      <Heading>Hey oh !</Heading>
      <Text>{i18n.t('EMPTY_HERE')}</Text>
    </View>
  );
}

function AccountAddressesPage(props: AccountAddressesPageProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [focused, setFocused] = useState(false);

  const { addresses } = props;

  const textInputContainerHeight = 54;

  function renderRow({ item }) {
    const color = props.address
      ? Address.geoDiff(props.address, item)
        ? greyColor
        : 'transparent'
      : 'transparent';

    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('AddressDetails', { address: item });
        }}>
        <HStack
          style={{ backgroundColor: color }}
          className="px-2 py-3 justify-between">
          <Text>{item.streetAddress}</Text>
          <Text>{item.name}</Text>
        </HStack>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <AddressAutocomplete
          containerStyle={{
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
          inputContainerStyle={{
            height: textInputContainerHeight,
          }}
          style={{
            height: textInputContainerHeight * 0.7,
          }}
          placeholder={i18n.t('ENTER_NEW_ADDRESS')}
          onChangeText={text => setFocused(text.length >= 3)}
          onSelectAddress={address => {
            props.navigation.navigate('AddressDetails', { address });
          }}
          onBlur={() => setFocused(false)}
        />
      </View>
      {!focused && (
        <View style={{ flex: 4 }}>
          <Divider />
          <Heading className="my-3 px-2">{i18n.t('MY_ADDRESSES')}</Heading>
          <FlatList
            keyExtractor={(item, index) => `address-${index}`}
            data={addresses}
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await props.loadAddresses();
              setRefreshing(false);
            }}
            ItemSeparatorComponent={ItemSeparator}
            ListEmptyComponent={EmptyAddressList}
            renderItem={renderRow}
          />
        </View>
      )}
    </View>
  );
}

function mapStateToProps(state, ownProps) {
  const fnSelect = () => {
    switch (ownProps.route.params?.action) {
      case 'cart':
        return ownProps.route.params?.cart.shippingAddress || {};
      default:
        return state.checkout.address;
    }
  };

  return {
    addresses: selectAddresses(state),
    address: fnSelect(),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const fnSelect = address => {
    const addressPrecise = { ...address, isPrecise: true };
    switch (ownProps.route.params?.action) {
      case 'search':
        return dispatch(searchRestaurantsForAddress(addressPrecise));
      case 'cart':
        return dispatch(setAddress(addressPrecise, ownProps.route.params.cart));
      default:
        dispatch(setAddress(addressPrecise));
    }
  };
  return {
    loadAddresses: () => dispatch(loadAddresses()),
    newAddress: address => dispatch(newAddress(address)),
    setAddress: address => fnSelect(address),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(AccountAddressesPage));
