import * as React from 'react'
import { Container, Text } from '../../atoms'
import { View, StyleSheet } from 'react-native'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CreditCardForm from './creditCardForm'
import '!style-loader!css-loader!./style.css'
import { StyledCard } from '../../styled'

const cardStyle = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export const CreditCard = ({handleCancelPayment, handleSubmitPayment, handlePaymentInfo}: any) => (
  <Container>      
      <View style={cardStyle.base}>
        <Text>Credit Card Payment</Text>
        <View>
          <StripeProvider apiKey={'pk_test_VniM590u9m4AgtGvcXRfo3UP'}>
            <Elements>
              <StyledCard card={true}>
                <StyledCard cardBody={true}>
                  <CreditCardForm
                    handleCancelPayment={handleCancelPayment}
                    handleSubmitPayment={handleSubmitPayment}
                    handlePaymentInfo={handlePaymentInfo}
                  />
                </StyledCard>
              </StyledCard>
            </Elements>
          </StripeProvider>
        </View>
      </View>
  </Container>
)
