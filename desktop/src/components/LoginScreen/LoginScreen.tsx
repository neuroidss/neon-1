import * as React from 'react'

export class LoginScreen extends React.Component<{}, {}> {

  public async componentDidMount() {
    console.log('So')
  }

  public render() {
    return (
      <div className="centered">
        <h1>Login</h1>
        <p>Facebook</p>
        <p>Google</p>
        <p>GitHub</p>
        <p>Blockstack</p>
        <p>Anonymous</p>
      </div>
    )
  }
}
