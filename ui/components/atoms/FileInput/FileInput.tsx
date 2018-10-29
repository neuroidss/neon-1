import * as React from 'react'
import { TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  style?: any,
  id?: string,
  name?: string,
  accept?: string,
  disabled?: boolean,
  onChange: (files: any) => void
}

const fileInputStyles = {
  fileInput: {
    backgroundColor: 'white'
  }
}

export const FileInput = ({ style, onChange, placeholder = 'No file selected.' }:InputFieldProps) => (
  <input type='file' style={{...fileInputStyles.fileInput, ...style}} placeholder={placeholder} onChange={event => {
    const {target: {files}} = event
    if (files && files[0]) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = (e: any) => {
        onChange(e.target.result)
      }
    }
  }}/>
)
