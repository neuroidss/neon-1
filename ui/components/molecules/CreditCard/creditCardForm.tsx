import * as React from 'react'
import { View } from 'react-native';
import {CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, injectStripe} from 'react-stripe-elements'
import { Button, Text } from '../../atoms';
import {StyledTextInput, StyledText} from '../../styled'

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

const CreditCardForm = () => (
    <View>
        <StyledText>
          Full Name
          <StyledTextInput />
        </StyledText>
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
