import * as React from 'react'
import { Container, Text } from '../../atoms'
import { View } from 'react-native';
import {Elements, StripeProvider} from 'react-stripe-elements'
import CreditCardForm from '../../organisms/CreditCardForm'
import Styled, {css} from 'styled-components'
import '!style-loader!css-loader!./style.css'

interface CardProps {
  card?: boolean
  cardBody?: boolean
}

const StyledCard = Styled(View)`
  ${(props: CardProps) => props.card && css`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);  
  `}
  ${(props: CardProps) => props.cardBody && css`
    flex: 1 1 auto;
    padding: 1.25rem;
    background: #f8f8ff;
  `}
`

export const Stripe = () => (
  <Container>
      <View>
        <Text>Credit Card Payment</Text>
      </View>
      <View>
        <StripeProvider apiKey={'pk_test_VniM590u9m4AgtGvcXRfo3UP'}>
          <Elements>
            <StyledCard card>
              <StyledCard cardBody>
                <CreditCardForm />
              </StyledCard>
            </StyledCard>
          </Elements>
        </StripeProvider>
      </View>
  </Container>
)
