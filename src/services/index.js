import { permission as permissionManager } from './permissions'
import * as downloadManager from './downloaders'
import * as toastManager from './toasters'
import * as apiManager from './apis'

export const service = {
  permissionManager,
  downloadManager,
  toastManager,
  apiManager,
}