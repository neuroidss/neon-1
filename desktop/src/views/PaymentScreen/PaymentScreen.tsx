import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { PaymentStore } from '../../stores/payment-store'
import { NavStore } from '@arcadecity/neon-core'
import { CreditCard } from '@arcadecity/neon-ui'
import { Mutation } from 'react-apollo'
import {PaymentMutation} from '@arcadecity/neon-ui/graphql/stripe/paymentMethodMutation'

export interface PaymentScreenProps {
  paymentStore?: PaymentStore
  navStore?: NavStore
}

@inject('paymentStore', 'navStore')
@observer
export class PaymentScreen extends React.Component<PaymentScreenProps, {}> {
  public render() {
    const {
      navStore: { goBack },
      // @ts-ignore
      paymentStore: { showCreditCardMode, modeOfPayment, handleModeOfPayment, handlePaymentInfo, handleCancelPayment, handleSubmitPayment } 
    }  = this.props
    return (
      <div>
        <Mutation mutation={PaymentMutation}>
            {paymentMutation => (
              <CreditCard
                showCreditCardMode={showCreditCardMode}
                handlePaymentInfo={handlePaymentInfo}
                modeOfPayment={modeOfPayment}
                handleModeOfPayment={handleModeOfPayment}
                handleCancelPayment={() => handleCancelPayment(goBack)}
                handleSubmitPayment={(stripe) => handleSubmitPayment(stripe, goBack, paymentMutation)}
              />
            )}
        </Mutation>
      </div>
    )
  }
}
