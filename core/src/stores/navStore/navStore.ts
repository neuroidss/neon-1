import { types } from 'mobx-state-tree'
// import * as actions from './nav.actions'

/**
 * Handles navigation state
 */
export const NavStoreModel = types
  .model('NavStore')
  .props({
    /** The current screen */
    screen: types.optional(types.string, 'welcome'), // TODO: Make enum of available screens
    /** The previous screen */
    screenPrev: types.optional(types.string, '')
  })
  .actions(self => ({
    /** Go back one screen (only works once) */
    goBack () {
      self.screen = self.screenPrev
      self.screenPrev = ''
    },
    /** Navigate to a new screen */
    setScreen (value: string) {
      self.screenPrev = self.screen
      self.screen = value
    }
  }))

/**
 * An instance of a NavStore.
 */
export type NavStore = typeof NavStoreModel.Type

/**
 * The serialized version of a `NavStore` often used when acquiring
 * data from an API (for example).
 */
export type NavStoreSnapshot = typeof NavStoreModel.SnapshotType
