import { RootStore, RootStoreModel } from '../stores/root-store'

/**
 * Setup the root state.
 */
export async function setupRootStore(env: any) {
  let rootStore: RootStore

  rootStore = RootStoreModel.create({}, env)

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // Hack around a TS issue here...
    console.log('hang on')
    // (console.tron as any).trackMstNode(rootStore)
  }

  return rootStore
}
