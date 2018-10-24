/// <reference path="../../../index.d.ts" />

import * as React from 'react'
import { Container } from '../../atoms'
import ArcadeCityBG from '../../../resources/images/city.jpg'
import AvatarImg from '../../../resources/images/avatarImg.png'
import { Image, StyleSheet, View } from 'react-native'

const avatarStyle = StyleSheet.create({
  base: {
    position: 'relative',
    top: -85,
    marginBottom: -100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selfie: {
    position: 'absolute',
    top: '60%',
    right: '0',
    color: 'black'
  },
  bgImage: { 
    width: '250px', 
    height: '250px' 
  }
})

const image = StyleSheet.create({
  base: {
    width: 50,
    height: 50,
    maxWidth: 150,
    maxHeight: 150,
    borderRadius: 50,
    WebkitBorderRadius: '50% !important',
    MozBorderRadius: '50% !important',
    border: '5px solid rgba(255,255,255,0.5)'
  }
})

export const Avatar = (props: any) => (
  <Container style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <View>
      <Image style={avatarStyle.bgImage} source={{uri: ArcadeCityBG}} />
      <View style={avatarStyle.base}>
        <Image style={image.base} source={{uri: AvatarImg}} />
          <View style={avatarStyle.selfie}>
          </View>
      </View>
    </View>
  </Container>
)
