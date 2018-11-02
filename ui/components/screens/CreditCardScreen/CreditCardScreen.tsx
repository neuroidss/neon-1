import * as React from 'react'
import { Container } from '../../atoms'
import '!style-loader!css-loader!./style.css'
import {CreditCardPayment} from '../../organisms/CreditCard'
import { View } from 'react-native'

export const CreditCard = ({
    showCreditCardMode,
    modeOfPayment,
    handleModeOfPayment,
    handleCancelPayment
  }) => (
  <Container>
    <View>
      <CreditCardPayment
        showCreditCardMode={showCreditCardMode}
        modeOfPayment={modeOfPayment}
        handleModeOfPayment={handleModeOfPayment}
        handleCancelPayment={handleCancelPayment}
      />
    </View>
  </Container>
)
