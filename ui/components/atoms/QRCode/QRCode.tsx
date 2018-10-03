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
    padding: 25,
    borderRadius: 25,
    backgroundColor: color.white,
    marginVertical: 20
  }
})

export const QRCode = (props: QRCodeProps) => {
  console.log('In QRCode with code', props.code)
  const uri = `data:image/png;base64,${QRImage.imageSync(props.code, {
    type: 'png',
    size: 10,
    margin: 0,
  }).toString('base64')}`;
  console.log(uri)
  return (
    <View style={[styles.base, props.style]}>
      <Image source={{ uri }} style={{ width: props.size, height: props.size }} />
    </View>
  );
};
