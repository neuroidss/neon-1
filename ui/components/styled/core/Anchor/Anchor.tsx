import { View } from 'react-native'
import styled, {css} from 'styled-components'

interface AnchorProps {
  underline: boolean
}

// TODO: should we include any theme color?
export const Anchor = styled(View)`
  cursor: pointer;
  ${(props: AnchorProps) => 
    props.underline && css`text-underline: underline;`
  }
`
