import { Image, View } from 'react-native';

export function PoweredByIdealPostcodes({ styles }) {
  return (
    <View style={styles}>
      <Image
        resizeMode="contain"
        source={require('../../../../assets/images/ideal_postcodes.png')}
      />
    </View>
  );
}
