import * as React from 'react'
import { Container } from '../../atoms'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { View } from 'react-native'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export const Badge = ({
  badgeExist,
  // TODO: shift below defualt values to defaultProps
  checkIconTemplate = <FontAwesomeIcon icon={faCheck} />,
  uncheckIconTemplate = <FontAwesomeIcon icon={faTimes} />,
  badgeContent
}: any) => {
  let badgeSymbol = badgeExist ? checkIconTemplate : uncheckIconTemplate
  return <Container style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <View>
      {badgeSymbol}
      {badgeContent}
    </View>
  </Container>
}