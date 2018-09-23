import * as React from 'react'

export class SettingsScreen extends React.Component<{}, {}> {

  public async componentDidMount() {
    console.log('So')
  }

  public render() {
    return (
      <div>
        <h1 className="centered">Settings</h1>
        <div className="centered">
          <p>Show BTC in satoshis (sat) bitcoin (BTC) millibtcs (mBTC)</p>
          <p>Email & email optin settings</p>
        </div>
      </div>
    )
  }
}
