import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  PushNotificationIOS
} from 'react-native'

import {
  Container, Header, Title, Content,
  Left, Right, Body,
  Button, Text, Icon, List, ListItem, Thumbnail,
  Form, Item, Input, Label,
  Card, CardItem,
  Root, Toast, StyleProvider
} from 'native-base'
import getTheme from './native-base-theme/components'
import material from './native-base-theme/variables/material'

import { NavigationActions, StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import PushNotification from 'react-native-push-notification'

import API from './src/API'
import { Settings } from './src/Settings'
import { Registry } from './src/Registry'
import { primaryColor,  whiteColor, fontTitleName } from './src/styles/common'
import store from "./src/store/store"

const Routes = require('./src/page')
const AppUser = require('./src/AppUser')


let Router

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: primaryColor,
  },
  headerBackTitleStyle: {
    color: whiteColor,
    fontWeight: 'normal',
    fontFamily: fontTitleName
  },
  headerTintColor: whiteColor,
  headerTitleStyle: {
    color: whiteColor,
    // fontWeight needs to be defined or it doesn't work
    // @see https://github.com/react-community/react-navigation/issues/542#issuecomment-345289122
    fontWeight: 'normal',
    fontFamily: fontTitleName
  }
}

const courierHeaderLeft = navigation => {

  const { baseURL, client, user } = navigation.state.params
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'Home',
        params: {
          baseURL,
          client,
          user
        }
      })
    ]
  })

  return (
    <Button transparent onPress={ () => navigation.dispatch(resetAction) }>
      <Icon name="home" style={{ color: '#fff' }} />
    </Button>
  )
}

const routeConfigs = {
  Home: {
    screen: Routes.HomePage,
    navigationOptions: ({ navigation }) => {

      const { navigate } = navigation
      const { baseURL, client, user } = navigation.state.params

      if (user && user.isAuthenticated() && (user.hasRole('ROLE_COURIER') || user.hasRole('ROLE_ADMIN'))) {
        headerRight = (
          <Button transparent onPress={ () => navigate('Courier', { baseURL, client, user, connected: false, tracking: false }) }>
            <Icon name="ios-bicycle" style={{ color: '#fff' }} />
          </Button>
        )
      } else {
        headerRight = (
          <Button transparent />
        )
      }

      return {
        title: 'CoopCycle',
        headerRight
      }
    }
  },
  AccountAddresses: {
    screen: Routes.AccountAddressesPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Mes adresses',
    })
  },
  AccountOrders: {
    screen: Routes.AccountOrdersPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Mes commandes',
    })
  },
  AccountDetails: {
    screen: Routes.AccountDetailsPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Mes informations personnelles',
    })
  },
  Courier: {
    screen: Routes.CourierPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Coursier',
      headerLeft: courierHeaderLeft(navigation)
    })
  },
  CourierTasks: {
    screen: Routes.CourierTasksPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Tâches',
    })
  },
  CourierTaskList: {
    screen: Routes.CourierTaskListPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Liste des tâches',
    })
  },
  CourierTask: {
    screen: Routes.CourierTaskPage,
    navigationOptions: ({ navigation }) => ({
      title: `Tâche #${navigation.state.params.task.id}`,
    })
  },
  Dispatch: {
    screen: Routes.DispatchPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Dispatch',
    })
  },
  Restaurant: {
    screen: Routes.RestaurantPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Restaurant',
    })
  },
  Cart: {
    screen: Routes.CartPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Panier',
    })
  },
  CartAddress: {
    screen: Routes.CartAddressPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Adresse de livraison',
    })
  },
  CreditCard: {
    screen: Routes.CreditCardPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Paiement',
    })
  },
  OrderTracking: {
    screen: Routes.OrderTrackingPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Suivi de commande',
    })
  },
}

const initialRouteName = user => {
  if (user && user.isAuthenticated() && user.hasRole('ROLE_COURIER')) {
    return 'Courier'
  }

  return 'Home'
}

export default class App extends Component {

  input = null

  constructor(props) {
    super(props)
    this.state = {
      client: null,
      initialized: false,
      loading: false,
      settings: {},
      server: null,
      text: '',
      user: null,
      serverError: false,
    }
  }

  componentWillMount() {

    Settings.addListener('server:remove', this.disconnect.bind(this))
    Settings.addListener('websocket:message', this.onWebSocketMessage.bind(this))
    Settings.addListener('user:login', (event) => {
      const { client, user } = event
      if (user && user.isAuthenticated() && (user.hasRole('ROLE_COURIER') || user.hasRole('ROLE_ADMIN'))) {
        Registry.initWebSocketClient(client)
      }
    })
    Settings.addListener('user:logout', () => Registry.clearWebSocketClient())

    AppUser.load()
      .then(user => {
        Settings
          .loadServer()
          .then(baseURL => this.initializeRouter(baseURL, user))
      })
  }

