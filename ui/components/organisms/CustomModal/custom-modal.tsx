import * as React from 'react'
import { Container } from '../../atoms'
import { Modal, View, TouchableOpacity } from 'react-native'

const containerStyle = {justifyContent: 'center', alignItems: 'center', flex: 1}

// TODO: react-native-web doesn't support modal, should we think of moving ahead with modals?
export const CustomModal = (props: any) => (
  <Container style={containerStyle}>
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
