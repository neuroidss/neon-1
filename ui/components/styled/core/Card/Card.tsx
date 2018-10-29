import {View} from 'react-native'
import Styled, {css} from 'styled-components'

interface CardProps {
    card?: boolean
    cardBody?: boolean
}

export const StyledCard = Styled(View)`
  ${(props: CardProps) => props.card && css`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);  
  `}
  ${(props: CardProps) => props.cardBody && css`
    flex: 1 1 auto;
    padding: 1.25rem;
    background: #f8f8ff;
  `}
`