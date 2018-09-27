import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const Container = (props: any, children: any) => (
  <View style={styles.container}>
    {props.children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
