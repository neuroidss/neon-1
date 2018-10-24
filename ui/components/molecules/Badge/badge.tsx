/// <reference path="../../../index.d.ts" />

import * as React from 'react'
import { Container } from '../../atoms'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { View } from 'react-native'
// import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export const Badge = (props: any) => (
  <Container style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <View>
      {/* <FontAwesomeIcon icon={faCheck} />   */}
    </View>
    <View>
      {/* <FontAwesomeIcon icon={faTimes} />   */}
    </View>
  </Container>
)
