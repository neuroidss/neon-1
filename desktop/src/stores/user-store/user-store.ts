import { types } from 'mobx-state-tree'

/**
 * Handles UI state
 */
export const UserStoreModel = types
  .model('UserStore')
  .props({
    /** Demo field */
    demoField: types.optional(types.string, ''),
  })
  .actions(self => ({
    setDemoField(value: string) {
      self.demoField = value
    }
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
