import { types } from 'mobx-state-tree'
// import * as actions from './log.actions'

/**
 * Handles log state & actions
 */
export const LogStoreModel = types
  .model('LogStore')
  .props({
    logReady: types.optional(types.boolean, false),
  })
  .actions(self => ({
    /** Basic setters */
    setLogReady (value: boolean) {
      self.logReady = value
    }
  }))

/**
 * An instance of a LogStore.
 */
export type LogStore = typeof LogStoreModel.Type

/**
 * The serialized version of a `LogStore` often used when acquiring
 * data from an API (for example).
 */
export type LogStoreSnapshot = typeof LogStoreModel.SnapshotType
