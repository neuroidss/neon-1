import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../../presentational/storybook-react'
import { Story, UseCase } from '../../presentational'
import { Container } from '../../atoms'
import {PaymentScreen} from './paymentScreen'

const state = {
    showCreditCardMode: true,
    modeOfPayment: ''
}

const handleModeOfPayment = (value) => {
    state.showCreditCardMode = true
    state.modeOfPayment = value
}

storiesOf('Screens')
  // .addDecorator(fn => <StoryScreen text="Button">{fn()}</StoryScreen>)
  .add('Payment screen', () => (
    <Story>
      <UseCase text="Primary" usage="The primary button.">
        <Container style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <PaymentScreen
            showCreditCardMode={state.showCreditCardMode}
            modeOfPayment={state.modeOfPayment}
            handleModeOfPayment={handleModeOfPayment}
          />
        </Container>
      </UseCase>
    </Story>
  ))