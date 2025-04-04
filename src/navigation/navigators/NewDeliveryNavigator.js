import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import screens from '..';
import { stackNavigatorScreenOptions } from '../styles';


const NewDeliveryStack = createStackNavigator();

const newDeliveryNavigatorScreenOptions = {
  ...stackNavigatorScreenOptions,
    detachInactiveScreens: false,
}

export const NewDeliveryNavigator = () => (
  <NewDeliveryStack.Navigator screenOptions={newDeliveryNavigatorScreenOptions}>
    <NewDeliveryStack.Screen
      name="NewDeliveryStore"
      component={screens.NewDeliveryStore}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <NewDeliveryStack.Screen
      name="NewDeliveryPickupAddress"
      component={screens.NewDeliveryPickupAddress}
      options={{
        headerShown: false,
      }}
    />
    <NewDeliveryStack.Screen
      name="NewDeliveryDropoffAddress"
      component={screens.NewDeliveryDropoffAddress}
      options={{
        headerShown: false,
      }}
    />
    <NewDeliveryStack.Screen
      name="NewDeliveryDropoffDetails"
      component={screens.NewDeliveryDropoffDetails}
      options={{
        headerShown: false,
      }}
    />
    <NewDeliveryStack.Screen
      name="NewDeliveryPrice"
      component={screens.NewDeliveryPrice}
      options={{
        headerShown: false,
      }}
    />
  </NewDeliveryStack.Navigator>
);
