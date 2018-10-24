import * as React from 'react'
import { Container } from '../../atoms'
import { Modal, View, TouchableOpacity } from 'react-native'

export const CustomModal = (props: any) => (
  <Container style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <Modal>
      <View>
        <TouchableOpacity onPress={() => alert('yessss')}> 
          <View>
            <span>Test</span>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  </Container>
)
