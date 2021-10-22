import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import { Image, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px'
import { checkoutRequest, mercadopagoCheckout } from '../../redux/Checkout/actions'

function Mercadopago({ cart, initCheckout, checkout, httpClient, restaurant }) {

  async function fetchPreferenceId() {
    const { ['@id']: namespace } = cart
    return await httpClient.get(`${namespace}/mercadopago-preference`)
  }

  async function fetchMercadopagoAccount() {
    return await httpClient.get(`/restaurant/${restaurant.id}/mercadopago-account`)
  }

  async function createPayment({ preferenceId, publicKey }) {
    return await MercadoPagoCheckout.createPayment({
      publicKey,
      preferenceId,
      language: 'es',
      advancedOptions: {
        amountRowEnabled: false,
        bankDealsEnabled: false,
      },
    })
  }

  const loadMercadopago = async () => {
    try {
      const preferenceId = await fetchPreferenceId();
      const { public_key: publicKey } = await fetchMercadopagoAccount();
      const payment = await createPayment({ preferenceId, publicKey });
      checkout(payment);
    } catch (err) {
      console.err('There was an error creating the payment with MP SDK');
      console.err(err);
    }
  }

  useEffect(() => {
    initCheckout();
    loadMercadopago();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/powered_by_mercadopago.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  errorsContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  errorText: {
    textAlign: 'center',
    color: '#ed2f2f',
  },
})

function mapStateToProps(state) {
  const {
    checkout: { cart, restaurant },
    app: {
      httpClient,
    },
  } = state

  return { cart, httpClient, restaurant }
}

function mapDispatchToProps(dispatch) {
  return {
    initCheckout: () => dispatch(checkoutRequest()),
    checkout: (payment) => dispatch(mercadopagoCheckout(payment)),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Mercadopago))
