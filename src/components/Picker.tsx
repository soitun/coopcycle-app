import { Picker as RNPicker } from '@react-native-picker/picker';
import _ from 'lodash';
import React from 'react';
import { useColorModeValue } from '../styles/theme';

// wrapper for Picker component with some defaults to support the dark mode

const InnerPicker = props => {
  const baseTextColor = useColorModeValue('rgb(23 23 23)', 'rgb(254 254 255)');

  return (
    <RNPicker
      style={{
        color: baseTextColor, // seems to have effect on Android only
        ...props.style,
      }}
      dropdownIconColor={baseTextColor} // Android only
      itemStyle={{
        // iOS only
        color: baseTextColor, // apply it only for iOS for now, because on Android the default RNPicker dialog background is light even in the dark mode
        ...props.itemStyle,
      }}
      {..._.omit(props, 'style', 'itemStyle')}
    />
  );
};

// export as class component only to be able to use it as a drop-in replacement
// for the RN Picker (support Picker.Item usage)
export class Picker extends React.Component {
  static Item = RNPicker.Item;

  render() {
    return <InnerPicker {...this.props} />;
  }
}
