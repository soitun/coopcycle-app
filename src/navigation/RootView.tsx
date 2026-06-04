import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useBackgroundColor } from '../styles/theme';

export default function RootView({ children }) {
  const backgroundColor = useBackgroundColor();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: backgroundColor,
        }}>
        {children}
      </View>
    </GestureHandlerRootView>
  );
}
