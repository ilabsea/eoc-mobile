import { permission as permissionManager } from './permissions'
import * as downloadManager from './downloaders'
import * as toastManager from './toasters'
import * as apiManager from './apis'
import * as firebaseManager from './firebase'
import { sop } from './sop'
// import * as dbManager from './watermelondb'

export const Sop = {
  ...sop
}

export const service = {
  permissionManager,
  downloadManager,
  toastManager,
  apiManager,
  firebaseManager,
  // dbManager,
}