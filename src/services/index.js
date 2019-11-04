import { permission as permissionManager } from './permissions'
import * as downloadManager from './downloaders'
import * as toastManager from './toasters'
import * as apiManager from './apis'
import * as firebaseManager from './firebase'
// import * as dbManager from './watermelondb'

export const service = {
  permissionManager,
  downloadManager,
  toastManager,
  apiManager,
  firebaseManager,
  // dbManager,
}