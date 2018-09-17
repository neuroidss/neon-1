import { getRoot } from 'mobx-state-tree'
import {
  DEFAULT_SCOPE,
  generateAndStoreTransitKey,
  handlePendingSignIn,
  isUserSignedIn,
  makeAuthRequest,
  redirectToSignInWithAuthRequest
} from 'blockstack'


/**
 * Login with Blockstack
 */
export async function loginBlockstack(self) {
  const root = getRoot(self) as any
  const { ipcRenderer } = root.ipcStore

  const authRequest = makeAuthRequest(
    generateAndStoreTransitKey(),
    'http://localhost:8080/redirect',
    'http://localhost:8080/manifest.json',
    DEFAULT_SCOPE,
    'http://localhost:8080')

  redirectToSignInWithAuthRequest(authRequest)

  ipcRenderer.on('signed-in', async (event, token) => {
    console.tron.log('Signed in to Blockstack with token:', token)

    handlePendingSignIn('https://core.blockstack.org/v1/names/', token)
      .then(userData => {
        console.tron.log('User signed in: ', isUserSignedIn())
        console.tron.log(userData)
      })
  })

  return true
}
