import { types } from 'mobx-state-tree'

/**
 * Handles UI state
 */
export const UiStoreModel = types
  .model('UiStore')
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
 * An instance of a UiStore.
 */
export type UiStore = typeof UiStoreModel.Type

/**
 * The serialized version of a `UiStore` often used when acquiring
 * data from an API (for example).
 */
export type UiStoreSnapshot = typeof UiStoreModel.SnapshotType
