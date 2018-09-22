import * as React from 'react'

export class SplashScreen extends React.Component<{}, {}> {

  public async componentDidMount() {
    console.log('So')
  }

  public render() {
    return (
      <div>
        <h1>Neon</h1>
        <p>Loading...</p>
      </div>
    )
  }
}
