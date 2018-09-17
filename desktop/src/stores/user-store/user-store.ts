import { types } from 'mobx-state-tree'
import * as actions from './user.actions'

/**
 * Handles UI state
 */
export const UserStoreModel = types
  .model('UserStore')
  .actions(self => ({
    loginBlockstack: async (): Promise<any> =>
      await actions.loginBlockstack(self)
  }))

/**
 * An instance of a UserStore.
 */
export type UserStore = typeof UserStoreModel.Type

/**
 * The serialized version of a `UserStore` often used when acquiring
 * data from an API (for example).
 */
export type UserStoreSnapshot = typeof UserStoreModel.SnapshotType
