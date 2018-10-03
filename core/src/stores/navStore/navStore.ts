import { types } from 'mobx-state-tree'
// import * as actions from './nav.actions'

/**
 * Handles navigation state
 */
export const NavStoreModel = types
  .model('NavStore')
  .props({
    screen: types.optional(types.string, 'welcome') // TODO: Make enum of available screens
  })
  .actions(self => ({
    setScreen (value: string) {
      self.screen = value
    },
  }))

/**
 * An instance of a NavStore.
 */
export type NavStore = typeof NavStoreModel.Type

/**
 * The serialized version of a `NavStore` often used when acquiring
 * data from an API (for example).
 */
export type NavStoreStoreSnapshot = typeof NavStoreStoreModel.SnapshotType
