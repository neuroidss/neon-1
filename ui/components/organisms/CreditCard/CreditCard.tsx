import * as React from 'react'
import { Container } from '../../atoms'
import '!style-loader!css-loader!./style.css'
import { PaymentMode } from '../../molecules/PaymentMode'
import { CreditCard } from '../../molecules/CreditCard'

export const CreditCardPayment = ({
    showCreditCardMode,
    modeOfPayment,
    handleModeOfPayment,
    handleCancelPayment,
    handleSubmitPayment,
    handlePaymentInfo
  }) => (
  <Container>
        <PaymentMode
          modeOfPayment={modeOfPayment}
          handleModeOfPayment={handleModeOfPayment}
        />
        { showCreditCardMode &&
          <CreditCard
            handleCancelPayment={handleCancelPayment}
            handleSubmitPayment={handleSubmitPayment}
            handlePaymentInfo={handlePaymentInfo}
          />
        }
  </Container>
)
