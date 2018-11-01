import * as React from 'react'
import { Container } from '../../atoms'
import '!style-loader!css-loader!./style.css'
import {Stripe} from '../../organisms/Stripe'
import { View } from 'react-native'

export const PaymentScreen = ({
    showCreditCardMode,
    modeOfPayment,
    handleModeOfPayment
  }) => (
  <Container>
    <View>
      <Stripe
        showCreditCardMode={showCreditCardMode}
        modeOfPayment={modeOfPayment}
        handleModeOfPayment={handleModeOfPayment}
      />
    </View>
  </Container>
)
