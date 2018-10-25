import { View } from 'react-native'
import styled, {css} from 'styled-components'

interface RowProps {
  wrap: boolean;
}

// TODO: should we include any theme color?
export const Row = styled(View)`
  ${(props: RowProps) => props.wrap ? 
    css`flex-direction: wrap;`: 
    css`flex-direction: row;`
  }
`
