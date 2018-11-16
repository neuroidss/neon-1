import * as React from 'react'
import { View } from 'react-native'
import {CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, injectStripe} from 'react-stripe-elements'
import { Button, Text } from '../../atoms'
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

const CreditCardForm = ({handleCancelPayment, handleSubmitPayment, handlePaymentInfo, stripe}) => (
    <View>
      <form>
        <StyledText>
          Full Name
          <StyledTextInput onChange={handlePaymentInfo} name='name' type='text' placeholder='Name on card' />
        </StyledText>
        <StyledText>
          Card number
          <CardNumberElement
            {...stripeElementsPlaceholder('transparent')}
          />
        </StyledText>
        <View style={{flexDirection: "row"}}>
          <StyledText expiration={true}>
            Expiration date
            <CardExpiryElement
            />
          </StyledText>
          <StyledText cvc={true}>
            CVC
            <CardCVCElement
              {...stripeElementsPlaceholder('transparent')}
            />
          </StyledText>
          <StyledText pin={true}>
            Postal code
            <PostalCodeElement
              {...stripeElementsPlaceholder('transparent')}
            />
          </StyledText>
        </View>
        <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
          <Button
            onPress={handleCancelPayment}
            text="Cancel"
            preset="small"
          />
          <Text>{' '}</Text>
          <Button
            onPress={() => { handleSubmitPayment(stripe) }}
            text="Submit"
            preset="small"
          />
        </View>
      </form>
    </View>
)

export default injectStripe(CreditCardForm)
