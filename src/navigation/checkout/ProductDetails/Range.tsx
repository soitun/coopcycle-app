import { Text } from '@/components/ui/text';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    aspectRatio: 1,
    width: 24,
    borderRadius: 4,
    justifyContent: 'center',
  },
  rangeButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  quantity: {
    textAlign: 'center',
    fontSize: 12,
  },
  quantityWrapper: {
    justifyContent: 'center',
    fontSize: 12,
    aspectRatio: 1,
    width: 24,
  },
});

type Props = {
  quantity: number;
  onPressDecrement: () => void;
  onPressIncrement: () => void;
  minimum?: number;
  disabled?: boolean;
  testID?: string;
};

function Range({ onPressDecrement, quantity, onPressIncrement, minimum = 0, disabled = false, testID }: Props) {
  return (
    <View style={styles.rangeButtonWrapper}>
      <TouchableOpacity
        testID={`${testID ? testID + ':' : ''}range-decrement-button`}
        className="bg-background-100"
        style={styles.button}
        disabled={disabled || quantity <= minimum}
        onPress={onPressDecrement}>
        <Text className={quantity === 0 ? 'text-background-100' : ''}>
          -
        </Text>
      </TouchableOpacity>
      <View style={styles.quantityWrapper}>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      <TouchableOpacity
        testID={`${testID ? testID + ':' : ''}range-increment-button`}
        className="bg-background-100"
        style={styles.button}
        disabled={disabled}
        onPress={onPressIncrement}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Range;
