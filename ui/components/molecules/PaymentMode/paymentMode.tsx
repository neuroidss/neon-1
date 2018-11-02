import * as React from 'react'
import { Container } from '../../atoms'
import { Picker } from 'react-native'

export const PaymentMode = ({
    modeOfPayment,
    handleModeOfPayment
  }) => (
  <Container>
      <Picker
        selectedValue={modeOfPayment}
        style={{ height: 30, width: '100%' }}
        onValueChange={(itemValue, itemIndex) => handleModeOfPayment(itemValue)}>
        <Picker.Item label="Select Payment Mode" value="" />
        <Picker.Item label="Credit Card" value="CREDIT_CARD" />
      </Picker>
  </Container>
)
