// export * from './logo'

import * as React from 'react'
import { Image } from 'react-native'

export const Logo = (props: any) => (
  <Image
    style={{width: 350, height: 350}}
    source={require('./neonlogo.png')}
  />
)
