import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { PaymentStore } from '../../stores/payment-store'
import { NavStore } from '@arcadecity/neon-core'
import { EvidentDocumentVerification } from '@arcadecity/neon-ui'
import { Mutation } from 'react-apollo'
import {PaymentMutation} from '@arcadecity/neon-ui/graphql/stripe/paymentMethodMutation'

export interface DocumentVerificationProps {
  paymentStore?: PaymentStore
  navStore?: NavStore
}

const documentMethod = [{
  id: 1,
  name: 'Drivers License'
},
{
  id: 2,
  name: 'Passport'
}, {
  id: 3,
  name: 'SSN'
}]

const disabled = false

const callback = (e) => console.log(e)

@inject('documentVerificationStore', 'navStore')
@observer
export class DocumentVerification extends React.Component<DocumentVerificationProps, {}> {
  public render() {
    const {
      // @ts-ignore
      // paymentStore: { handleModeOfPayment, handleCancelPayment, handleSubmitPayment } 
    }  = this.props
    return (
      <div>
        <Mutation mutation={PaymentMutation}>
            {paymentMutation => (
              <EvidentDocumentVerification 
                closeDocumentVerificationModal={callback}
                documentMethod={documentMethod}
                disableBackFileInput={disabled}
                disableFrontFileInput={disabled}
                handleBackImgChange={callback}
                handleFrontImgChange={callback}
                handleSelfieImgChange={callback}
                handleOpenAlert={callback}
                onPaymentSelectionChange={callback}
                language={'En'}
                supportedIDFormats={''}
                supportedSelfieFormats={''}
                dropDownValue={'Drivers License'} />
            )}
        </Mutation>
      </div>
    )
  }
}
