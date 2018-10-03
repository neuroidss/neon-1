import * as React from 'react'
import { TextInput } from './'

interface HorizontalExpandingTextInputProps {
  value?: string
  charWidth: number
  onChangeText?: any
  style?: any
}

interface HorizontalExpandingTextInputState {
  text: string
  width: number
}

export class HorizontalExpandingTextInput extends React.Component<HorizontalExpandingTextInputProps, HorizontalExpandingTextInputState> {
  constructor(props) {
    super(props)
    this.state = { text: '', width: 0 }
  }
  public render() {
    const { value, charWidth, onChangeText, style, ...props } = this.props
    return (
      <TextInput
        value={value || this.state.text}
        onChangeText={text => {
          this.setState({ text, width: charWidth * (text.length + 1) })
          onChangeText(text) // onChangeText && 
        }}
        style={[
          style,
          {
            width: Math.max(
              charWidth * 2,
              value ? charWidth * (value.length + 1) : this.state.width
            ),
          },
        ]}
        {...props}
      />
    )
  }
}
