import * as React from 'react'
import ArcadeCityBG from '../../../resources/images/city.jpg'
import AvatarImg from '../../../resources/images/avatarImg.png'
import { Image, StyleSheet, View } from 'react-native'
import Container from '../../presentational/container'
import {StyledImage} from '../../styled'

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
    width: '100%', 
    height: '250px'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})

export const Avatar = (props: any) => (
  <Container style={avatarStyle.container}>
    <Image style={avatarStyle.bgImage} source={{uri: ArcadeCityBG}} />
    <View style={avatarStyle.base}>
      {/* Use react-native Avatar component instead of Styled component */}
      <StyledImage source={{uri: AvatarImg}} />
        {/* <View style={avatarStyle.selfie}>
        </View> */}
    </View>
  </Container>
)
