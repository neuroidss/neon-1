import * as React from 'react'
import { Text } from '../Text'

export class SplashScreen extends React.Component<{}, {}> {

  public async componentDidMount() {
    console.log('So')
  }

  public render() {
    return (
      <div className="centered" style={{marginTop: '15%'}}>
        <Text preset="epic">NEON</Text>
        <p>Loading...</p>
      </div>
    )
  }
}
