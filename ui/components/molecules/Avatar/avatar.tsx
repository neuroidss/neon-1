/// <reference path="../../../index.d.ts" />

import * as React from 'react'
import { Container } from '../../atoms'
import ArcadeCityBG from '../../../resources/images/city.jpg'
import AvatarImg from '../../../resources/images/avatarImg.png'
import { Button } from '../../atoms';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'

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
    width: '150px',
    height: '150px'
  }
})

const selfie = StyleSheet.create({
  base: {
    position: 'absolute',
    top: '60%'
  }
})

export const Avatar = (props: any) => (
  <Container style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <View style={avatarStyle.base}>
      <Image style={image.base} source={{uri: ArcadeCityBG}} />
      <View>
        <Image source={{uri: AvatarImg}} />
        <TouchableOpacity onPress={() => alert('yessss')}> 
          <View style={selfie.base}>
            <Button />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </Container>
)
