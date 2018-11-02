import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { PaymentStore } from '../../stores/payment-store'
import { CreditCard } from '@arcadecity/neon-ui'

export interface PaymentScreenProps {
  paymentStore?: PaymentStore
}

@inject('paymentStore')
@observer
export class PaymentScreen extends React.Component<PaymentScreenProps, {}> {
  public render() {
    const {
      // @ts-ignore
      paymentStore: { showCreditCardMode, modeOfPayment, handleModeOfPayment, handleCancelPayment } 
    }  = this.props
    return (
      <div>
        <CreditCard
          showCreditCardMode={showCreditCardMode}
          modeOfPayment={modeOfPayment}
          handleModeOfPayment={handleModeOfPayment}
          handleCancelPayment={handleCancelPayment}
        />
      </div>
    )
  }
}
