import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../../presentational/storybook-react'
import { Story, UseCase } from '../../presentational'
import { Container } from '../../atoms'
import {CreditCard} from './CreditCardScreen'

const state = {
    showCreditCardMode: true,
    modeOfPayment: ''
}

const handleModeOfPayment = (value) => {
    state.showCreditCardMode = true
    state.modeOfPayment = value
}
const handleCancelPayment = () => {
  
}
const handleSubmitPayment = () => {
  
}

storiesOf('Screens')
  // .addDecorator(fn => <StoryScreen text="Button">{fn()}</StoryScreen>)
  .add('Credit Card screen', () => (
    <Story>
      <UseCase text="Primary" usage="The primary button.">
        <Container style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <CreditCard
            showCreditCardMode={state.showCreditCardMode}
            modeOfPayment={state.modeOfPayment}
            handleModeOfPayment={handleModeOfPayment}
            handleCancelPayment={handleCancelPayment}
            handleSubmitPayment={handleSubmitPayment}
          />
        </Container>
      </UseCase>
    </Story>
  ))