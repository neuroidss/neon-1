/// <reference path="../../../index.d.ts" />

import * as React from 'react'
import { Container } from '../../atoms'
import ArcadeCityBG from '../../../resources/images/city.jpg'
import AvatarImg from '../../../resources/images/avatarImg.png'
import { Image, StyleSheet, View } from 'react-native'

const avatarStyle = StyleSheet.create({
  base:  {
    position: 'relative',
    top: '-85px',
    marginBottom: '-100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const image = StyleSheet.create({
  base: {
    width: '50px',
    height: '50px',
    maxWidth: '150px',
    maxHeight: '150px',
    borderRadius: 50,
    WebkitBorderRadius: '50% !important',
    MozBorderRadius: '50% !important',
    border: '5px solid rgba(255,255,255,0.5)'
  }
})

const selfie = StyleSheet.create({
  base: {
    position: 'absolute',
    top: '60%',
    right: '0',
    color: 'black'
  }
})

export const Avatar = (props: any) => (
  <Container style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <View>
      <Image source={{uri: ArcadeCityBG}} />
      <View style={avatarStyle.base}>
        <Image style={image.base} source={{uri: AvatarImg}} />
          <View style={selfie.base}>
          </View>
      </View>
    </View>
  </Container>
)
