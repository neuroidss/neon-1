import * as React from 'react'
import { View } from 'react-native'
import { Button, Container, Text, Select, FileInput } from '../../atoms'

interface EvidentDocumentVerificationProps {
  documentMethod: any[]
  disableFrontFileInput: boolean
  supportedIDFormats: string
  dropDownValue: string
  disableBackFileInput: boolean
  language: string
  supportedSelfieFormats: string
  onPaymentSelectionChange: (language: string) => void
  handleFrontImgChange: (file: any) => void
  handleSelfieImgChange: (file: any) => void
  handleBackImgChange: (file: any) => void
  handleOpenAlert: (param: any) => void
  closeDocumentVerificationModal: (files: any[]) => void
}

const styles = {
  select: {
    height: 40,
    maxHeight: 40
  }
}

export const EvidentDocumentVerification = (props: EvidentDocumentVerificationProps) => {
  const {
    documentMethod, onPaymentSelectionChange, disableFrontFileInput,
    handleFrontImgChange, supportedIDFormats, dropDownValue, handleSelfieImgChange,
    disableBackFileInput, handleBackImgChange, language, supportedSelfieFormats,
    handleOpenAlert, closeDocumentVerificationModal
  } = props
  return <Container style={{ paddingHorizontal: '30%' }}>
    <View>
      <Select
        style={styles.select}
        onValueChange={(itemValue, itemIndex) => onPaymentSelectionChange(itemValue)}
        placeholder={'Select document method'}
        options={documentMethod} selectedValue={language} />
      <View>
        <Text>
          Front Image
        </Text>
        <FileInput
          name='frontImage'
          id='frontImage'
          accept={supportedIDFormats}
          disabled={disableFrontFileInput}
          onChange={e => handleFrontImgChange(e)} />
      </View>
      {dropDownValue === 'Passport' ? null : <View>
        <Text>
          Back Image
        </Text>
        <FileInput
          name='backImage'
          id='backImage'
          accept={supportedIDFormats}
          disabled={disableBackFileInput}
          onChange={e => handleBackImgChange(e)} />
      </View>}
      <Text>
          Selfie Image
      </Text>
      <FileInput
          name='selfieImage'
          id='selfieImage'
          accept={supportedSelfieFormats}
          disabled={disableBackFileInput}
          onChange={e => handleSelfieImgChange(e)} />
      <Text>
        (i). The selfie image you submit is compared to the photo on the ID document. Make sure your face is clearly visible.
      </Text>
    </View>
    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <Button
        preset="small"
        onPress={(e: any) => closeDocumentVerificationModal(e)}
        text={'Cancel'} />
      <Text>{' '}</Text>
      <Button
        preset="small"
        onPress={(e: any) => handleOpenAlert(e)}
        text={'Submit'} />
    </View>
  </Container>
}
