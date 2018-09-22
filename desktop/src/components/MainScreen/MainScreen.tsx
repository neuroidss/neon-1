import * as React from 'react'

export class MainScreen extends React.Component<{}, {}> {

  public async componentDidMount() {
    console.log('So')
  }

  public render() {
    return (
      <div>
        <p>Create New Lightning Wallet</p>
        <p>Import Lightning Wallet</p>
        <p>Connect MetaMask</p>
        <p>View Leaderboard</p>
        <p>View Network Stats</p>
        <p>Settings</p>
        <p>What is Neon?</p>
        <p>What is Arcade City?</p>
      </div>
    )
  }
}
