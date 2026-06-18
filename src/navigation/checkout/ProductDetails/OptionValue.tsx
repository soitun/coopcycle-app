import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { formatPrice } from '../../../utils/formatting';
import {
  getPriceForOptionValue,
  isAdditionalOption,
} from '../../../utils/product';
import Range from './Range';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 8,
  },
  itemText: {
    flex: 1,
  },
  radioButtonWrapper: {
    height: 16,
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 3,
  },
  radioButton: {
    height: '100%',
    borderRadius: 12,
  },
  price: {
    fontSize: 12,
  },
  rangeTextWrapper: {
    flex: 1,
  },
});

export const OptionValue = ({
  option,
  optionValue,
  index,
  contains,
  getQuantity,
  add,
  increment,
  decrement,
}) => {
  const selected = contains(optionValue);
  const quantity = getQuantity(optionValue);

  const price = getPriceForOptionValue(optionValue);

  if (isAdditionalOption(option)) {
    return (
      <RangeOption
        name={optionValue.name}
        price={price}
        onPress={() => add(optionValue)}
        onPressIncrement={() => increment(optionValue)}
        onPressDecrement={() => decrement(optionValue)}
        quantity={quantity}
      />
    );
  } else {
    return (
      <SimpleOption
        name={optionValue.name}
        price={price}
        index={index}
        sectionIndex={option.index}
        selected={selected}
        onPress={() => add(optionValue)}
      />
    );
  }
};

const RangeOption = ({
  name,
  price,
  onPress,
  onPressIncrement,
  onPressDecrement,
  quantity,
}) => {
  return (
    <Box className="bg-background-50" style={[styles.item, { gap: 16 }]}>
      <Range
        onPress={onPress}
        onPressIncrement={onPressIncrement}
        onPressDecrement={onPressDecrement}
        quantity={quantity}
      />
      <TouchableOpacity style={styles.rangeTextWrapper} onPress={onPress}>
        <Text>{name}</Text>
        {price > 0 ? (
          <Text className="text-typography-500" style={styles.price} note>
            +{`${formatPrice(price)}`}
          </Text>
        ) : null}
      </TouchableOpacity>
    </Box>
  );
};

const SimpleOption = ({
  name,
  price,
  onPress,
  selected,
  index,
  sectionIndex,
}) => {
  return (
    <TouchableOpacity
      className="bg-background-50"
      style={styles.item}
      onPress={onPress}
      testID={`productOptions:${sectionIndex}:${index}`}>
      {
        <View
          className="border-typography-950"
          style={styles.radioButtonWrapper}>
          <View
            className={selected ? 'bg-typography-950' : 'bg-transparent'}
            style={styles.radioButton}
          />
        </View>
      }
      <Text style={styles.itemText}>{name}</Text>
      {price > 0 ? (
        <Text note style={styles.price}>
          + {`${formatPrice(price)}`}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};
