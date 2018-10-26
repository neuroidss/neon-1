import styled from 'styled-components'
import { Image } from 'react-native'

export const StyledImage = styled(Image)`
  width: 150px;
  height: 150px;
  max-width: 150px;
  max-height: 150px;
  -webkit-border-radius: 50% !important;
  -moz-border-radius: 50% !important;
  border-radius: 50% !important;
  border: 5px solid rgba(255,255,255,0.5);
`