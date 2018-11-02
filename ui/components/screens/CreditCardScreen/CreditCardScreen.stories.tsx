import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../../presentational/storybook-react'
import { Story, UseCase } from '../../presentational'
import { Container } from '../../atoms'
import {CreditCardScreen} from './CreditCardScreen'

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

storiesOf('Screens')
  // .addDecorator(fn => <StoryScreen text="Button">{fn()}</StoryScreen>)
  .add('Credit Card screen', () => (
    <Story>
      <UseCase text="Primary" usage="The primary button.">
        <Container style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <CreditCardScreen
            showCreditCardMode={state.showCreditCardMode}
            modeOfPayment={state.modeOfPayment}
            handleModeOfPayment={handleModeOfPayment}
            handleCancelPayment={handleCancelPayment}
          />
        </Container>
      </UseCase>
    </Story>
  ))