  onWebSocketMessage(event) {
    const data = JSON.parse(event.data)
    if (data.type === 'tasks:changed') {
      Toast.show({
        text: 'Vos tâches ont été mises à jour',
        position: 'bottom'
      })
    }
  }

  initializeRouter(baseURL, user) {
    let client = null

    if (baseURL) {
      client = API.createClient(baseURL, user)
      if (user && user.isAuthenticated() && (user.hasRole('ROLE_COURIER') || user.hasRole('ROLE_ADMIN'))) {
        Registry.initWebSocketClient(client)

        PushNotification.configure({

          // (optional) Called when Token is generated (iOS and Android)
          onRegister: function(token) {
            console.log(`Push notification token for ${token.os}: ${token.token}`)
            if (token.os === 'ios') {
              client.post('/api/me/remote_push/ios', { token: token.token })
                .then(remotePushToken => {
                  console.log('Remote push token stored', remotePushToken)
                })
            }

          },

          // (required) Called when a remote or local notification is opened or received
          onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification );
            // process the notification
            // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
            notification.finish(PushNotificationIOS.FetchResult.NoData);
          },

          // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
          // senderID: "YOUR GCM SENDER ID",

          // IOS ONLY (optional): default: all - Permissions to register.
          permissions: {
            alert: true,
            badge: true,
            sound: true
          },

          // Should the initial notification be popped automatically
          // default: true
          popInitialNotification: true,

          /**
            * (optional) default: true
            * - Specified if permissions (ios) and token (android and ios) will requested or not,
            * - if not, you must call PushNotificationsHandler.requestPermissions() later
            */
          requestPermissions: true,
      });

      }
    }

    const navigatorConfig = {
      initialRouteParams: {
        baseURL,
        client,
        user,
      },
      initialRouteName: initialRouteName(user),
      navigationOptions: {
        ...defaultNavigationOptions
      }
    }

    Router = StackNavigator(routeConfigs, navigatorConfig)

    this.setState({
      client: client,
      initialized: true,
      server: baseURL,
      user: user
    })
  }

  connect() {
    const server = this.state.text.trim()

    this.setState({ loading: true, serverError: false })

    API.checkServer(server)
      .then(baseURL => {
        const user = this.state.user
        Settings
          .saveServer(baseURL)
          .then(() => this.initializeRouter(baseURL, user))
      })
      .catch((err) => {

        setTimeout(() => {

          let message = 'Veuillez réessayer plus tard'
          let serverError = false
          if (err.message) {
            if (err.message === 'Network request failed') {
              message = 'Impossible de se connecter'
            }
            if (err.message === 'Not a CoopCycle server') {
              message = 'Ce serveur n\'est pas compatible'
              serverError = true
            }
            if (err.message === 'Hostname is not valid') {
              message = 'Ce serveur n\'est pas valide'
              serverError = true
            }
          }

          Toast.show({
            text: message,
            position: 'bottom',
            type: 'danger',
            duration: 3000
          })

          this.input._root.clear()
          this.input._root.focus()

          this.setState({ loading: false, serverError })

        }, 500)

      })
  }

  disconnect() {
    const user = this.state.user
    user.logout()

    this.setState({
      client: null,
      server: null,
      user: user,
    })
  }

  renderLoading() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Chargement</Text>
      </View>
    )
  }

  renderConfigureServer() {

    let loader = (
      <View />
    )
    if (this.state.loading) {
      loader = (
        <View style={styles.loader}>
          <ActivityIndicator
            animating={true}
            size="large"
            color="#fff"
          />
          <Text style={{color: '#fff'}}>Chargement...</Text>
        </View>
      )
    }

    const itemProps = this.state.serverError ? { error: true } : {}

    return (
      <Root>
        <StyleProvider style={getTheme(material)}>
          <Container>
            <Header>
              <Left />
              <Body>
              <Title>CoopCycle</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                <Card>
                  <CardItem>
                    <Body>
                    <Text>
                      Veuillez choisir un serveur pour commencer.
                    </Text>
                    </Body>
                  </CardItem>
                </Card>
              </View>
              <Form style={{ marginVertical: 30 }}>
                <Item stackedLabel last { ...itemProps }>
                  <Label>Adresse du serveur</Label>
                  <Input
                    ref={(ref) => { this.input = ref }}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    placeholder={'Exemple : demo.coopcycle.org'}
                    onChangeText={(text) => this.setState({ text })} />
                </Item>
              </Form>
              <View style={{ paddingHorizontal: 10 }}>
                <Button block onPress={ this.connect.bind(this) }>
                  <Text>Valider</Text>
                </Button>
              </View>
            </Content>
            { loader }
          </Container>
        </StyleProvider>
      </Root>
    )
  }

  render() {

    if (!this.state.initialized) {
      return this.renderLoading()
    }

    if (!this.state.server) {
      return this.renderConfigureServer()
    }

    return (
      <Root>
        <Provider store={store}>
          <StyleProvider style={getTheme(material)}>
            <Router />
          </StyleProvider>
        </Provider>
      </Root>
    )
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
