import * as React from 'react'
import { View } from 'react-native'
import { Button, Container, Text, Select } from '../../atoms'

interface EvidentDocumentVerificationProps {
  documentMethod: any[]
  disableFrontFileInput: boolean
  supportedIDFormats: string
  dropDownValue: string
  disableBackFileInput: boolean
  language: string
  supportedSelfieFormats: string
  onPaymentSelectionChange: ({language: string}) => void
  handleFrontImgChange: (files: any[]) => void
  handleSelfieImgChange: (files: any[]) => void
  handleBackImgChange: (files: any[]) => void
  handleOpenAlert: (files: any[]) => void
  closeDocumentVerificationModal: (files: any[]) => void
}

const styles = {
  color: 'white'
}

export const EvidentDocumentVerification = (props: EvidentDocumentVerificationProps) => {
  const {
    documentMethod, onPaymentSelectionChange, disableFrontFileInput,
    handleFrontImgChange, supportedIDFormats, dropDownValue, handleSelfieImgChange,
    disableBackFileInput, handleBackImgChange, language, supportedSelfieFormats,
    handleOpenAlert, closeDocumentVerificationModal
  } = props
  return <Container style={{ paddingHorizontal: '30%' }}>
    <Select 
      onValueChange={(itemValue, itemIndex) => onPaymentSelectionChange({language: itemValue})}
      placeholder={'Select document method'}
      options={documentMethod} selectedValue={language} />
    <View>
      <Text>
        Front Image
      </Text>
      <input
        disabled={disableFrontFileInput}
        style={styles}
        onChange={(e: any) => handleFrontImgChange(e.target.files)}
        type='file'
        accept={supportedIDFormats}
        name='frontImage'
        id='frontImage'
      />
    </View>
    {dropDownValue === 'Passport' ? null : <View>
      <Text>
        Back Image
      </Text>
      <input
        style={styles}
        disabled={disableBackFileInput}
        onChange={(e: any) => handleBackImgChange(e.target.files)}
        type='file'
        accept={supportedIDFormats}
        name='backImage'
        id='backImage'
      />
    </View>}
    <Text>
        Selfie Image
    </Text>
    <input
      color='primary'
      onChange={(e: any) => handleSelfieImgChange(e.target.files)}
      type='file'
      accept={supportedSelfieFormats}
      name='selfieImage'
      id='selfieImage'
    />
    <Text>
      (i). The selfie image you submit is compared to the photo on the ID document. Make sure your face is clearly visible.
    </Text>
    <Button
      preset="small"
      onPress={(e: any) => closeDocumentVerificationModal(e)}
      text={'Cancel'} />
    <Button
      preset="small"
      onPress={(e: any) => handleOpenAlert(e)}
      text={'Submit'} />
  </Container>
}

{/* 
  <StyledDocModal isOpen={isOpen} toggle={closeDocumentVerificationModal} backdrop={'static'}>
    <form onSubmit={handleOpenAlert}>
      <StyledModalHeader>Upload documents</StyledModalHeader>
      <ModalBody>
        <fieldset>
          <Dropdown isOpen={openDropdown} toggle={handleDropdownAction}>
            <DropdownToggle caret> {dropDownValue} </DropdownToggle>
            <DropdownMenu>
              {
                dropDownConst.map((item) => {
                  return <DropdownItem key={item.id} value={item.name}>
                    {item.name}
                  </DropdownItem>
                })
              }
            </DropdownMenu>
          </Dropdown>
          <hr />
          </FormGroup>}
        </fieldset>
        <hr />
        <FormGroup>
          <StyledLabel>
              Selfie Image
          </StyledLabel>
          <Input
            color='primary'
            onChange={(e) => handleSelfieImgChange(e.target.files)}
            type='file'
            accept={supportedSelfieFormats}
            name='selfieImage'
            id='selfieImage'
          />
          <StyledLabel info>
            (i). The selfie image you submit is compared to the photo on the ID document. Make sure your face is clearly visible.
          </StyledLabel>
        </FormGroup>

      </ModalBody>

      <ModalFooter>
        <FormGroup check row>
          <Col sm={10}>
            <Button
              color='secondary'
              onClick={closeDocumentVerificationModal}
            >Cancel</Button>
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col sm={10}>
            <Button color='primary'
              onClick={handleOpenAlert}
            >Submit</Button>
          </Col>
        </FormGroup>
      </ModalFooter>
    </form>
  </StyledDocModal>
*/}
