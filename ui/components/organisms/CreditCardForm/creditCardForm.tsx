import * as React from 'react'
import { View } from 'react-native';
import {CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, injectStripe} from 'react-stripe-elements'
import { Text, Button } from '../../atoms';
import styled, {css} from 'styled-components'

const stripeElementsPlaceholder = (placeholderColor) => {
  return {
    style: {
      base: {
        '::placeholder': {
          color: placeholderColor
        }
      }
    }
  }
}

interface TextProps{
  card?: boolean
  expiration?: boolean
  cvc?: boolean
  pin?: boolean
}

const StyledText = styled(Text)`
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


const CreditCardForm = () => (
    <View>
        <StyledText>
          Card number
          <CardNumberElement
            {...stripeElementsPlaceholder('transparent')}
          />
        </StyledText>
        <View style={{flexDirection: "row"}}>
          <StyledText expiration>
            Expiration date
            <CardExpiryElement
            />
          </StyledText>
          <StyledText cvc>
            CVC
            <CardCVCElement
              {...stripeElementsPlaceholder('transparent')}
            />
          </StyledText>
          <StyledText pin>
            Postal code
            <PostalCodeElement
              {...stripeElementsPlaceholder('transparent')}
            />
          </StyledText>
        </View>
        <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
          <Button
            text="Cancel"
            preset="secondary"
          />
          <Text>{' '}</Text>
          <Button
            text="Submit"
            preset="primary"
          />
        </View>
    </View>
)

export default injectStripe(CreditCardForm)
