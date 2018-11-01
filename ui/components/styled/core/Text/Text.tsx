import styled, { css } from 'styled-components'
import { Text } from '../../../atoms'

interface TextProps {
    card?: boolean
    expiration?: boolean
    cvc?: boolean
    pin?: boolean
}

export const StyledText = styled(Text)`
        font-weight: 300;
        letter-spacing: 0.025em;
      ${(props: TextProps) => props.expiration && css`
          width: 140px;
      `}
      ${(props: TextProps) => props.cvc && css`
          width: 100px;
          margin-left: 20px;
      `}
      ${(props: TextProps) => props.pin && css`
          width: 130px;
          margin-left: 20px;
      `}
  `