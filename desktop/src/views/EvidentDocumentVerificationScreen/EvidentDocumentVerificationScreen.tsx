import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { NavStore } from '@arcadecity/neon-core'
import { EvidentDocumentVerification } from '@arcadecity/neon-ui'
import { Mutation } from 'react-apollo'
import {PaymentMutation} from '@arcadecity/neon-ui/graphql/stripe/paymentMethodMutation'
import { EvidentDocumentVerificationStore } from '../../stores/evident-document-verification-store'

export interface DocumentVerificationProps {
  evidentDocumentVerificationStore?: EvidentDocumentVerificationStore
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

const language: string = 'En'
const supportedSelfieFormats = ['image/png', 'image/jpg', 'image/jpeg'].join(',')
const supportedDocumentFormats = [...supportedSelfieFormats.split(','), 'application/pdf'].join(',')

@inject('evidentDocumentVerificationStore', 'navStore')
@observer
export class EvidentDocumentVerificationScreen extends React.Component<DocumentVerificationProps, {}> {
  public render() {
    const {
      // @ts-ignore
      evidentDocumentVerificationStore: {
        // @ts-ignore
        handleBackImgChange, handleFrontImgChange, handleOpenAlert, disableBackFileInput, disableFrontFileInput,
        // @ts-ignore
        handleSelfieImgChange, onPaymentSelectionChange, closeDocumentVerificationModal 
      }
    }  = this.props
    return (
      <div>
        <Mutation mutation={PaymentMutation}>
            {paymentMutation => (
              <EvidentDocumentVerification 
                closeDocumentVerificationModal={closeDocumentVerificationModal}
                documentMethod={documentMethod}
                disableBackFileInput={disableBackFileInput}
                disableFrontFileInput={disableFrontFileInput}
                handleBackImgChange={handleBackImgChange}
                handleFrontImgChange={handleFrontImgChange}
                handleSelfieImgChange={handleSelfieImgChange}
                handleOpenAlert={handleOpenAlert}
                onPaymentSelectionChange={onPaymentSelectionChange}
                language={language}
                supportedIDFormats={supportedDocumentFormats}
                supportedSelfieFormats={supportedSelfieFormats}
                dropDownValue={'Drivers License'} />
            )}
        </Mutation>
      </div>
    )
  }
}
