import React, { useState } from 'react';
import { Dimensions, Text } from 'react-native';
import { View, Vibration } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera/next';
import _ from 'lodash';
import { Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

function getBoxBoundaries(points) {
  const xs = points.map(point => point.x);
  const ys = points.map(point => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return { minX, maxX, minY, maxY };
}

function horizontalLineIntersectsBox(lineY, lineStartX, lineEndX, points) {
  const { minX, maxX, minY, maxY } = getBoxBoundaries(points);

  if (lineY < minY || lineY > maxY) {
    return false;
  }
  if (lineStartX > lineEndX) {
    [lineStartX, lineEndX] = [lineEndX, lineStartX];
  }
  return lineEndX >= minX && lineStartX <= maxX;
}

export default function BarcodeCameraView(props) {
  const [hasPermission, requestPermission] = useCameraPermissions();

  const { width: CameraWidth } = Dimensions.get('window');
  const CameraHeight = CameraWidth * 0.55;
  const PaddingHorizontal = CameraWidth * 0.1618;

  const [barcode, setBarcode] = useState(null);
  const [flash, setFlash] = useState(false);

  if (!hasPermission) {
    return (
      <View>
        <Text>No camera permission</Text>
      </View>
    );
  }

  if (!hasPermission.granted) {
    requestPermission();
    return <View />;
  }

  const onScanned = _.throttle(result => {
    const { data, cornerPoints } = result;
    if (
      !horizontalLineIntersectsBox(
        CameraHeight / 2,
        PaddingHorizontal,
        CameraWidth - PaddingHorizontal,
        cornerPoints,
      )
    ) {
      return;
    }

    if (data !== barcode) {
      Vibration.vibrate();
      setBarcode(data);
      props.onScanned(data);
    }
  }, 200);

  return (
    <CameraView
      enableTorch={flash}
      style={{
        height: CameraHeight,
        width: CameraWidth,
        position: 'relative',
      }}
      onBarcodeScanned={onScanned}
      barcodeScannerSettings={{
        barcodeTypes: ['code128'],
      }}>
      <View
        style={{
          position: 'absolute',
          borderColor: 'rgba(255, 0, 0, 0.6)',
          borderBottomWidth: 1,
          top: CameraHeight / 2,
          left: PaddingHorizontal,
          right: PaddingHorizontal,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
        }}>
        <TouchableOpacity onPress={() => setFlash(!flash)}>
          <Icon
            as={Ionicons}
            name={flash ? 'flash-sharp' : 'flash-off-sharp'}
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          />
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}
