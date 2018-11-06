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
      paymentStore: { showCreditCardMode, modeOfPayment, handleModeOfPayment, handleCancelPayment, handleSubmitPayment } 
    }  = this.props
    return (
      <div>
        <Mutation mutation={PaymentMutation}>
            {paymentMutation => (
              <CreditCard
                showCreditCardMode={showCreditCardMode}
                modeOfPayment={modeOfPayment}
                handleModeOfPayment={handleModeOfPayment}
                handleCancelPayment={() => handleCancelPayment(goBack)}
                handleSubmitPayment={(event, stripe) => handleSubmitPayment(event, stripe, goBack, paymentMutation)}
              />
            )}
        </Mutation>
      </div>
    )
  }
}
