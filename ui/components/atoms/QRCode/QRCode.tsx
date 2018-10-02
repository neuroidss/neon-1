import * as React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import QRImage from 'qr-image'
import { color } from '../../../theme'

interface QRCodeProps {
  code: string,
  size?: number,
  style?: any
}

const styles = StyleSheet.create({
  base: {
    padding: 30,
    borderRadius: 13,
    backgroundColor: color.white
  }
})

export const QRCode = (props: QRCodeProps) => {
  const uri = `data:image/png;base64,${QRImage.imageSync(props.code, {
    type: 'png',
    size: 10,
    margin: 0,
  }).toString('base64')}`;
  return (
    <View style={[styles.base, props.style]}>
      <Image source={{ uri }} style={{ width: props.size, height: props.size }} />
    </View>
  );
};
